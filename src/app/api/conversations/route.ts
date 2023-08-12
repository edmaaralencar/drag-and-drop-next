import getCurrentUser from "@/actions/get-current-user";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  userId: z.string(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { userId } = schema.parse(body);

  const conversationUsers = await prisma.conversationUser.findMany({
    where: {
      userId: {
        in: [userId, currentUser.id],
      },
    },
  });

  let conversationExistsBetweenTwoUsers = false;
  let conversationThatExists = null;

  for (const conversationUser of conversationUsers) {
    const conversation = await prisma.conversation.findFirst({
      where: {
        isGroup: false,
        id: conversationUser.conversationId,
      },
    });

    if (conversation) {
      conversationExistsBetweenTwoUsers = true;
      conversationThatExists = conversation.id;
    }
  }

  if (!conversationExistsBetweenTwoUsers) {
    await prisma.conversation.create({
      data: {
        isGroup: false,
        users: {
          create: [
            {
              userId: currentUser.id,
            },
            {
              userId: userId,
            },
          ],
        },
      },
    });

    return NextResponse.json({ message: "Chat criado com sucesso." });
  } else {
    return NextResponse.json({
      message: "Conversa já existe",
      id: conversationThatExists,
    });
  }
}
