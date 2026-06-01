import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { ProjectShareButton } from "@/components/project-share-button";
import { TOCMinimap } from "@/components/toc-minimap";
import { Button } from "@/components/ui/button";
import type { TOCItem } from "@/types/projects";

interface ContentDetailShellProps {
  backHref: string;
  backLabel?: string;
  shareTitle: string;
  shareUrl: string;
  meta?: React.ReactNode;
  header: React.ReactNode;
  media?: React.ReactNode;
  actions?: React.ReactNode;
  tocItems: TOCItem[];
  children: React.ReactNode;
}

const ContentDetailShell = ({
  backHref,
  backLabel = "Back",
  shareTitle,
  shareUrl,
  meta,
  header,
  media,
  actions,
  tocItems,
  children,
}: ContentDetailShellProps) => (
  <>
    <TOCMinimap items={tocItems} />

    <article className="space-y-8 pb-16">
      <div className="flex items-center justify-between gap-4">
        <Button variant="ghost" size="sm" className="-ml-2 gap-1.5" asChild>
          <Link href={backHref}>
            <ArrowLeftIcon className="size-4" />
            {backLabel}
          </Link>
        </Button>
        <ProjectShareButton title={shareTitle} url={shareUrl} />
      </div>

      {meta}
      {header}
      {media}
      {actions}
      {children}
    </article>
  </>
);

export { ContentDetailShell };
