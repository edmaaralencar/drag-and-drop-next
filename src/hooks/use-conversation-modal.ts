import { create } from 'zustand';

interface UseConversationModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateConversationModal = create<UseConversationModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));