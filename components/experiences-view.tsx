import { CopyLink } from "@/components/copy-link";
import { ExperienceItem } from "@/components/experience-item";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { Title } from "@/components/ui/title";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types/experiences";

interface ExperiencesViewProps {
  showHeader?: boolean;
  headerClassName?: string;
  viewClassName?: string;
  experiences: readonly Experience[];
  previews?: Record<string, GlimpseData>;
}

const ExperiencesView = ({
  showHeader = true,
  headerClassName,
  viewClassName,
  experiences,
  previews,
}: ExperiencesViewProps) => (
  <>
    {showHeader && (
      <div
        className={cn(
          "group/experience flex items-center gap-1",
          headerClassName
        )}
      >
        <Title
          className="text-xl font-medium italic"
          render={<h2>{"experience."}</h2>}
        />
        <CopyLink
          title={"Experience"}
          className="hidden group-hover/experience:inline-flex"
        />
      </div>
    )}

    <div
      className={cn(
        "group grid grid-cols-1 divide-y divide-border",
        viewClassName
      )}
    >
      {experiences.map((experience) => (
        <ExperienceItem
          {...experience}
          key={experience.slug}
          showHeader={showHeader}
          preview={previews?.[experience.experienceOrg.link]}
        />
      ))}
    </div>
  </>
);

export { ExperiencesView };
