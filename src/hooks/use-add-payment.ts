import { create } from 'zustand';

interface UseAddPaymentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAddPaymentModal = create<UseAddPaymentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));