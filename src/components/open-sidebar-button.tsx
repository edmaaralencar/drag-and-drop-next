"use client";

import { useSidebar } from "@/hooks/use-sidebar.modal";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

export function OpenSidebarButton() {
  const sidebarStore = useSidebar();

  function handleToggleSidebar() {
    if (sidebarStore.isOpen) {
      sidebarStore.onClose();
    } else {
      sidebarStore.onOpen();
    }
  }

  return (
    <button
      className={cn("block md:hidden", sidebarStore.isOpen && "ml-[260px]")}
      onClick={handleToggleSidebar}
    >
      <Menu />
    </button>
  );
}
