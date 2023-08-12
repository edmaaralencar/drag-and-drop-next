import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

import { Resend } from "resend";
import InvitationEmailTemplate from "@/components/emails/invitation-email";

const resend = new Resend(process.env.RESEND_API_KEY);

const invitationSchema = z.object({
  userName: z.string(),
  userEmail: z.string(),
  projectId: z.string(),
  occupation: z.string(),
});

export async function POST(request: Request) {
  const body = await request.json();

  const session = await getServerSession(authOptions);

  const { userName, userEmail, projectId, occupation } =
    invitationSchema.parse(body);

  if (!session) {
    return NextResponse.error();
  }

  const invitedUser = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!project) {
    return NextResponse.error();
  }

  if (invitedUser) {
    const memberExists = await prisma.projectMember.findFirst({
      where: {
        userId: invitedUser.id,
        projectId: project.id,
      },
    });

    if (memberExists) {
      return NextResponse.json(
        { message: "Usuário já está no projeto." },
        { status: 400 }
      );
    }

    const invitation = await prisma.projectMemberInvitation.create({
      data: {
        userEmail,
        name: userName,
        occupation,
        projectId,
        status: "requested",
        read: false,
      },
    });

    return NextResponse.json({ invitation });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: String(session?.user?.email),
    },
  });

  if (!user) {
    return NextResponse.error();
  }

  const invitation = await prisma.projectMemberInvitation.create({
    data: {
      userEmail,
      name: userName,
      occupation,
      projectId,
      status: "requested",
      read: false,
    },
  });

  await resend.sendEmail({
    from: "onboarding@resend.dev",
    to: userEmail,
    subject: `Convite do projeto ${project.name}`,
    react: InvitationEmailTemplate({
      invitedByName: String(user.name),
      invitedByEmail: String(user.email),
      signUpLink: `http://localhost:3000/sign-up?invitationId=${invitation.id}`,
      invitedName: userName,
      projectName: project.name,
    }),
  });

  return NextResponse.json({ message: "Email enviado para o usuário." });
}
