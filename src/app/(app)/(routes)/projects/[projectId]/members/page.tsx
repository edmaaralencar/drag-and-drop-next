import { getMembers } from "@/actions/get-members";
import { AddMemberButton } from "@/components/add-member-button";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";

export default async function Page({
  params,
}: {
  params: { projectId: string };
}) {
  const members = await getMembers(params.projectId);

  return (
    <main className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <AddMemberButton />

      {members.map((item) => (
        <div
          key={item.id}
          className="p-4 rounded-md border border-border flex flex-col gap-5 items-center"
        >
          <div className="w-12 h-12 rounded-full bg-red-500"></div>

          <div className="flex flex-col text-center">
            <span>{item.user.name}</span>
            <small className="font-light text-sm text-muted-foreground">
              {item.user.email}
            </small>
          </div>

          <Badge>{item.invitation?.occupation ?? "Dono"}</Badge>
        </div>
      ))}
    </main>
  );
}
