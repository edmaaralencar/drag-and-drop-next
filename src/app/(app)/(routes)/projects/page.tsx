import { ProjectCard } from "@/components/project-card";
import { ProjectsHeader } from "@/components/projects-header";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <ProjectsHeader />

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
}
