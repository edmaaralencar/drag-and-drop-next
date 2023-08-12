import { ProjectCard } from "@/components/project-card";
import { ProjectsHeader } from "@/components/projects-header";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      email: String(session?.user?.email),
    },
  });

  if (!user) {
    return null;
  }

  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { userId: user.id },
        {
          members: {
            some: {
              userId: user.id,
            },
          },
        },
      ],
    },
    include: {
      tags: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <ProjectsHeader />

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            client={project.client}
            name={project.name}
            deadlineDate={project.deadlineDate}
            priority={project.priority}
            tags={project.tags}
          />
        ))}
      </div>
    </div>
  );
}
