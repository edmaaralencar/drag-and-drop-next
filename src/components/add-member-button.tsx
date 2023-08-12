"use client";

import { useAddMemberModal } from "@/hooks/use-add-member";
import { Plus } from "lucide-react";

export function AddMemberButton() {
  const addMemberModalStore = useAddMemberModal();

  return (
    <div
      onClick={addMemberModalStore.onOpen}
      className="p-4 rounded-md border border-border flex flex-col gap-5 justify-center items-center cursor-pointer min-h-[188px]"
    >
      <div className="w-12 h-12 rounded-full grid place-items-center bg-primary">
        <Plus className="text-background" />
      </div>

      <span className="underline text-center">Adicionar membro</span>
    </div>
  );
}
