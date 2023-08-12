"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateConversationModal } from "@/hooks/use-conversation-modal";
import { Plus } from "lucide-react";

export function ConversationsHeader() {
  const createConversationModalStore = useCreateConversationModal();

  return (
    <header className="p-4 flex items-center gap-2">
      <Input placeholder="Procure..." />
      <Button onClick={createConversationModalStore.onOpen} className="h-[40px]" size="sm">
        <Plus className="w-6 h-6" />
      </Button>
    </header>
  );
}
