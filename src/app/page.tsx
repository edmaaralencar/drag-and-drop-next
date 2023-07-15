import prisma from "@/lib/prisma";
import { UniqueIdentifier } from "@dnd-kit/core";

import dynamic from "next/dynamic";

const Board = dynamic(
  () => import("../components/drag-and-drop/board"),
  {
    ssr: false,
  }
);

export type ItemResponse = {
  id: UniqueIdentifier;
  name: string;
  index: number;
  column: string;
};

export default async function Home() {
  const items = await prisma.item.findMany({});

  return (
    <main className="flex min-h-screen">
      <Board items={items} scrollable handle trashable />
    </main>
  );
}
