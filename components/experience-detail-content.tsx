import { GlobeIcon } from "lucide-react";
import type { MDXContent } from "mdx/types";

import { ContentDetailShell } from "@/components/content-detail-shell";
import { MdxBody } from "@/components/mdx-body";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { getTechLink } from "@/lib/tech";
import type { Experience } from "@/types/experiences";
import type { TOCItem } from "@/types/projects";

interface ExperienceDetailContentProps {
  experience: Experience;
  Content: MDXContent;
  tocItems: TOCItem[];
}

const ExperienceDetailContent = ({
  experience,
  Content,
  tocItems,
}: ExperienceDetailContentProps) => {
  const pageUrl = `${SITE.URL}${ROUTES.EXPERIENCES}/${experience.slug}`;

  return (
    <ContentDetailShell
      backHref={ROUTES.HOME}
      backLabel="Home"
      shareTitle={`${experience.experienceTitle} · ${experience.experienceOrg.name}`}
      shareUrl={pageUrl}
      tocItems={tocItems}
      meta={
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-md border border-border px-2 py-0.5 text-xs">
            Experience
          </span>
          <span aria-hidden>·</span>
          <time>
            {experience.experienceStatus.startAt} –{" "}
            {experience.experienceStatus.endAt}
          </time>
        </div>
      }
      header={
        <header className="space-y-4">
          <h1 className="text-3xl font-normal tracking-tight text-primary">
            {experience.experienceTitle}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            {experience.experienceOrg.name} ·{" "}
            {experience.experienceOrg.websiteDisplayName}
          </p>
        </header>
      }
      actions={
        <Button variant="outline" size="sm" className="gap-1.5" asChild>
          <a
            href={experience.experienceOrg.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GlobeIcon className="size-4" />
            Website
          </a>
        </Button>
      }
    >
      <MdxBody Content={Content} />

      {experience.experienceTech.length > 0 && (
        <section id="technologies" className="scroll-mt-24 not-prose">
          <h2 className="mb-4 text-xl font-normal text-primary">
            Technologies
          </h2>
          <div className="flex flex-wrap gap-1">
            {experience.experienceTech.map((tech, index) => {
              const techUrl = getTechLink(tech);

              return (
                <div key={tech} className="flex items-center gap-1">
                  {techUrl ? (
                    <a href={techUrl} target="_blank" rel="noreferrer">
                      <Tag className="cursor-pointer font-mono">{tech}</Tag>
                    </a>
                  ) : (
                    <Tag className="font-mono">{tech}</Tag>
                  )}
                  <span className="text-xs text-secondary-foreground opacity-70">
                    {index !== experience.experienceTech.length - 1 && "/"}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </ContentDetailShell>
  );
};

export { ExperienceDetailContent };
