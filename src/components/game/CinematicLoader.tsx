"use client";

import { useGameStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CinematicLoader() {
  const gameReady = useGameStore((s) => s.gameReady);
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState(0); // 0=boot, 1=scanning, 2=done

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!gameReady && (
        <motion.div
          key="loader"
          className="absolute inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "radial-gradient(ellipse at center, #020B2A 0%, #000510 60%, #000000 100%)" }}
          exit={{ opacity: 0, scale: 1.08, filter: "blur(20px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Scan lines overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
            backgroundSize: "100% 4px",
          }} />

          {/* Corner brackets */}
          {[
            "top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"
          ].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-12 h-12`}>
              <div className="absolute top-0 left-0 w-[2px] h-5 bg-cyan-400/60" />
              <div className="absolute top-0 left-0 h-[2px] w-5 bg-cyan-400/60" />
              <div className="absolute bottom-0 right-0 w-[2px] h-5 bg-cyan-400/60" />
              <div className="absolute bottom-0 right-0 h-[2px] w-5 bg-cyan-400/60" />
            </div>
          ))}

          {/* Center reticle */}
          <div className="relative flex items-center justify-center mb-12">
            <motion.div
              className="absolute rounded-full border border-cyan-400/20"
              animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              style={{ width: 80, height: 80 }}
            />
            <motion.div
              className="absolute rounded-full border border-cyan-400/40"
              animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
              style={{ width: 60, height: 60 }}
            />
            {/* Outer ring */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border border-cyan-400/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-1 rounded-full border border-dashed border-blue-500/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              {/* Center dot */}
              <div className="w-3 h-3 rounded-full bg-white" style={{ boxShadow: "0 0 20px #ffffff, 0 0 40px #38bdf8" }} />
              {/* Cross-hairs */}
              <div className="absolute w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
              <div className="absolute h-24 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent" />
            </div>
          </div>

          {/* Boot text */}
          <div className="text-center space-y-3">
            <motion.h1
              className="font-heading text-base font-black tracking-[0.6em] text-white uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              PORTFOLIO.EXE
            </motion.h1>
            <motion.p
              className="font-mono text-xs tracking-[0.3em] text-cyan-400/70 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {phase === 0 ? "BOOTING SYSTEM..." : phase === 1 ? "SCANNING NODES..." : "READY"}
            </motion.p>

            {/* Progress bar */}
            <div className="mt-6 h-[2px] w-56 mx-auto bg-slate-900 rounded-none overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400"
                style={{ boxShadow: "0 0 8px #22d3ee" }}
                initial={{ width: "0%" }}
                animate={{ width: phase === 0 ? "30%" : phase === 1 ? "80%" : "100%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
