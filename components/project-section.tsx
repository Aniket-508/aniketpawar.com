import { Section } from "@/components/layout/section";
import { ProjectSectionLinks } from "@/components/project-section-links";
import { ProjectsView } from "@/components/projects-view";
import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import {
  collectProjectUrls,
  getFeaturedProjects,
  getProjects,
} from "@/lib/projects";
import { cn } from "@/lib/utils";

const ProjectSection = async () => {
  const featured = getFeaturedProjects(4);
  const allProjects = getProjects();
  const previews = await prefetchGlimpses(collectProjectUrls(allProjects));
  const showViewAll = allProjects.length > featured.length;

  return (
    <Section
      className={cn("delay-300 grid grid-cols-1 place-items-center gap-8")}
      id="projects"
    >
      <ProjectsView
        headerClassName="col-span-2 w-full"
        viewClassName="col-span-2 w-full"
        projects={featured}
        previews={previews}
      />
      {showViewAll && <ProjectSectionLinks />}
    </Section>
  );
};

export { ProjectSection };
