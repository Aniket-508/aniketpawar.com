import { Section } from "@/components/layout/section";
import { ProjectsView } from "@/components/projects-view";
import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { ViewAllButton } from "@/components/view-all-button";
import { ROUTES } from "@/constants/routes";
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
    <Section className={cn("delay-300 flex flex-col gap-4")} id="projects">
      <ProjectsView projects={featured} previews={previews} />
      {showViewAll && (
        <ViewAllButton
          href={ROUTES.PROJECTS}
          eventName="projects"
          className="mx-auto"
        />
      )}
    </Section>
  );
};

export { ProjectSection };
