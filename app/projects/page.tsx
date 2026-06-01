import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { ProjectsView } from "@/components/projects-view";
import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
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
    <Container className="pt-20 pb-14">
      <div className="mb-10 space-y-4">
        <Link
          href={ROUTES.HOME}
          className="text-muted-foreground hover:text-foreground text-sm transition-colors"
        >
          ← Home
        </Link>
        <Title>{"projects."}</Title>
        <p className="text-muted-foreground text-sm">
          {projects.length} projects — tools, APIs, and products I have built or
          maintain.
        </p>
      </div>
      <ProjectsView
        showHeader={false}
        headerClassName="mb-8 justify-end"
        projects={projects}
        previews={previews}
      />
    </Container>
  );
};

export default ProjectsPage;
