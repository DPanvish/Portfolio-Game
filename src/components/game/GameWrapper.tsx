"use client";

import dynamic from "next/dynamic";
import UIOverlay from "./UIOverlay";
import MobileControls from "./MobileControls";
import CinematicLoader from "./CinematicLoader";
import GameHUD from "./GameHUD";

const PhaserGame = dynamic(() => import("./PhaserGame"), {
  ssr: false,
  loading: () => null,
});

export default function GameWrapper() {
  return (
    <div className="relative h-screen w-screen overflow-hidden" style={{ background: "#000510" }}>
      <CinematicLoader />
      <PhaserGame />
      <GameHUD />
      <UIOverlay />
      <MobileControls />
    </div>
  );
}
