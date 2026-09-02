"use client";

import { useGameStore } from "@/lib/store";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function MobileControls() {
  const setMobileMovement = useGameStore((state) => state.setMobileMovement);
  const activeNode = useGameStore((state) => state.activeNode);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Hide controls if we are not on a touch device or if a modal is open
  if (!isTouchDevice || activeNode) return null;

  const handlePointerDown = (dir: 'up' | 'down' | 'left' | 'right') => {
    setMobileMovement(dir, true);
  };

  const handlePointerUp = (dir: 'up' | 'down' | 'left' | 'right') => {
    setMobileMovement(dir, false);
  };

  return (
    <div className="pointer-events-none absolute bottom-8 left-8 right-8 z-40 flex items-end justify-between">
      {/* D-PAD */}
      <div className="relative flex h-36 w-36 items-center justify-center">
        {/* UP */}
        <button
          className="pointer-events-auto absolute top-0 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card/60 backdrop-blur-md active:bg-accent/80 active:text-accent-foreground touch-none"
          onPointerDown={() => handlePointerDown('up')}
          onPointerUp={() => handlePointerUp('up')}
          onPointerLeave={() => handlePointerUp('up')}
        >
          <ArrowUp className="h-6 w-6" />
        </button>
        {/* LEFT */}
        <button
          className="pointer-events-auto absolute left-0 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card/60 backdrop-blur-md active:bg-accent/80 active:text-accent-foreground touch-none"
          onPointerDown={() => handlePointerDown('left')}
          onPointerUp={() => handlePointerUp('left')}
          onPointerLeave={() => handlePointerUp('left')}
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        {/* RIGHT */}
        <button
          className="pointer-events-auto absolute right-0 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card/60 backdrop-blur-md active:bg-accent/80 active:text-accent-foreground touch-none"
          onPointerDown={() => handlePointerDown('right')}
          onPointerUp={() => handlePointerUp('right')}
          onPointerLeave={() => handlePointerUp('right')}
        >
          <ArrowRight className="h-6 w-6" />
        </button>
        {/* DOWN */}
        <button
          className="pointer-events-auto absolute bottom-0 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card/60 backdrop-blur-md active:bg-accent/80 active:text-accent-foreground touch-none"
          onPointerDown={() => handlePointerDown('down')}
          onPointerUp={() => handlePointerUp('down')}
          onPointerLeave={() => handlePointerUp('down')}
        >
          <ArrowDown className="h-6 w-6" />
        </button>
      </div>

      {/* ACTION BUTTON (Optional, can just be used to close modals or sprint) */}
      <div className="flex h-16 w-16 items-center justify-center">
         {/* We could add an action button here if needed, but movement is enough for a walk-and-collect portfolio */}
      </div>
    </div>
  );
}
