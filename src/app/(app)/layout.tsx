import { Header } from "@/components/header";
import { OpenSidebarButton } from "@/components/open-sidebar-button";
import { Sidebar } from "@/components/sidebar";
import prisma from "@/lib/prisma";
import { UserButton, auth } from "@clerk/nextjs";
import { Bell, Menu } from "lucide-react";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // const project = await prisma.project.findFirst({
  //   where: {
  //     userId,
  //   },
  // });

  // if (!project) {
  //   redirect("/");
  // }

  return (
    <div className="relative">
      <Sidebar />
      {/* <Header /> */}
      <div className="md:ml-[260px] flex flex-col">
        <header className="p-6 w-full border-b border-border flex justify-between items-center">
          <h1 className="hidden md:text-2xl">Início</h1>
          <OpenSidebarButton />
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6" />
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
