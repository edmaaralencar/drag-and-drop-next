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
import { useAddColumnModal } from "@/hooks/use-add-column-modal-hook";
import { useState } from "react";

export function AddColumnModal() {
  const addColumnModal = useAddColumnModal();
  const [columnName, setColumnName] = useState("");

  function onOpenChange() {
    if (addColumnModal.data.isOpen){
      addColumnModal.onClose();
    }
  }

  return (
    <Dialog open={addColumnModal.data.isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crie uma coluna</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Nome da coluna</Label>
            <Input
              id="name"
              className="col-span-3"
              value={columnName}
              onChange={(event) => setColumnName(event.target.value)}
            />
          </div>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addColumnModal?.data?.handleAddColumn(columnName)
            addColumnModal.onClose();
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
