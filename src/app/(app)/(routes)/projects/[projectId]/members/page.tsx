import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export default function Page() {
  return (
    <main className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      <div className="p-4 rounded-md border border-border flex flex-col gap-5 justify-center items-center cursor-pointer">
        <div className="w-12 h-12 rounded-full grid place-items-center bg-primary">
          <Plus className="text-background" />
        </div>

        <span className="underline text-center">Adicionar membro</span>
      </div>
      <div className="p-4 rounded-md border border-border flex flex-col gap-5 items-center">
        <div className="w-12 h-12 rounded-full bg-red-500"></div>

        <div className="flex flex-col text-center">
          <span>Edmar Alencar</span>
          <small className="font-light text-sm text-muted-foreground">
            edmar@gmail.com
          </small>
        </div>

        <Badge>Dev Frontend</Badge>
      </div>
    </main>
  );
}
