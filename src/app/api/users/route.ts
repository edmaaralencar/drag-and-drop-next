import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  invitationId: z.string().nullable(),
});

export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, password, invitationId } = userSchema.parse(body);

  console.log({ name, email, password, invitationId });

  const usersExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (usersExists) {
    return NextResponse.error();
  }

  if (invitationId) {
    const invitation = await prisma.projectMemberInvitation.findUnique({
      where: {
        id: invitationId,
      },
    });

    if (!invitation) {
      return NextResponse.error();
    }

    if (invitation.userEmail !== email) {
      return NextResponse.json(
        {
          message:
            "Para se cadastrar, use o mesmo email que você usou quando recebeu esse link.",
        },
        { status: 400 }
      );
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

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword: await hash(password, 12),
      },
    });

    await prisma.projectMember.create({
      data: {
        invitationId: invitation.id,
        projectId: invitation.projectId,
        userId: user.id,
      },
    });

    return NextResponse.json({ user });
  } else {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword: await hash(password, 12),
      },
    });
    return NextResponse.json({ user });
  }
}
