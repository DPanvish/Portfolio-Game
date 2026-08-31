# Gamified Portfolio — Technical Design Document
### With CMS-style Admin Dashboard (no-code content editing)

---

## 1. Concept Recap

A portfolio site built as a 2D game (top-down walk-and-collect is the recommended mode). Visitors move a character through a small world; each "node" they walk into reveals a piece of real content (bio, a job, a project, a skill, contact form) as an accessible on-screen overlay.

**New requirement:** the site owner should never need to touch code to update their bio, jobs, projects, or skills. All of that content — and the layout of the world map itself — is managed from a password-protected `/admin` dashboard and stored in a database. The game reads from the database at build/request time instead of from hardcoded React components.

This single change turns the project from "a static portfolio with a fun UI" into "a tiny full-stack CMS with a game as its front-end renderer." The stack below reflects that.

---

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router) + TypeScript** | One codebase for the public game site, the admin dashboard, and the API routes that connect them. |
| Game engine | **Phaser 3**, loaded as a client-only component (`next/dynamic`, `ssr: false`) | Handles sprites, tilemaps, physics, and collision out of the box. Overkill only if you go with the "lighter canvas" alternative below. |
| Lighter alternative | Plain `<canvas>` + custom game loop | If the game is a simple top-down walk (no platforming physics), this avoids Phaser's bundle size entirely. Recommended if load-time is a priority. |
| UI overlays | **React + Tailwind CSS + shadcn/ui** | Dialogue boxes, level-complete cards, inventory screens, and all admin forms share one component library. |
| State bridge | **Zustand** | A tiny store the Phaser scene writes to (`onNodeEnter`) and React reads from to trigger overlays. No prop drilling between canvas and DOM. |
| Database | **PostgreSQL** (hosted on **Supabase** or **Neon**) | Structured, relational data (jobs, projects, skills, ordering) fits SQL well; Supabase also gives you storage + auth if you want to consolidate vendors. |
| ORM | **Prisma** | Type-safe queries, migrations, and a schema file that doubles as documentation. |
| Admin auth | **NextAuth.js** (Credentials provider, single admin user) or **Clerk** if you want hosted auth with less setup | Only one person needs to log in — keep it simple. Email+password or a magic link is enough; no need for social login. |
| File/image storage | **Supabase Storage** or **Cloudinary** | Project screenshots, avatar, custom sprites uploaded from the admin panel. |
| Content revalidation | **Next.js ISR / `revalidatePath`** | When the admin saves a change, the public site's cached data is invalidated on demand — no full redeploy needed. |
| Deployment | **Vercel** (app) + **Supabase** (DB/storage) | Both have generous free tiers and integrate cleanly with Next.js. |
| Level design (optional, static maps) | **Tiled** → JSON, loaded by Phaser | Only needed if the *shape* of the map (walls, terrain) is hand-designed. Node *content* still comes from the DB — see §5. |
| Art | **Kenney.nl** free sprite/tile packs | Fastest legitimate path to decent-looking assets. |

**Key architectural shift from the original plan:** content is no longer baked into React components. It's rows in a database, fetched through API routes, and rendered by both the game world (as nodes) and the overlays (as text/images). The admin dashboard is simply a second front-end that writes to the same tables.

---

## 3. System Architecture

```
                    ┌─────────────────────────┐
                    │        PostgreSQL        │
                    │  (bio, jobs, projects,   │
                    │   skills, contact, map)  │
                    └───────────┬─────────────┘
                                │ Prisma
                    ┌───────────┴─────────────┐
                    │     Next.js API Routes   │
                    │  /api/content/*  (public,│
                    │  read-only, cached)      │
                    │  /api/admin/*  (auth'd,  │
                    │  CRUD, revalidates cache)│
                    └─────┬───────────────┬────┘
                          │               │
              ┌───────────┘               └───────────┐
              ▼                                        ▼
   ┌─────────────────────┐                 ┌─────────────────────┐
   │   Public Game Site   │                 │   Admin Dashboard    │
   │  Phaser canvas +      │                 │  /admin (NextAuth-   │
   │  React overlays,      │                 │  protected), forms   │
   │  Zustand bridge,      │                 │  for every section,  │
   │  nodes generated       │                 │  drag-to-reorder,    │
   │  from DB content       │                 │  image upload        │
   └─────────────────────┘                 └─────────────────────┘
```

