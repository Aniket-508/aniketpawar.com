import { Suspense } from "react";

import { Section } from "@/components/layout/section";
import { ProjectsListingList } from "@/components/project/listing-list";
import { ProjectSourceTabs } from "@/components/project/source-tabs";
import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { Title } from "@/components/ui/title";
import { ViewToggle } from "@/components/view-tabs";
import { ROUTES } from "@/constants/routes";
import { collectProjectUrls, getProjects } from "@/lib/projects";
import { QUERY_KEYS } from "@/lib/search-params/keys";
import { BreadcrumbJsonLd, projectsBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

const DESCRIPTION = "Tools, APIs, and products I have built or maintain.";

export const metadata = createMetadata({
  canonical: ROUTES.PROJECTS,
  description: DESCRIPTION,
  title: "Projects",
});

const ProjectsPage = async () => {
  const projects = getProjects();
  const previews = await prefetchGlimpses(collectProjectUrls(projects));
  const queryKeys = QUERY_KEYS.projects.page;

  return (
    <>
      <BreadcrumbJsonLd items={projectsBreadcrumbs()} />
      <header className="animate-slide-in space-y-2 px-4 py-6">
        <Title className="text-xl font-medium italic">{"projects."}</Title>
        <p className="text-muted-foreground text-sm">{DESCRIPTION}</p>
      </header>
      <Section className="delay-100 flex flex-col gap-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <Suspense>
            <ProjectSourceTabs queryKey={queryKeys.source} />
          </Suspense>
          <Suspense>
            <ViewToggle queryKey={queryKeys.view} section="projects" />
          </Suspense>
        </div>
        <Suspense>
          <ProjectsListingList
            projects={projects}
            previews={previews}
            queryKeys={queryKeys}
          />
        </Suspense>
      </Section>
    </>
  );
};

export default ProjectsPage;
