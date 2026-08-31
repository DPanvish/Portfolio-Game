import GameWrapper from '@/components/game/GameWrapper';

export default function Home() {
  return (
    <main className="flex h-screen w-screen overflow-hidden flex-col items-center justify-center bg-background">
      <GameWrapper />
    </main>
  );
}
