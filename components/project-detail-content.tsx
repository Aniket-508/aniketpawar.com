import { FileTextIcon, GlobeIcon } from "lucide-react";
import type { MDXContent } from "mdx/types";
import Image from "next/image";

import { ContentDetailShell } from "@/components/content-detail-shell";
import { Icons } from "@/components/icons";
import { MdxBody } from "@/components/mdx-body";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { formatProjectDate } from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { Project, TOCItem } from "@/types/projects";

interface ProjectDetailContentProps {
  project: Project;
  previewImage?: string | null;
  Content: MDXContent;
  tocItems: TOCItem[];
}

const ProjectDetailContent = ({
  project,
  previewImage,
  Content,
  tocItems,
}: ProjectDetailContentProps) => {
  const imageSrc = project.image ?? previewImage ?? SITE.OG_IMAGE;
  const pageUrl = `${SITE.URL}${ROUTES.PROJECTS}/${project.slug}`;

  return (
    <ContentDetailShell
      backHref={ROUTES.PROJECTS}
      backLabel="Projects"
      shareTitle={project.title}
      shareUrl={pageUrl}
      tocItems={tocItems}
      meta={
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-md border border-border px-2 py-0.5 text-xs">
            {project.category}
          </span>
          <span aria-hidden>·</span>
          <time dateTime={`${project.date.year}-${project.date.month}`}>
            {formatProjectDate(project.date)}
          </time>
        </div>
      }
      header={
        <header className="space-y-4">
          <h1 className="text-3xl font-normal tracking-tight text-primary">
            {project.title}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </header>
      }
      media={
        <div className="relative aspect-1200/630 w-full overflow-hidden rounded-lg border border-border">
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 640px"
            priority
          />
        </div>
      }
      actions={
        <div className="flex flex-wrap items-center gap-2">
          {project.links.website && (
            <Button variant="outline" size="sm" className="gap-1.5" asChild>
              <a
                href={project.links.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlobeIcon className="size-4" />
                Website
              </a>
            </Button>
          )}
          {project.links.github && (
            <Button variant="outline" size="sm" className="gap-1.5" asChild>
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.github className="size-4" />
                GitHub
              </a>
            </Button>
          )}
          {project.links.post && (
            <Button variant="outline" size="sm" className="gap-1.5" asChild>
              <a
                href={project.links.post}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileTextIcon className="size-4" />
                Post
              </a>
            </Button>
          )}
        </div>
      }
    >
      <MdxBody Content={Content} />

      {project.tech && project.tech.length > 0 && (
        <section id="technologies" className="scroll-mt-24 not-prose">
          <h2 className="mb-4 text-xl font-normal text-primary">
            Technologies
          </h2>
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <li
                key={item}
                className={cn(
                  "rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground"
                )}
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}
    </ContentDetailShell>
  );
};

export { ProjectDetailContent };
