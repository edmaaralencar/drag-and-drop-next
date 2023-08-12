import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const projectSchema = z.object({
  name: z.string(),
  client: z.string(),
  deadlineDate: z.coerce.date(),
  tags: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .array(),
  priority: z.object({
    value: z.string(),
    label: z.string(),
  }),
});

export async function POST(request: Request) {
  const body = await request.json();

  const session = await getServerSession(authOptions);

  const { name, client, deadlineDate, tags, priority } =
    projectSchema.parse(body);

  if (!session) {
    return NextResponse.error();
  }

  const user = await prisma.user.findUnique({
    where: {
      email: String(session.user?.email),
    },
  });

  if (!user) {
    return NextResponse.error();
  }

  const project = await prisma.project.create({
    data: {
      name,
      client,
      deadlineDate,
      userId: user.id,
      priority: priority.label,
    },
  });

  for (const tag of tags) {
    await prisma.projectTag.create({
      data: {
        name: tag.label,
        projectId: project.id,
      },
    });
  }

  await prisma.projectTask.create({
    data: {
      column: "to-do",
      name: "Task X",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero fugiat vel debitis consequuntur quod suscipit qui tempore dolorum a exercitationem nobis dolorem, soluta autem fugit aliquid magnam obcaecati iste voluptas.",
      projectId: project.id,
      duedate: new Date(),
      index: 0,
      tag: "front-end",
    },
  });

  await prisma.projectMember.create({
    data: {
      projectId: project.id,
      userId: user.id,
    },
  });

  return NextResponse.json({ project });
}
