"use client";

import { useGameStore } from "@/lib/store";
import { motion } from "framer-motion";
import { mockBio } from "@/lib/data";
import Link from "next/link";
import { allNodes } from "@/lib/nodeList";

export default function GameHUD() {
  const visitedNodes = useGameStore((s) => s.visitedNodes);
  const gameReady = useGameStore((s) => s.gameReady);
  const discovered = visitedNodes.size;
  const total = allNodes.length;
  const pct = total > 0 ? Math.round((discovered / total) * 100) : 0;

  if (!gameReady) return null;

  return (
    <>
      {/* ── TOP LEFT: Identity ─────────────────────── */}
      <motion.div
        className="absolute top-6 left-6 z-40 space-y-1"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      >
        <div className="font-heading text-sm font-black tracking-[0.3em] text-white uppercase">
          {mockBio.name}
        </div>
        <div className="font-mono text-[10px] tracking-[0.2em] text-cyan-400/70 uppercase">
          {mockBio.tagline}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ boxShadow: "0 0 6px #4ade80" }} />
          <span className="font-mono text-[9px] text-emerald-400/80 tracking-widest uppercase">SYSTEM ONLINE</span>
        </div>
      </motion.div>

      {/* ── TOP RIGHT: Nav ─────────────────────────── */}
      <motion.div
        className="absolute top-6 right-6 z-40 flex items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
      >
        <Link
          href="/skip-view"
          className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 hover:text-cyan-400 transition-colors px-4 py-2 border border-slate-700 hover:border-cyan-400/50 rounded-sm"
          style={{ background: "rgba(2,11,42,0.8)" }}
        >
          STD. VIEW
        </Link>
      </motion.div>

      {/* ── BOTTOM: XP / Progress Bar ──────────────── */}
      <motion.div
        className="absolute bottom-6 left-6 right-6 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-end justify-between mb-2">
          <div className="space-y-0.5">
            <div className="font-mono text-[9px] tracking-[0.35em] text-slate-500 uppercase">Nodes Discovered</div>
            <div className="font-heading text-sm text-white">
              <span className="text-cyan-400">{String(discovered).padStart(2, '0')}</span>
              <span className="text-slate-600 mx-1">/</span>
              <span>{String(total).padStart(2, '0')}</span>
            </div>
          </div>
          <div className="font-mono text-xs text-slate-500 tracking-widest">
            {pct}% <span className="text-slate-600">COMPLETE</span>
          </div>
        </div>

        {/* XP Bar */}
        <div className="relative h-1 w-full bg-slate-900 border border-slate-800 rounded-none overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0"
            style={{
              background: "linear-gradient(90deg, #0891b2, #22d3ee)",
              boxShadow: "0 0 10px #22d3ee80",
            }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          {/* Tick marks */}
          {[25, 50, 75].map(tick => (
            <div key={tick} className="absolute top-0 bottom-0 w-[1px] bg-slate-700" style={{ left: `${tick}%` }} />
          ))}
        </div>

        {/* Controls hint */}
        <div className="flex gap-6 mt-3">
          {[["WASD", "MOVE"], ["ENTER NODE", "AUTO"], ["ESC", "CLOSE"]].map(([key, action]) => (
            <div key={key} className="flex items-center gap-1.5">
              <kbd className="font-mono text-[8px] text-slate-300 bg-slate-800 border border-slate-600 px-1.5 py-0.5 rounded-sm tracking-wider">{key}</kbd>
              <span className="font-mono text-[8px] text-slate-600 uppercase tracking-widest">{action}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
