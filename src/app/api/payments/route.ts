import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // const response = [
  //   { id: 11231, name: "Task 1", index: 1, column: "to-do" },
  //   { id: 23412, name: "Task 2", index: 0, column: "to-do" },
  //   { id: 123, name: "Task 3", index: 3, column: "in-progress" },
  //   { id: 456, name: "Task 6", index: 2, column: "in-progress" },
  //   { id: 4234, name: "Task 5", index: 0, column: "in-progress" },
  //   { id: 4523, name: "Task 4", index: 1, column: "in-progress" },
  // ];

  const payment = await prisma.payment.create({
    data: {
      value: body.value,
      projectId: body.projectId,
      date: body.date,
      payment_method: body.payment_method,
    },
  });

  return NextResponse.json({ payment });
}
