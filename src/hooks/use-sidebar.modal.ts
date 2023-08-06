import { create } from 'zustand';

interface UseSidebarStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSidebar = create<UseSidebarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));