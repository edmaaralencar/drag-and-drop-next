"use client";

import { Bell } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Prisma } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

type Notification = Prisma.ProjectMemberInvitationGetPayload<{
  include: {
    project: {
      select: {
        name: true;
      };
    };
  };
}>;

type NotificationDropdownProps = {
  notifications: Notification[];
  currentUser: string;
};

export function NotificationDropdown({
  notifications,
  currentUser,
}: NotificationDropdownProps) {
  const router = useRouter();

  async function handleAcceptInvite(
    invitationId: string,
    projectId: string,
    status: "accepted" | "refused"
  ) {
    try {
      const response = await axios.post("/api/invitations/accept", {
        invitationId,
        projectId,
        userEmail: currentUser,
        status,
      });

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell className="w-6 h-6" />
          <span className="rounded-full w-5 h-5 text-sm grid place-items-center absolute text-background bg-yellow-300 -top-1 right-0">
            {notifications.length}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Notificações</h4>
            <p className="text-sm text-muted-foreground">
              Visualize todas as suas notificações.
            </p>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="space-y-6 border border-border p-3 rounded"
              >
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                    Convite para projeto
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Você foi convidado para participar do projeto{" "}
                    {notification.project.name}.
                  </p>
                </div>

                <div className="grid grid-cols-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleAcceptInvite(
                        notification.id,
                        notification.projectId,
                        "refused"
                      )
                    }
                  >
                    Recusar
                  </Button>
                  <Button
                    onClick={() =>
                      handleAcceptInvite(
                        notification.id,
                        notification.projectId,
                        "accepted"
                      )
                    }
                    size="sm"
                  >
                    Aceitar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
