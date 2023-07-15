import { UniqueIdentifier } from "@dnd-kit/core";
import { create } from "zustand";

interface AddTaskModalStore {
  data: {
    isOpen: boolean;
    containerId: UniqueIdentifier;
    handleAddTask: (containerId: UniqueIdentifier, taskName: string) => void;
  };
  onOpen: (
    containerId: UniqueIdentifier,
    handleAddTask: (containerId: UniqueIdentifier, taskName: string) => void
  ) => void;
  onClose: () => void;
}

export const useAddTaskModal = create<AddTaskModalStore>((set) => ({
  data: {
    containerId: "",
    isOpen: false,
    handleAddTask: (containerId, taskName) => {},
  },
  onOpen: (containerId, handleAddTask) =>
    set({ data: { isOpen: true, containerId, handleAddTask } }),
  onClose: () =>
    set({
      data: {
        isOpen: false,
        containerId: "",
        handleAddTask: (containerId, taskName) => {},
      },
    }),
}));
