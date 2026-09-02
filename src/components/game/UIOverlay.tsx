"use client";

import { useGameStore, NodeData } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, GraduationCap, Code2, Rocket, Activity, CheckCircle2, Calendar, MapPin, ExternalLink, GitBranch } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";

// ─── COLOR MAP ────────────────────────────────────────────────────────────────
const TYPE_CONFIG: Record<string, { color: string; glow: string; label: string; icon: React.ReactNode }> = {
  experience: { color: "#F59E0B", glow: "rgba(245,158,11,0.2)",  label: "EXPERIENCE",  icon: <Briefcase  className="w-4 h-4" /> },
  education:  { color: "#A855F7", glow: "rgba(168,85,247,0.2)", label: "EDUCATION",   icon: <GraduationCap className="w-4 h-4" /> },
  project:    { color: "#3B82F6", glow: "rgba(59,130,246,0.2)", label: "PROJECT",     icon: <Code2      className="w-4 h-4" /> },
  startup:    { color: "#EF4444", glow: "rgba(239,68,68,0.2)",  label: "STARTUP",     icon: <Rocket     className="w-4 h-4" /> },
  footprint:  { color: "#22C55E", glow: "rgba(34,197,94,0.2)",  label: "FOOTPRINT",   icon: <Activity   className="w-4 h-4" /> },
  skill:      { color: "#06B6D4", glow: "rgba(6,182,212,0.2)",  label: "SKILL",       icon: <CheckCircle2 className="w-4 h-4" /> },
};

// ─── CONTENT PANELS ───────────────────────────────────────────────────────────
function ExperiencePanel({ data, color }: { data: any; color: string }) {
  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-black tracking-widest uppercase font-heading" style={{ color }}>
        {data.title}
      </h2>
      <div className="flex items-center gap-3" style={{ color: `${color}99` }}>
        <Briefcase className="w-4 h-4" />
        <span className="text-lg tracking-wider font-mono">{data.company}</span>
      </div>
      <div className="flex items-center gap-2 text-sm font-mono text-slate-500 border-b pb-5" style={{ borderColor: `${color}25` }}>
        <Calendar className="w-3.5 h-3.5" />
        <span>{data.startDate} — {data.endDate || 'PRESENT'}</span>
      </div>
      <p className="text-slate-300 font-mono text-sm leading-7">{data.description}</p>
    </div>
  );
}

function EducationPanel({ data, color }: { data: any; color: string }) {
  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-black tracking-widest uppercase font-heading" style={{ color }}>
        {data.institution}
      </h2>
      <p className="text-lg font-mono text-slate-300 tracking-wider">{data.degree}</p>
      <div className="grid grid-cols-2 gap-3 pt-4 border-t" style={{ borderColor: `${color}25` }}>
        <div className="rounded-lg border p-3 font-mono text-sm" style={{ borderColor: `${color}30`, background: `${color}0A` }}>
          <div className="text-slate-500 text-xs mb-1 uppercase tracking-widest">LOCATION</div>
          <div className="flex items-center gap-2" style={{ color }}><MapPin className="w-3 h-3" />{data.location}</div>
        </div>
        <div className="rounded-lg border p-3 font-mono text-sm" style={{ borderColor: `${color}30`, background: `${color}0A` }}>
          <div className="text-slate-500 text-xs mb-1 uppercase tracking-widest">SCORE</div>
          <div style={{ color }} className="font-black text-xl">{data.score}</div>
        </div>
      </div>
      <div className="font-mono text-sm text-slate-500">{data.startDate} — {data.endDate}</div>
    </div>
  );
}

