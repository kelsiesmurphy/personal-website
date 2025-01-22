import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";

export type Project = {
  name: string;
  slug: string;
  description: string;
  repo: string;
  url: string;
};

export default function ProjectNavMobile({
  projects,
  currentProjectName,
}: {
  projects: Project[];
  currentProjectName: string | undefined;
}) {
  return (
    <div className="flex md:hidden">
      <Select>
        <SelectTrigger className="px-0 border-none font-nord font-bold text-lg">
          <SelectValue placeholder={currentProjectName} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {projects.map((project) => {
              return (
                <SelectItem value={project.slug} key={project.slug}>
                  <a className="font-normal" href={`/projects/${project.slug}`}>
                    {project.name}
                  </a>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
