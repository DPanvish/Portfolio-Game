"use client";

import dynamic from "next/dynamic";
import UIOverlay from "./UIOverlay";
import MobileControls from "./MobileControls";
import Link from "next/link";

// We must dynamically import the Phaser game component with ssr: false
// because Phaser requires the window/document objects which aren't available on the server.
const PhaserGame = dynamic(() => import("./PhaserGame"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-background text-foreground/50">
      Loading Game Engine...
    </div>
  ),
});

export default function GameWrapper() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Skip View accessibility link */}
      <div className="absolute top-4 right-4 z-40">
        <Link 
          href="/skip-view" 
          className="rounded-full bg-card/60 backdrop-blur-md px-4 py-2 text-sm font-medium border border-border text-muted-foreground hover:text-foreground hover:border-accent transition-colors shadow-lg"
        >
          Standard View &rarr;
        </Link>
      </div>

      <PhaserGame />
      <UIOverlay />
      <MobileControls />
    </div>
  );
}
