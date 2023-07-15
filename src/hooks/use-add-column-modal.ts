import { create } from "zustand";

interface AddColumnModalStore {
  data: {
    isOpen: boolean;
    handleAddColumn: (columnName: string) => void;
  };
  onOpen: (
    handleAddColumn: (columnName: string) => void
  ) => void;
  onClose: () => void;
}

export const useAddColumnModal = create<AddColumnModalStore>((set) => ({
  data: {
    containerId: "",
    isOpen: false,
    handleAddColumn: (columnName) => {},
  },
  onOpen: (handleAddColumn) =>
    set({ data: { isOpen: true, handleAddColumn } }),
  onClose: () =>
    set({
      data: {
        isOpen: false,
        handleAddColumn: (columnName) => {},
      },
    }),
}));
