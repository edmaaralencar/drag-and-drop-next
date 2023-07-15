import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const newItems = await request.json();

  const items = await prisma.item.findMany({});

  const listWithItem = Object.keys(newItems).map((list) => {
    const items = newItems[list];
    const teste = items.map((item: any) => ({ ...item, column: list }));

    return teste;
  });

  const listNew = [];

  for (const list of listWithItem) {
    for (const item of list) {
      listNew.push(item);
    }
  }

  const objectsEqual = (o1: any, o2: any): Boolean => {
    if (o2 === null && o1 !== null) return false;
    return o1 !== null && typeof o1 === "object" && Object.keys(o1).length > 0
      ? Object.keys(o1).length === Object.keys(o2).length &&
          Object.keys(o1).every((p: any) => objectsEqual(o1[p], o2[p]))
      : o1 !== null &&
        Array.isArray(o1) &&
        Array.isArray(o2) &&
        !o1.length &&
        !o2.length
      ? true
      : o1 === o2;
  };

  for (const dbItem of items) {
    for (const newItem of listNew) {
      if (dbItem.id === newItem.id && !objectsEqual(dbItem, newItem)) {
        await prisma.item.update({
          where: {
            id: dbItem.id,
          },
          data: {
            index: newItem.index,
            column: newItem.column,
          },
        });
      }
    }
  }

  return NextResponse.json({ data: listNew });
}

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

  const item = await prisma.item.create({
    data: {
      name: body.name,
      index: body.index,
      column: body.column,
    },
  });

  return NextResponse.json({ ok: true, item });
}
