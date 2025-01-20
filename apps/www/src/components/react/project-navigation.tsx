import { Button } from "@repo/ui/components/ui/button";
import projects from "@repo/projects-config/projects.json";
import ProjectNavMobile from "./project-navigation-mobile";

export default function ProjectNavigation({
  currentProjectName,
}: {
  currentProjectName: string | undefined;
}) {
  return (
    <nav className="py-3 border-b border-border">
      <div className="container flex items-center justify-between gap-6">
        <div className="flex gap-8 items-center">
          <h1 className="hidden md:block font-nord font-bold text-lg">
            Project {currentProjectName}
          </h1>
          <ProjectNavMobile
            projects={projects}
            currentProjectName={currentProjectName}
          />
          <ul className="hidden md:flex gap-8 flex-wrap">
            {projects.map((project) => (
              <li key={project.slug}>
                <Button variant="link" className="px-2" asChild>
                  <a className="font-normal" href={`/projects/${project.slug}`}>
                    {project.name.toLocaleLowerCase()}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <Button variant="link" className="px-2" asChild>
          <a className="font-normal" href="/">
            home
          </a>
        </Button>
      </div>
    </nav>
  );
}
