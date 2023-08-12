"use client";

import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useEditProjectModal } from "@/hooks/use-edit-project-moda";
import type { Prisma } from "@prisma/client";
import { EditProjectModal } from "./modals/edit-project-modal";
import { formatDate } from "@/lib/date";

type ProjectHeaderProps = {
  project: Prisma.ProjectGetPayload<{
    include: {
      tags: true;
    };
  }>;
};

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const editProjectModalStore = useEditProjectModal();

  return (
    <>
      {/* <div className="flex flex-col gap-6 rounded-md p-4 border border-border"> */}
      <h2 className="text-3xl">{project.name}</h2>

      <div className="mt-5 flex justify-between items-end gap-2 p-6 border border-border rounded-lg relative">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <strong className="font-normal text-muted-foreground">
              Prioridade:
            </strong>
            <Badge>{project.priority}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <strong className="font-normal text-muted-foreground">
              Prazo:
            </strong>
            <span>
              {formatDate(project.deadlineDate, "E',' dd 'de' MMMM 'de' y")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <strong className="font-normal text-muted-foreground">
              Membros:
            </strong>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 border border-border py-1 px-2 rounded-full">
                <div className="rounded-lg">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                </div>
                <span className="text-sm">Edmar</span>
              </div>
              <div className="flex items-center gap-2 border border-border py-1 px-2 rounded-full">
                <div className="rounded-lg">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                </div>
                <span className="text-sm">Edmar</span>
              </div>
              <div className="flex items-center gap-2 border border-border py-1 px-2 rounded-full">
                <div className="rounded-lg">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                </div>
                <span className="text-sm">Edmar</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <strong className="font-normal text-muted-foreground">Tags:</strong>
            <div className="flex items-center gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag.id}>{tag.name}</Badge>
              ))}
            </div>
          </div>
        </div>

        <Button onClick={editProjectModalStore.onOpen}>Editar</Button>

        <button className="p-2 border border-border rounded-full absolute top-4 right-4">
          <Heart />
        </button>

        <EditProjectModal
          name={project.name}
          client={project.client}
          priority={project.priority}
          deadlineDate={project.deadlineDate}
          tags={project.tags}
        />
      </div>
    </>
  );
}
