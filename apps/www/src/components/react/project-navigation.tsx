import { Button } from "@repo/ui/components/ui/button";
import projects from "@repo/projects-config/projects.json";

export default function ProjectNavigation() {
  return (
    <nav className="container py-4 flex items-center justify-between gap-6">
      <div className="flex gap-8 items-center">
        <h1 className="font-nord font-bold text-2xl">Projects</h1>
        <ul className="flex gap-8 flex-wrap">
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
    </nav>
  );
}
