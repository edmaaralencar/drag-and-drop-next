import { ProjectNavbar } from "@/components/project-navbar";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { ReactNode } from "react";

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      {/* <div className="flex flex-col gap-6 rounded-md p-4 border border-border"> */}
      <h2 className="text-3xl">EVIS</h2>

      <div className="mt-5 flex justify-between gap-2 p-6 border border-border rounded-lg relative">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <strong className="font-normal text-muted-foreground">
              Prioridade:
            </strong>
            <Badge>Alta</Badge>
          </div>
          <div className="flex items-center gap-2">
            <strong className="font-normal text-muted-foreground">
              Prazo:
            </strong>
            <span className="">Qua, 14 de abril de 2023</span>
          </div>
          <div className="flex items-center gap-2">
            <strong className="font-normal text-muted-foreground">
              Membros:
            </strong>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 border border-border py-1 px-2 rounded-full">
                <div className="rounded-lg">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                </div>
                <span className="text-sm">Edmar</span>
              </div>
              <div className="flex items-center gap-2 border border-border py-1 px-2 rounded-full">
                <div className="rounded-lg">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                </div>
                <span className="text-sm">Edmar</span>
              </div>
              <div className="flex items-center gap-2 border border-border py-1 px-2 rounded-full">
                <div className="rounded-lg">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                </div>
                <span className="text-sm">Edmar</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <strong className="font-normal text-muted-foreground">Tags:</strong>
            <div className="flex items-center gap-2">
              <div className="flex bg-red-500 items-center gap-2 border border-border py-1 px-2 rounded-full">
                <span className="text-sm">Edmar</span>
              </div>
              <div className="flex bg-green-500 items-center gap-2 border border-border py-1 px-2 rounded-full">
                <span className="text-sm">Edmar</span>
              </div>
              <div className="flex bg-blue-500 items-center gap-2 border border-border py-1 px-2 rounded-full">
                <span className="text-sm">Edmar</span>
              </div>
            </div>
          </div>
        </div>

        <button className="p-2 border border-border rounded-full absolute top-4 right-4">
          <Heart />
        </button>
      </div>

      <ProjectNavbar />

      <div className="mt-6">{children}</div>
    </div>
  );
}
