import { Section } from "@/components/layout/section";
import { ProjectsView } from "@/components/project/view";
import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import { collectProjectUrls, getProjects } from "@/lib/projects";
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

  return (
    <>
      <BreadcrumbJsonLd items={projectsBreadcrumbs()} />
      <header className="animate-slide-in space-y-2 px-4 py-6">
        <Title className="text-xl font-medium italic">{"projects."}</Title>
        <p className="text-muted-foreground text-sm">{DESCRIPTION}</p>
      </header>
      <Section className="delay-100 flex flex-col gap-4 py-2">
        <ProjectsView
          showHeader={false}
          showToolbar={true}
          sourceControl="tabs"
          projects={projects}
          previews={previews}
        />
      </Section>
    </>
  );
};

export default ProjectsPage;
