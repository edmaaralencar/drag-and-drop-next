"use client";

import { cn } from "@/lib/utils";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";

export function Trash({ id }: { id: UniqueIdentifier }) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex items-center justify-center fixed z-10 left-1/2 ml-[-150px] bottom-5 w-[300px] h-16 rounded-sm border",
        isOver ? "border-red-700" : "border-[#DDD]"
      )}
    >
      Drop here to delete
    </div>
  );
}