**Flow:** Owner logs into `/admin` → edits a job entry or uploads a new project screenshot → saves → API route writes to Postgres and calls `revalidatePath('/')` → next visitor to the game site gets fresh content, and the world map regenerates its nodes based on however many jobs/projects now exist. No code changes, no redeploy.

---

## 4. Data Model

Designed in Prisma schema style — this is the single source of truth both the game and the admin panel read/write against.

```prisma
model Bio {
  id        String   @id @default(cuid())
  name      String
  tagline   String
  bioText   String   @db.Text
  avatarUrl String?
  updatedAt DateTime @updatedAt
}

model Experience {
  id          String   @id @default(cuid())
  title       String
  company     String
  startDate   DateTime
  endDate     DateTime?          // null = "present"
  description String   @db.Text
  badgeIcon   String?            // icon key or uploaded asset URL
  sortOrder   Int                // controls chronological node placement
  published   Boolean  @default(true)
}

model Project {
  id          String   @id @default(cuid())
  title       String
  description String   @db.Text
  techStack   String[]           // e.g. ["Next.js", "Phaser", "Prisma"]
  liveUrl     String?
  repoUrl     String?
  imageUrls   String[]
  sortOrder   Int
  published   Boolean  @default(true)
}

model Skill {
  id        String   @id @default(cuid())
  name      String
  category  String              // e.g. "Frontend", "Backend", "Tools"
  level     Int                 // 1–100, drives the "stat sheet" bar/number
  icon      String?
  sortOrder Int
}

model ContactInfo {
  id           String   @id @default(cuid())
  email        String
  socialLinks  Json               // { github: "...", linkedin: "...", x: "..." }
  formEnabled  Boolean  @default(true)
}

model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String   @db.Text
  createdAt DateTime @default(now())
  read      Boolean  @default(false)
}

model SiteSettings {
  id              String  @id @default(cuid())
  gameMode        String  @default("topdown")  // "topdown" | "platformer"
  soundEnabled    Boolean @default(false)
  themeColor      String  @default("#22c55e")
  skipViewDefault Boolean @default(false)       // whether skip-to-normal loads first
}
```

**Why `sortOrder` matters:** it's what lets the world map be procedurally generated. The game doesn't hardcode "job 1 is at position X" — it fetches `Experience` sorted by `sortOrder`, then lays out that many nodes along a path template. Add a job in the admin panel, and a new node appears on the map automatically.

---

## 5. Public Site Implementation

### 5.1 Dynamic world-map generation
Instead of a hand-built Tiled map with fixed node positions, use a **path template**: a predefined spline/waypoint list drawn once in Tiled (or plain coordinates), long enough for, say, up to 15 nodes. At runtime:

1. Fetch published `Experience` + `Project` rows, sorted by `sortOrder`.
2. Map each row to the next waypoint on the template path.
3. Spawn a trigger zone + sprite at that waypoint, tagged with the row's `id` and `type` (`job` | `project`).
4. If there are fewer entries than waypoints, simply stop early; if there might be more than the template supports, design the template generously or paginate into "areas" (village 1 = jobs, village 2 = projects).

This avoids ever having to redesign the map when the owner adds a new job.

### 5.2 Event bridge
```ts
// store/gameStore.ts
import { create } from 'zustand'

type Node = { id: string; type: 'job' | 'project' | 'skill' | 'contact'; data: unknown }

export const useGameStore = create<{
  activeNode: Node | null
  visited: Set<string>
  enterNode: (n: Node) => void
  closeOverlay: () => void
}>((set) => ({
  activeNode: null,
  visited: new Set(),
  enterNode: (n) => set((s) => ({ activeNode: n, visited: new Set(s.visited).add(n.id) })),
  closeOverlay: () => set({ activeNode: null }),
}))
```
Phaser's trigger-zone overlap callback calls `useGameStore.getState().enterNode(...)`. React overlays subscribe to `activeNode` and render the matching modal — content pulled straight from the fetched DB row, so the overlay text is *never* hardcoded either.

