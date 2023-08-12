import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Plus } from "lucide-react";

import dynamic from "next/dynamic";

const Board = dynamic(
  () => import("../../../../../../components/drag-and-drop/board"),
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

export default async function Page({
  params,
}: {
  params: { projectId: string };
}) {
  const items = await prisma.item.findMany({});

  const tasks = await prisma.projectTask.findMany({
    where: {
      projectId: params.projectId,
    },
  });

  const teste = tasks.map((item) => ({
    id: item.id,
    column: item.column,
    name: item.name,
    index: item.index,
  }));
  console.log(tasks);

  return (
    <main className="">
      <div className="">
        <Tabs defaultValue="account" className="w-full flex flex-col gap-6">
          <div className="flex justify-between itesm-center">
            <TabsList>
              <TabsTrigger value="account">Board</TabsTrigger>
              <TabsTrigger value="password">Lista</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="account">
            <Board items={teste} trashable />
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
