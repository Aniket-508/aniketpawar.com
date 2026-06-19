import { Section } from "@/components/layout/section";
import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { ViewAllButton } from "@/components/view-all-button";
import { HOME_FEATURED_PROJECT_COUNT } from "@/constants/projects";
import { ROUTES } from "@/constants/routes";
import { collectProjectUrls, getProjects } from "@/lib/projects";
import { QUERY_KEYS } from "@/lib/search-params/keys";
import { cn } from "@/lib/utils";

import { ProjectsView } from "./view";

const ProjectSection = async () => {
  const allProjects = getProjects();
  const previews = await prefetchGlimpses(collectProjectUrls(allProjects));

  return (
    <Section className={cn("delay-300 flex flex-col gap-4")} id="projects">
      <ProjectsView
        queryKeys={QUERY_KEYS.projects.section}
        projects={allProjects}
        previews={previews}
        featuredOnly
        limit={HOME_FEATURED_PROJECT_COUNT}
      />
      <ViewAllButton
        href={ROUTES.PROJECTS}
        eventName="projects"
        className="mx-auto"
      />
    </Section>
  );
};

export { ProjectSection };
