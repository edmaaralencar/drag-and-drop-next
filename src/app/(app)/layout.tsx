import { NotificationDropdown } from "@/components/notification-dropdown";
import { OpenSidebarButton } from "@/components/open-sidebar-button";
import { Sidebar } from "@/components/sidebar";
import { SignOutButton } from "@/components/sign-out-button";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Bell, Menu } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  const projectInvitations = await prisma.projectMemberInvitation.findMany({
    where: {
      userEmail: String(session.user?.email),
      read: false,
    },
    include: {
      project: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="relative h-full">
      <Sidebar />
      {/* <Header /> */}
      <div className="md:ml-[260px] flex flex-col h-full">
        <header className="p-6 w-full border-b border-border flex justify-between items-center">
          <h1 className="hidden md:text-2xl">Início</h1>
          <SignOutButton />
          <OpenSidebarButton />
          <div className="flex items-center gap-4">
            <NotificationDropdown
              notifications={projectInvitations}
              currentUser={String(session.user?.email)}
            />
          </div>
        </header>
        <main className="p-6 h-full">{children}</main>
      </div>
    </div>
  );
}