### 5.3 Content fetching
Public pages use a cached fetch (ISR, e.g. `revalidate: 60` or on-demand via `revalidatePath`) hitting `/api/content/all`, which returns bio + experiences + projects + skills + contact info + site settings in one payload. One request, no waterfall, and the whole game boots from a single JSON blob.

### 5.4 Accessibility & SEO (non-negotiable, per original spec)
- Every overlay is real DOM text (not canvas-rendered), so screen readers and search engines see actual bio/job/project content.
- A persistent **"Skip to normal view"** toggle renders the exact same DB content as a plain scrollable page — this is just a second, simpler consumer of the same `/api/content/all` endpoint.
- On-screen d-pad + action button for mobile; keyboard arrows/WASD for desktop.

---

## 6. Admin Dashboard Design

**Route:** `/admin`, gated by NextAuth middleware (redirects to `/admin/login` if unauthenticated). Single admin account is enough — no roles/permissions system needed unless multiple people will edit it.

### Pages
| Page | Purpose |
|---|---|
| `/admin/login` | Email + password (or magic link) sign-in. |
| `/admin` (dashboard home) | At-a-glance counts (jobs, projects, skills, unread messages) + quick links. |
| `/admin/bio` | Single form: name, tagline, bio text, avatar upload. |
| `/admin/experience` | Table of jobs with drag-to-reorder (`sortOrder`), add/edit/delete, publish toggle. |
| `/admin/projects` | Same pattern: table + drag-to-reorder + multi-image upload + tech-stack tag input. |
| `/admin/skills` | Table grouped by category, level slider (1–100), reorder within category. |
| `/admin/contact` | Edit email/social links; view a list of form submissions with a "mark read" action. |
| `/admin/settings` | Toggle game mode (topdown/platformer), theme color picker, sound default, skip-view default. |
| `/admin/preview` | Embeds the live public site in an iframe so the owner can see changes immediately. |

### UX details worth building in from day one
- **Drag-to-reorder** (e.g. `@dnd-kit/core`) directly updates `sortOrder` for jobs/projects/skills — this is the one piece of "admin" work that's genuinely game-specific, since order controls node placement on the map.
- **Optimistic UI + toast confirmations** on save, so the non-technical owner gets clear feedback.
- **Image upload widget** with drag-and-drop, preview thumbnail, and automatic upload to Supabase Storage/Cloudinary, returning a URL saved to the row.
- **Publish/unpublish toggle** per job/project, so drafts can be prepared without showing up on the live map yet.
- **Form validation** (e.g. `zod` + `react-hook-form`) so the owner can't save a job with a missing title, etc.

### API endpoints (all under `/api/admin/*`, NextAuth-protected)
```
GET    /api/admin/experience
POST   /api/admin/experience
PATCH  /api/admin/experience/:id
DELETE /api/admin/experience/:id
PATCH  /api/admin/experience/reorder   (bulk sortOrder update)

... same pattern for /projects and /skills

GET    /api/admin/contact-submissions
PATCH  /api/admin/contact-submissions/:id   (mark read)

GET/PATCH /api/admin/bio
GET/PATCH /api/admin/settings
```
Public, read-only, unauthenticated:
```
GET /api/content/all     -> { bio, experience[], projects[], skills[], contact, settings }
POST /api/content/contact-submit   -> writes a ContactSubmission row (rate-limited)
```

### Build-vs-buy note
If you'd rather not hand-roll the admin CRUD screens, a headless CMS like **Payload CMS** or **Sanity Studio** gives you a generated admin UI on top of a schema you define, and can sit in front of the same Postgres database (Payload) or its own hosted store (Sanity). That trades some control over game-specific fields (like drag-to-reorder tied to map placement) for much less admin-UI code to write and maintain. Worth evaluating if development time is tighter than the roadmap below assumes.

