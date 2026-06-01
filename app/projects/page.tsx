import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { ProjectsListView } from "@/components/projects-list-view";
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
    <>
      <div className="pointer-events-none fixed top-0 left-0 z-50 h-12 w-full to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]" />
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
            {projects.length} projects — tools, APIs, and products I have built
            or maintain.
          </p>
        </div>
        <ProjectsListView projects={projects} previews={previews} />
      </Container>
      <Footer />
    </>
  );
};

export default ProjectsPage;
