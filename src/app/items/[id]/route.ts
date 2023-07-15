import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id; // 'a', 'b', or 'c'

  await prisma.item.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ ok: true });
}
