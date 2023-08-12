import { ReactNode } from "react";
import { ConversationsHeader } from "./components/conversations-header";
import getCurrentUser from "@/actions/get-current-user";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CreateConversationModal } from "@/components/modals/create-conversation-modal";
import { getMembersOfAllProjects } from "@/actions/get-members-of-all-projects";

export default async function Layout({ children }: { children: ReactNode }) {
  const members = await getMembersOfAllProjects();

  return (
    <div className="flex gap-4 h-full">
      <div className="flex flex-col border border-border rounded-md">
        <ConversationsHeader />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center p-4 transition-colors hover:bg-border cursor-pointer">
            <div className="flex gap-2">
              <div className="w-10 h-10 bg-red-500 rounded-full"></div>
              <div className="flex flex-col gap-1">
                <span className="text-sm">Edmar Alencar</span>
                <small className="text-xs text-muted-foreground">Product</small>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <small className="text-xs text-muted-foreground">Agora</small>
              <span className="w-6 h-6 grid place-items-center text-xs bg-primary text-background rounded-full">
                1
              </span>
            </div>
          </div>
        </div>
      </div>
      {children}
      <CreateConversationModal members={members} />
    </div>
  );
}
