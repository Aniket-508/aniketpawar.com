import { Section } from "@/components/layout/section";
import { ProjectsView } from "@/components/projects-view";
import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import { collectProjectUrls, getProjects } from "@/lib/projects";
import { BreadcrumbJsonLd, projectsBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  canonical: ROUTES.PROJECTS,
  description: "Selected work — open source tools, APIs, and products.",
  title: "Projects",
});

const ProjectsPage = async () => {
  const projects = getProjects();
  const previews = await prefetchGlimpses(collectProjectUrls(projects));

  return (
    <>
      <BreadcrumbJsonLd items={projectsBreadcrumbs()} />
      <div className="space-y-2 px-4 pt-6 pb-2">
        <Title asChild>
          <h1>{"projects."}</h1>
        </Title>
        <p className="text-muted-foreground text-sm">
          Tools, APIs, and products I have built or maintain.
        </p>
      </div>
      <Section className="delay-100 flex flex-col gap-8">
        <ProjectsView
          showHeader={false}
          defaultVariant="grid"
          projects={projects}
          previews={previews}
        />
      </Section>
    </>
  );
};

export default ProjectsPage;
