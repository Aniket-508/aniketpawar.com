import { ExperienceItem } from "@/components/experience-item";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types/experiences";

import { CopyLink } from "./copy-link";
import { Title } from "./ui/title";

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
          "group/experience flex items-center gap-2",
          headerClassName
        )}
      >
        <Title>{"experience."}</Title>
        <CopyLink
          title={"Experience"}
          className="hidden size-4 group-hover/experience:inline"
        />
      </div>
    )}

    <div className={cn("grid grid-cols-1 gap-8", viewClassName)}>
      {experiences.map((experience) => (
        <ExperienceItem {...experience} key={experience.slug} />
      ))}
    </div>
  </>
);

export { ExperiencesView };