---

## 7. Roadmap

| Phase | Duration | Focus |
|---|---|---|
| 1. Data model & backend foundation | 3–4 days | Define Prisma schema, set up Postgres (Supabase), NextAuth for a single admin user, seed data. |
| 2. Admin dashboard — content CRUD | 5–6 days | Build `/admin/bio`, `/experience`, `/projects`, `/skills`, `/contact`, `/settings` with forms, validation, image upload. |
| 3. Admin dashboard — ordering & polish | 2–3 days | Drag-to-reorder, publish toggles, preview iframe, toast/optimistic UI. |
| 4. Game design & assets | 3–4 days | Choose top-down vs platformer, sketch path template, source Kenney.nl sprites, build base Tiled map. |
| 5. Core game loop | 5–6 days | Phaser scene, movement, collision, trigger zones tied to DB-driven node IDs. |
| 6. Dynamic node generation | 2–3 days | Map fetched `Experience`/`Project` rows onto path-template waypoints; handle "fewer/more nodes than template" cases. |
| 7. Event bridge & overlays | 4–5 days | Zustand store, all React overlay components rendering real DB content, dialogue/level-complete styling. |
| 8. Mobile controls & responsiveness | 2–3 days | On-screen d-pad/action button, responsive canvas sizing. |
| 9. Fallback, accessibility, polish | 3–4 days | "Skip to normal view" toggle (same API, plain layout), sound toggle, HUD progress indicator, screen-reader pass. |
| 10. Caching, revalidation, QA | 2–3 days | ISR/on-demand revalidation on admin save, load-time testing, real-device touch testing, end-to-end admin→game content check. |

**Total: ~6–7 weeks** (up from the original ~4 weeks — the added time is entirely the backend + admin dashboard, which wasn't in the original static-content plan).

---

## 8. Suggested Folder Structure

```
/app
  /(public)
    page.tsx                 -> mounts the game (client component)
    /skip-view/page.tsx      -> plain scrollable fallback
  /admin
    layout.tsx                -> auth guard
    /login/page.tsx
    page.tsx                  -> dashboard home
    /bio/page.tsx
    /experience/page.tsx
    /projects/page.tsx
    /skills/page.tsx
    /contact/page.tsx
    /settings/page.tsx
  /api
    /content/all/route.ts
    /content/contact-submit/route.ts
    /admin/experience/route.ts
    /admin/experience/[id]/route.ts
    /admin/experience/reorder/route.ts
    /admin/projects/...
    /admin/skills/...
    /admin/bio/route.ts
    /admin/settings/route.ts
    /admin/contact-submissions/route.ts
/components
  /game            -> Phaser wrapper, scenes, path-template config
  /overlays        -> DialogueBox, LevelCompleteModal, SkillSheet, ContactQuest
  /admin           -> shared form fields, DraggableTable, ImageUploader
/lib
  prisma.ts
  auth.ts            -> NextAuth config
  store.ts           -> Zustand game store
/prisma
  schema.prisma
  seed.ts
```

---

## 9. Watch-outs

- **Non-negotiable:** the "skip to normal view" toggle must always be one click away and must render the same content the game uses — never let it drift out of sync, since it's the accessibility/recruiter-speed fallback.
- **Content lives in the DOM, not just the canvas** — overlays are real React components with real text, for SEO and screen readers.
- **Keep controls dead simple** — movement + one action button, no combos.
- **Design the path template generously** — pick a waypoint count comfortably above how many jobs/projects the owner will realistically add, so the admin panel doesn't silently run out of map space.
- **Validate admin input** — a missing title or a broken image URL shouldn't be able to break the live game; validate on the server, not just the client.
- **Rate-limit the public contact-submit endpoint** — it's the one unauthenticated write path into the database.
- **Cache invalidation discipline** — every admin save should trigger `revalidatePath`/`revalidateTag` for the public site; stale content after an edit is the most visible bug this architecture can produce.
