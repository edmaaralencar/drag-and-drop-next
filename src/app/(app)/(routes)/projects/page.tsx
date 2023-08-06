import { ProjectCard } from "@/components/project-card";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <div className="p-4 border border-border w-full h-12"></div>
      <div className="grid gap-4 lg:grid-cols-3">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
}
