import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/layout/section";
import { ProjectsView } from "@/components/projects-view";
import { Button } from "@/components/ui/button";
import { prefetchGlimpses } from "@/components/ui/glimpse/server";
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
      {showViewAll && (
        <Button variant="secondary" className="group col-span-2" asChild>
          <Link href={ROUTES.PROJECTS}>
            View all
            <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </Button>
      )}
    </Section>
  );
};

export { ProjectSection };
