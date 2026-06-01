import { ExternalLinkIcon } from "lucide-react";
import type { MDXContent } from "mdx/types";

import { ContentDetailShell } from "@/components/content-detail-shell";
import { MdxBody } from "@/components/mdx-body";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import type { Craft } from "@/types/crafts";
import type { TOCItem } from "@/types/projects";

interface CraftDetailContentProps {
  craft: Craft;
  Content: MDXContent;
  tocItems: TOCItem[];
}

const CraftDetailContent = ({
  craft,
  Content,
  tocItems,
}: CraftDetailContentProps) => {
  const pageUrl = `${SITE.URL}${ROUTES.CRAFTS}/${craft.slug}`;

  return (
    <ContentDetailShell
      backHref={ROUTES.HOME}
      backLabel="Home"
      shareTitle={craft.title}
      shareUrl={pageUrl}
      tocItems={tocItems}
      header={
        <header className="space-y-4">
          <h1 className="text-3xl font-normal tracking-tight text-primary">
            {craft.title}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            {craft.description}
          </p>
        </header>
      }
      media={
        <div className="overflow-hidden rounded-lg border border-border">
          <video
            src={craft.links.preview}
            controls
            className="aspect-video w-full bg-muted"
            preload="metadata"
            aria-label={`${craft.title} preview`}
          >
            <track kind="captions" />
          </video>
        </div>
      }
      actions={
        <Button variant="outline" size="sm" className="gap-1.5" asChild>
          <a
            href={craft.links.preview}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLinkIcon className="size-4" />
            Preview
          </a>
        </Button>
      }
    >
      <MdxBody Content={Content} />
    </ContentDetailShell>
  );
};

export { CraftDetailContent };
