import { create } from 'zustand';

interface UseProjectModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProjectModal = create<UseProjectModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));