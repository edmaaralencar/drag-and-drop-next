import { create } from 'zustand';

interface UseAddMemberModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAddMemberModal = create<UseAddMemberModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));