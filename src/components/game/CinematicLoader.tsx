"use client";

import { useGameStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function CinematicLoader() {
  const gameReady = useGameStore((state) => state.gameReady);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-1000 ease-in-out ${
        gameReady ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Glowing Orb Animation */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute h-32 w-32 animate-ping rounded-full bg-accent/20"></div>
        <div className="absolute h-24 w-24 animate-pulse rounded-full bg-accent/40 blur-xl"></div>
        <div className="relative h-12 w-12 rounded-full bg-foreground shadow-[0_0_40px_rgba(255,255,255,0.8)]"></div>
      </div>

      {/* Loading Text */}
      <h1 className="font-heading text-2xl font-bold tracking-[0.3em] text-foreground uppercase animate-pulse">
        Initializing
      </h1>
      
      {/* Progress Line */}
      <div className="mt-6 h-[2px] w-48 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-full origin-left bg-accent animate-[loading-bar_1.5s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
