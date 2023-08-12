import { redirect } from "next/navigation";
import { ProjectSwitcher } from "./project-switcher";
import { Navbar } from "./navbar";
import prisma from "@/lib/prisma";

export async function Header() {
  const projects = await prisma.project.findMany({
    where: {
      userId: "",
    },
  });

  return (
    <header className="border-b w-full h-16 flex items-center justify-center">
      <div className="w-full flex items-center justify-between max-w-[1340px] px-4">
        <ProjectSwitcher items={projects} />
        <Navbar />
        {/* <UserButton afterSignOutUrl="/" /> */}
      </div>
      {/* <div className="ml-auto flex items-center space-x-4"> */}
      {/* <ThemeToggle /> */}
      {/* </div> */}
    </header>
  );
}
