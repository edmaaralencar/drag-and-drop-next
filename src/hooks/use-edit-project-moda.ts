import { create } from "zustand";

interface UseEditProjectModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useEditProjectModal = create<UseEditProjectModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
