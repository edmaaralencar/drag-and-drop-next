import prisma from "@/lib/prisma";
import getCurrentUser from "./get-current-user";
import { redirect } from "next/navigation";

export async function getMembersOfAllProjects() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      redirect("/sign-in");
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
    });

    const members = await prisma.projectMember.findMany({
      where: {
        projectId: {
          in: projects.map((project) => project.id),
        },
      },
      select: {
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    return members.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) => t.user.name === value.user.name || t.user.id !== user.id
        )
    );
  } catch (error) {
    return [];
  }
}
