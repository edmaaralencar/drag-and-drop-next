import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto my-16 flex justify-center flex-col gap-4 text-center">
      <h2 className="text-3xl">Projeto inexistente.</h2>
      <span className="text-muted-foregorund">
        Volte para a tela de projetos.
      </span>
      <Link className={cn("max-w-[80px] mx-auto", buttonVariants())} href="/projects">
        Voltar
      </Link>
    </div>
  );
}
