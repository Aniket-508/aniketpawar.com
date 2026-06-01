import { Section } from "@/components/layout/section";
import { ProjectSectionView } from "@/components/project-section-view";
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

  return (
    <Section
      className={cn(
        "animation-delay-700 grid grid-cols-1 place-items-center gap-8"
      )}
      id="projects"
    >
      <ProjectSectionView
        projects={featured}
        previews={previews}
        showViewAll={allProjects.length > featured.length}
      />
    </Section>
  );
};

export { ProjectSection };
