// import { ArrowUpRightIcon } from "lucide-react";

import { Section } from "@/components/layout/section";
import type { ProjectItemProps } from "@/components/project-item";
import { ProjectSectionView } from "@/components/project-section-view";
// import { Button } from "@/components/ui/button";
import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { getProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";

const collectProjectUrls = (projects: ProjectItemProps[]): string[] => {
  const urls: string[] = [];

  for (const project of projects) {
    if (project.links?.website) {
      urls.push(project.links.website);
    }
    if (project.links?.github) {
      urls.push(project.links.github);
    }
  }

  return urls;
};

const ProjectSection = async () => {
  const projects = getProjects();
  const previews = await prefetchGlimpses(collectProjectUrls(projects));

  return (
    <Section
      className={cn(
        "animation-delay-700 grid grid-cols-1 place-items-center gap-8"
      )}
      id="projects"
    >
      <ProjectSectionView projects={projects} previews={previews} />
      {/* <Button variant="secondary" className="group">
        View All{" "}
        <ArrowUpRightIcon className="size-4 group-hover:rotate-45 transition-transform duration-300" />
      </Button> */}
    </Section>
  );
};

export { ProjectSection };
