import { Timer } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/date";

type ProjectCardProps = {
  id: string;
  name: string;
  client: string;
  deadlineDate: Date;
  priority: string;
  tags: { name: string }[];
};

export function ProjectCard({
  id,
  name,
  client,
  deadlineDate,
  priority,
  tags,
}: ProjectCardProps) {
  return (
    <div className="border border-border p-4 flex flex-col gap-4 rounded-md">
      <div className="flex justify-between items-center">
        <h2>{name}</h2>
        <Badge>{priority}</Badge>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src="/oaefjaoi.png" />
            <AvatarFallback>LL</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <small className="text-xs text-muted-foreground">Cliente</small>
            <span className="text-sm">{client}</span>
          </div>
        </div>

        <div className="flex items-center">
          <Avatar className="-mr-6">
            <AvatarImage src="/oaefjaoi.png" />
            <AvatarFallback className="bg-yellow-500">LL</AvatarFallback>
          </Avatar>
          <Avatar className="-mr-6">
            <AvatarImage src="/oaefjaoi.png" />
            <AvatarFallback className="bg-red-500">LL</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="/oaefjaoi.png" />
            <AvatarFallback>LL</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex flex-col gap-2 my-4">
        <span className="text-sm text-muted-foreground">Tasks: 20/30</span>
        <div className="rounded-full w-full h-2 bg-muted relative overflow-hidden">
          <div className="bg-primary absolute h-2 w-2/3"></div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <Badge key={tag.name}>{tag.name}</Badge>
        ))}
      </div>

      <div className="flex gap-1 items-center">
        <Timer className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Prazo acaba {formatDate(deadlineDate, "dd 'de' MMMM")}
        </span>
      </div>

      <Button size="sm" className="mt-4" asChild>
        <Link href={`/projects/${id}`}>Ver mais</Link>
      </Button>
    </div>
  );
}
