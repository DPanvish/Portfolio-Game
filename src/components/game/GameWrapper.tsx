"use client";

import dynamic from "next/dynamic";
import UIOverlay from "./UIOverlay";

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
      <PhaserGame />
      <UIOverlay />
    </div>
  );
}
