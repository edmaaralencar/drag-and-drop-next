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

export default async function Home() {
  const items = await prisma.item.findMany({});

  return (
    <main className="">
      {/* <div className="p-6">
        <Tabs className="space-y-4" defaultValue="all">
          <header className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="in-progress">Em progresso</TabsTrigger>
              <TabsTrigger value="closed">Finalizados</TabsTrigger>
            </TabsList>
          </header>
          <TabsContent value="all" className="p-0 m-0">
          </TabsContent>
        </Tabs>
      </div> */}

      <div className="">
        <Tabs defaultValue="account" className="w-full flex flex-col gap-6">
          <div className="flex justify-between itesm-center">
            <TabsList>
              <TabsTrigger value="account">Board</TabsTrigger>
              <TabsTrigger value="password">Lista</TabsTrigger>
            </TabsList>
            <Button>
              Adicionar <Plus />
            </Button>
          </div>
          <TabsContent value="account">
            <Board items={items} trashable />
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
