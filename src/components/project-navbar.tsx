"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function ProjectNavbar() {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/projects/${params.projectId}`,
      label: "Geral",
      active: pathname === `/projects/${params.projectId}`,
    },
    {
      href: `/projects/${params.projectId}/kanban`,
      label: "Kanban",
      active: pathname === `/projects/${params.projectId}/kanban`,
    },
    {
      href: `/projects/${params.projectId}/calendar`,
      label: "Calendário",
      active: pathname === `/projects/${params.projectId}/calendar`,
    },
    {
      href: `/projects/${params.projectId}/payments`,
      label: "Pagamentos",
      active: pathname === `/projects/${params.projectId}/payments`,
    },
    {
      href: `/projects/${params.projectId}/members`,
      label: "Membros",
      active: pathname === `/projects/${params.projectId}/members`,
    },
  ];

  return (
    <div className="flex gap-1 border-b border-border mt-8">
      {routes.map((route) => (
        <Link
          key={route.label}
          href={route.href}
          className={cn(
            "block text-muted-foreground border-border p-4 transition-colors hover:border-b-2 hover:text-foreground hover:border-foreground",
            route.active && "text-foreground border-foreground border-b-2"
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
}
