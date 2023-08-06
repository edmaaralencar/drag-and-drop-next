"use client";

import { useSidebar } from "@/hooks/use-sidebar.modal";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Home } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";

export function Sidebar() {
  const sidebar = useSidebar();
  const [showFavorites, setShowFavorites] = useState(false);
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.projectId}`,
      label: "Geral",
      active: pathname === `/${params.projectId}`,
    },
    {
      href: `/projects`,
      label: "Projetos",
      active: pathname === `/projects`,
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
    {
      href: `/${params.projectId}/colors`,
      label: "Chat",
      active: pathname === `/${params.projectId}/colors`,
    },
  ];

  return (
    <aside
      className={cn(
        "hidden md:flex w-[260px] z-20 bg-background fixed top-0 left-0 h-screen border-r border-border flex-col gap-8 p-4",
        sidebar.isOpen && "flex"
      )}
    >
      <h1 className="p-2 text-3xl">Logo</h1>

      <nav className=" flex flex-col gap-3 w-full">
        {routes.map((route) => (
          <Link
            key={route.label}
            href={route.href}
            className={cn(
              "w-full p-2 rounded flex gap-3 items-center text-sm transition-colors hover:bg-primary hover:text-background group",
              route.active && "bg-primary text-background"
            )}
          >
            <Home
              className={cn(
                "w-4 h-4 text-foreground group-hover:text-background",
                route.active && "bg-primary text-background"
              )}
            />
            {route.label}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-7 p-2">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowFavorites((prevState) => !prevState)}
        >
          <span className="text-muted-foreground text-sm">Favoritos</span>
          {showFavorites ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>

        {showFavorites && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm text-muted-foreground">Projeto 1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm text-muted-foreground">Projeto 1</span>
            </div>
          </div>
        )}
      </div>

      <div className="my-6 w-full h-[10px] bg-muted"></div>
    </aside>
  );
}
