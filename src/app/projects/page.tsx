import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Projects() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="flex justify-between w-full p-7 border-b border-border">
        <h1>Projetos</h1>
      </header>
      <div className="p-6">
        <Tabs className="space-y-4" defaultValue="all">
          <header className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="in-progress">Em progresso</TabsTrigger>
              <TabsTrigger value="closed">Finalizados</TabsTrigger>
            </TabsList>
            <Button>Criar projeto</Button>
          </header>
          <TabsContent value="overview" className="space-y-4"></TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
