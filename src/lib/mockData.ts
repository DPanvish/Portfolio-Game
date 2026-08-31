// Types mimicking our future Prisma schema

export type Bio = {
  id: string
  name: string
  tagline: string
  bioText: string
  avatarUrl: string | null
}

export type Experience = {
  id: string
  title: string
  company: string
  startDate: string
  endDate: string | null
  description: string
  badgeIcon: string | null
  sortOrder: number
}

export type Project = {
  id: string
  title: string
  description: string
  techStack: string[]
  liveUrl: string | null
  repoUrl: string | null
  imageUrls: string[]
  sortOrder: number
}

export type Skill = {
  id: string
  name: string
  category: string
  level: number
  icon: string | null
  sortOrder: number
}

export type ContactInfo = {
  email: string
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}

// Mock Data

export const mockBio: Bio = {
  id: 'bio-1',
  name: 'Jane Developer',
  tagline: 'Full-Stack Engineer & Game Enthusiast',
  bioText: 'I build interactive web experiences that blend solid engineering with creative design. When I am not coding, I am probably playing indie games or learning about procedural generation.',
  avatarUrl: null
}

export const mockExperiences: Experience[] = [
  {
    id: 'exp-1',
    title: 'Senior Frontend Engineer',
    company: 'TechCorp',
    startDate: '2022-01-01',
    endDate: null,
    description: 'Led the transition from a monolithic React app to a Next.js App Router architecture. Improved performance by 40% and mentored junior developers.',
    badgeIcon: null,
    sortOrder: 1
  },
  {
    id: 'exp-2',
    title: 'Web Developer',
    company: 'Creative Agency',
    startDate: '2019-06-01',
    endDate: '2021-12-31',
    description: 'Built award-winning marketing sites using React, Three.js, and GSAP. Collaborated closely with designers to ensure pixel-perfect implementations.',
    badgeIcon: null,
    sortOrder: 2
  }
]

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Gamified Task Manager',
    description: 'A productivity app where completing tasks earns you XP and levels up a virtual pet. Built to make daily chores more engaging.',
    techStack: ['Next.js', 'Tailwind', 'Zustand', 'PostgreSQL'],
    liveUrl: 'https://example.com/task',
    repoUrl: 'https://github.com/example/task',
    imageUrls: [],
    sortOrder: 1
  },
  {
    id: 'proj-2',
    title: 'E-commerce Storefront',
    description: 'A high-performance headless e-commerce frontend connected to Shopify. Features aggressive caching and optimistic UI updates.',
    techStack: ['React', 'Remix', 'Shopify Storefront API'],
    liveUrl: 'https://example.com/shop',
    repoUrl: 'https://github.com/example/shop',
    imageUrls: [],
    sortOrder: 2
  }
]

export const mockSkills: Skill[] = [
  { id: 'skill-1', name: 'TypeScript', category: 'Frontend', level: 90, icon: null, sortOrder: 1 },
  { id: 'skill-2', name: 'React / Next.js', category: 'Frontend', level: 85, icon: null, sortOrder: 2 },
  { id: 'skill-3', name: 'Node.js', category: 'Backend', level: 75, icon: null, sortOrder: 3 },
  { id: 'skill-4', name: 'PostgreSQL', category: 'Backend', level: 70, icon: null, sortOrder: 4 },
  { id: 'skill-5', name: 'Phaser 3', category: 'Game Dev', level: 60, icon: null, sortOrder: 5 }
]

export const mockContact: ContactInfo = {
  email: 'hello@example.com',
  socialLinks: {
    github: 'https://github.com/example',
    linkedin: 'https://linkedin.com/in/example',
    twitter: 'https://twitter.com/example'
  }
}
