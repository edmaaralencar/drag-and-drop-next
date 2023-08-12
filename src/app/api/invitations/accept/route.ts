import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const invitationSchema = z.object({
  userEmail: z.string(),
  projectId: z.string(),
  invitationId: z.string(),
  status: z.enum(["accepted", "refused"]),
});

export async function POST(request: Request) {
  const body = await request.json();

  const session = await getServerSession(authOptions);

  const { invitationId, userEmail, projectId, status } =
    invitationSchema.parse(body);

  if (!session) {
    return NextResponse.error();
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  const invitation = await prisma.projectMemberInvitation.findUnique({
    where: {
      id: invitationId,
    },
  });

  if (!project || !invitation || !user) {
    return NextResponse.error();
  }

  if (invitation.status === "accepted") {
    return NextResponse.json(
      { message: "Você já aceitou esse convite." },
      { status: 400 }
    );
  }

  if (user.email !== userEmail) {
    return NextResponse.json(
      { message: "Você não pode aceitar o convite de outro usuário." },
      { status: 400 }
    );
  }

  if (status === "refused") {
    await prisma.projectMemberInvitation.update({
      where: {
        id: invitationId,
      },
      data: {
        status: "refused",
        read: true,
      },
    });

    return NextResponse.json({ message: "Convite recusado." }, { status: 200 });
  }

  await prisma.projectMemberInvitation.update({
    where: {
      id: invitationId,
    },
    data: {
      status: "accepted",
      read: true,
    },
  });

  await prisma.projectMember.create({
    data: {
      invitationId: invitation.id,
      userId: user.id,
      projectId,
    },
  });

  // checar se o usuário já é membro do projeto

  // if (user) {
  //   const invitation = await prisma.projectMemberInvitation.create({
  //     data: {
  //       userEmail,
  //       name: userName,
  //       occupation,
  //       projectId,
  //       status: "requested",
  //     },
  //   });

  //   return NextResponse.json({ invitation });
  // }

  return NextResponse.json({ ok: true });
}
