"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter } from "next/navigation";
import { useCreateProjectModal } from "@/hooks/use-project-modal";

export function ProjectsHeader() {
  const router = useRouter();
  const createProjectModalStore = useCreateProjectModal();

  function handleFilterByStatus(value: string) {
    router.push(`/projects?status=${value}`);
  }

  return (
    <div className="w-full flex justify-between items-center">
      <Select defaultValue="all" onValueChange={handleFilterByStatus}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="in-progress">Em progresso</SelectItem>
            <SelectItem value="completed">Completo</SelectItem>
            <SelectItem value="not-started">Não iniciado</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={createProjectModalStore.onOpen} className="gap-1">
        Criar
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}
