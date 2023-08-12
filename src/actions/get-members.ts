import prisma from "@/lib/prisma";

export async function getMembers(projectId: string) {
  try {
    const members = await prisma.projectMember.findMany({
      where: {
        projectId: projectId,
      },
      select: {
        id: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        invitation: {
          select: {
            occupation: true,
          },
        },
      },
    });

    return members;
  } catch (error) {
    return [];
  }
}
