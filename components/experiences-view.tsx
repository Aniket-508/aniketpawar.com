import { CopyLink } from "@/components/copy-link";
import { ExperienceItem } from "@/components/experience-item";
import { Title } from "@/components/ui/title";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types/experiences";

interface ExperiencesViewProps {
  showHeader?: boolean;
  headerClassName?: string;
  viewClassName?: string;
  experiences: readonly Experience[];
}

const ExperiencesView = ({
  showHeader = true,
  headerClassName,
  viewClassName,
  experiences,
}: ExperiencesViewProps) => (
  <>
    {showHeader && (
      <div
        className={cn(
          "group/experience flex items-center gap-1",
          headerClassName
        )}
      >
        <Title>{"experience."}</Title>
        <CopyLink
          title={"Experience"}
          className="hidden group-hover/experience:inline-flex"
        />
      </div>
    )}

    <div className={cn("grid grid-cols-1 gap-8", viewClassName)}>
      {experiences.map((experience) => (
        <ExperienceItem
          {...experience}
          key={experience.slug}
          location={showHeader ? "home" : "listing"}
        />
      ))}
    </div>
  </>
);

export { ExperiencesView };
