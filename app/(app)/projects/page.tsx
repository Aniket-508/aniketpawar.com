import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { ProjectsView } from "@/components/projects-view";
import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { Title } from "@/components/ui/title";
import { SITE } from "@/constants/site";
import { collectProjectUrls, getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  description: "Selected work — open source tools, APIs, and products.",
  title: `Projects · ${SITE.AUTHOR.NAME}`,
};

const ProjectsPage = async () => {
  const projects = getProjects();
  const previews = await prefetchGlimpses(collectProjectUrls(projects));

  return (
    <Section className="animation-delay-100 flex flex-col gap-8">
      <div className="space-y-2">
        <Title>{"projects."}</Title>
        <p className="text-muted-foreground text-sm">
          Tools, APIs, and products I have built or maintain.
        </p>
      </div>
      <ProjectsView
        showHeader={false}
        defaultVariant="grid"
        projects={projects}
        previews={previews}
      />
    </Section>
  );
};

export default ProjectsPage;
