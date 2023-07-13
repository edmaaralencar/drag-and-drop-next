"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddTaskModal } from "@/hooks/use-add-task-modal-hook";
import { useState } from "react";

export function AddTaskModal() {
  const addTaskModal = useAddTaskModal();
  const [taskName, setTaskName] = useState("");

  function onOpenChange() {
    if (addTaskModal.data.isOpen) {
      addTaskModal.onClose();
    }
  }

  return (
    <Dialog open={addTaskModal.data.isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crie uma task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Nome da Task</Label>
            <Input
              id="name"
              className="col-span-3"
              value={taskName}
              onChange={(event) => setTaskName(event.target.value)}
            />
          </div>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addTaskModal?.data?.handleAddTask(addTaskModal.data.containerId, taskName);
            addTaskModal.onClose();
          }}
        >
          <DialogFooter>
            <Button type="submit">Criar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