function ProjectPanel({ data, color }: { data: any; color: string }) {
  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-black tracking-widest uppercase font-heading" style={{ color }}>{data.title}</h2>
      <p className="text-slate-300 font-mono text-sm leading-7">{data.description}</p>
      <div className="flex flex-wrap gap-2 pt-3 border-t" style={{ borderColor: `${color}25` }}>
        {data.techStack.map((t: string) => (
          <span key={t} className="px-3 py-1 rounded-sm font-mono text-xs border uppercase tracking-widest"
            style={{ borderColor: `${color}40`, color: `${color}CC`, background: `${color}0D` }}>{t}</span>
        ))}
      </div>
      <div className="flex gap-4 pt-2">
        {data.liveUrl && <a href={data.liveUrl} target="_blank" className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-opacity hover:opacity-70" style={{ color }}><ExternalLink className="w-3 h-3" />Live</a>}
        {data.repoUrl && <a href={data.repoUrl} target="_blank" className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-400 hover:text-slate-200 transition-colors"><GitBranch className="w-3 h-3" />Source</a>}
      </div>
    </div>
  );
}

function StartupPanel({ data, color }: { data: any; color: string }) {
  return (
    <div className="space-y-5">
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Stealth Mode</div>
        <h2 className="text-4xl font-black tracking-widest uppercase font-heading" style={{ color }}>{data.name}</h2>
        <p className="text-xl font-mono mt-2" style={{ color: `${color}99` }}>{data.tagline}</p>
      </div>
      <p className="text-slate-300 font-mono text-sm leading-7">{data.description}</p>
      <div className="rounded-lg border-l-2 pl-4 py-3 font-mono text-sm italic text-slate-400" style={{ borderColor: color }}>
        "{data.vision}"
      </div>
      <div className="flex flex-wrap gap-2 pt-3 border-t" style={{ borderColor: `${color}25` }}>
        {data.techStack.map((t: string) => (
          <span key={t} className="px-3 py-1 rounded-sm font-mono text-xs border uppercase tracking-widest"
            style={{ borderColor: `${color}40`, color: `${color}CC`, background: `${color}0D` }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function FootprintPanel({ data, color }: { data: any; color: string }) {
  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-black tracking-widest uppercase font-heading" style={{ color }}>Coding Footprint</h2>
      <p className="font-mono text-sm text-slate-400">
        Live contributions for <span style={{ color }}>@{data.githubUsername}</span>
      </p>
      <div className="rounded-lg border p-4 overflow-x-auto" style={{ borderColor: `${color}30`, background: `${color}05` }}>
        <GitHubCalendar username={data.githubUsername} colorScheme="dark" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {data.leetcodeUsername && (
          <div className="rounded-lg border p-3 font-mono text-sm" style={{ borderColor: `${color}30`, background: `${color}0A` }}>
            <div className="text-slate-500 text-xs uppercase tracking-widest mb-1">LeetCode</div>
            <div style={{ color }}>{data.leetcodeUsername}</div>
          </div>
        )}
        {data.codeforcesUsername && (
          <div className="rounded-lg border p-3 font-mono text-sm" style={{ borderColor: `${color}30`, background: `${color}0A` }}>
            <div className="text-slate-500 text-xs uppercase tracking-widest mb-1">Codeforces</div>
            <div style={{ color }}>{data.codeforcesUsername}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function SkillPanel({ data, color }: { data: any; color: string }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black tracking-widest uppercase font-heading" style={{ color }}>{data.name}</h2>
      <div className="inline-block px-3 py-1 rounded-sm border font-mono text-xs uppercase tracking-widest"
        style={{ borderColor: `${color}40`, color: `${color}BB`, background: `${color}10` }}>
        {data.category}
      </div>
      <div className="space-y-3">
        <div className="flex justify-between font-mono text-xs text-slate-500">
          <span>PROFICIENCY</span>
          <span style={{ color }}>{data.level}%</span>
        </div>
        <div className="relative h-2 w-full bg-slate-900 rounded-none border" style={{ borderColor: `${color}20` }}>
          <motion.div
            className="absolute inset-y-0 left-0"
            style={{ background: `linear-gradient(90deg, ${color}80, ${color})`, boxShadow: `0 0 12px ${color}` }}
            initial={{ width: 0 }}
            animate={{ width: `${data.level}%` }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── MAIN OVERLAY ─────────────────────────────────────────────────────────────
export default function UIOverlay() {
  const activeNode = useGameStore((s) => s.activeNode);
  const setActiveNode = useGameStore((s) => s.setActiveNode);

  const cfg = activeNode ? (TYPE_CONFIG[activeNode.type] ?? TYPE_CONFIG.skill) : null;

  return (
    <AnimatePresence>
      {activeNode && cfg && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveNode(null)}
          />

          {/* Side Panel */}
          <motion.div
            key="panel"
            className="absolute right-0 top-0 bottom-0 z-50 w-full max-w-lg flex flex-col"
            style={{
              background: "linear-gradient(135deg, #020B1E 0%, #020B2A 100%)",
              borderLeft: `1px solid ${cfg.color}30`,
              boxShadow: `-20px 0 60px ${cfg.glow}, inset -1px 0 0 ${cfg.color}20`,
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-[2px] h-8" style={{ background: cfg.color }} />
              <div className="absolute top-0 left-0 h-[2px] w-8" style={{ background: cfg.color }} />
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
              <div className="absolute bottom-0 right-0 w-[2px] h-8" style={{ background: cfg.color }} />
              <div className="absolute bottom-0 right-0 h-[2px] w-8" style={{ background: cfg.color }} />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b" style={{ borderColor: `${cfg.color}20` }}>
              <div className="flex items-center gap-3" style={{ color: cfg.color }}>
                {cfg.icon}
                <span className="font-mono text-xs tracking-[0.4em] uppercase">{cfg.label}</span>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: cfg.color, boxShadow: `0 0 8px ${cfg.color}` }} />
              </div>
              <button
                onClick={() => setActiveNode(null)}
                className="flex items-center justify-center w-8 h-8 rounded-sm border text-slate-400 transition-all hover:text-white hover:scale-105 active:scale-95"
                style={{ borderColor: `${cfg.color}30` }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <motion.div
              className="flex-1 overflow-y-auto px-8 py-8 scrollbar-thin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
            >
              {activeNode.type === "experience"  && <ExperiencePanel data={activeNode.data} color={cfg.color} />}
              {activeNode.type === "education"   && <EducationPanel  data={activeNode.data} color={cfg.color} />}
              {activeNode.type === "project"     && <ProjectPanel   data={activeNode.data} color={cfg.color} />}
              {activeNode.type === "startup"     && <StartupPanel   data={activeNode.data} color={cfg.color} />}
              {activeNode.type === "footprint"   && <FootprintPanel data={activeNode.data} color={cfg.color} />}
              {activeNode.type === "skill"       && <SkillPanel     data={activeNode.data} color={cfg.color} />}
            </motion.div>

            {/* Footer scan line */}
            <div className="h-[1px] mx-8 mb-8" style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}60, transparent)` }} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
