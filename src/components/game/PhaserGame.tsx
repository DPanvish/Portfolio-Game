import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { MainScene } from '@/game/scenes/MainScene';

export default function PhaserGame() {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserInstance = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current || phaserInstance.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: '100%',
      height: '100%',
      parent: gameRef.current,
      backgroundColor: '#0F172A', // Our Deep Midnight Slate background
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0, x: 0 }, // Top-down, no gravity
          debug: false,
        },
      },
      scene: [MainScene],
    };

    phaserInstance.current = new Phaser.Game(config);

    return () => {
      phaserInstance.current?.destroy(true);
      phaserInstance.current = null;
    };
  }, []);

  return <div ref={gameRef} className="h-full w-full" />;
}
