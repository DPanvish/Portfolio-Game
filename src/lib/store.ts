import { create } from 'zustand';

export type NodeData = {
  type: 'experience' | 'project' | 'skill' | 'education' | 'startup' | 'footprint';
  data: any; // We'll keep it as any for the store, but it maps to our mockData types
};

interface GameState {
  activeNode: NodeData | null;
  visitedNodes: Set<string>;
  mobileMovement: { up: boolean; down: boolean; left: boolean; right: boolean };
  setActiveNode: (node: NodeData | null) => void;
  markNodeVisited: (id: string) => void;
  setMobileMovement: (dir: keyof GameState['mobileMovement'], isDown: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
  activeNode: null,
  visitedNodes: new Set(),
  mobileMovement: { up: false, down: false, left: false, right: false },
  setActiveNode: (node) => set({ activeNode: node }),
  markNodeVisited: (id) =>
    set((state) => {
      const newVisited = new Set(state.visitedNodes);
      newVisited.add(id);
      return { visitedNodes: newVisited };
    }),
  setMobileMovement: (dir, isDown) =>
    set((state) => ({
      mobileMovement: { ...state.mobileMovement, [dir]: isDown },
    })),
}));
