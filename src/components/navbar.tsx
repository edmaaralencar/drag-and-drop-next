"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.projectId}`,
      label: "Geral",
      active: pathname === `/${params.projectId}`,
    },
    {
      href: `/${params.projectId}/kanban`,
      label: "Kanban",
      active: pathname === `/${params.projectId}/kanban`,
    },
    {
      href: `/${params.projectId}/categories`,
      label: "Calendário",
      active: pathname === `/${params.projectId}/categories`,
    },
    {
      href: `/${params.projectId}/sizes`,
      label: "Pagamentos",
      active: pathname === `/${params.projectId}/sizes`,
    },
    {
      href: `/${params.projectId}/colors`,
      label: "Membros",
      active: pathname === `/${params.projectId}/colors`,
    },
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-2">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
