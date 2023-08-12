import { ProjectHeader } from "@/components/project-header";
import { ProjectNavbar } from "@/components/project-navbar";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { projectId: string };
}) {
  const project = await prisma.project.findUnique({
    where: {
      id: params.projectId,
    },
    include: {
      tags: true,
    },
  });

  if (!project) {
    return notFound();
  }

  return (
    <div className="flex flex-col">
      <ProjectHeader project={project} />

      <ProjectNavbar />

      <div className="mt-6">{children}</div>
    </div>
  );
}
