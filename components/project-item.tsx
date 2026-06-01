"use client";

import { GlobeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { LinkTextClient } from "@/components/ui/link-text/client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import type { ProjectLinks } from "@/types/projects";

interface ProjectLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isGrid: boolean;
  preview?: GlimpseData | null;
  listClassName?: string;
}

const ProjectLink = ({
  href,
  label,
  icon,
  isGrid,
  preview,
  listClassName,
}: ProjectLinkProps) => {
  if (isGrid) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground"
            asChild
          >
            <a href={href} target="_blank" rel="noreferrer">
              {icon}
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <LinkTextClient
      className={cn(
        "text-muted-foreground min-w-[60px] text-xs font-normal",
        listClassName
      )}
      href={href}
      target="_blank"
      side="bottom"
      preview={preview}
    >
      {label}
    </LinkTextClient>
  );
};

interface ProjectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  slug?: string;
  title?: string;
  links?: ProjectLinks;
  description?: string;
  tech?: string[];
  variant?: string;
  previews?: Record<string, GlimpseData>;
}

const ProjectItem = ({
  slug,
  title,
  links,
  description,
  tech: _tech,
  className,
  variant = "list",
  previews,
  ...attr
}: ProjectItemProps) => {
  const isGrid = variant === "grid";
  const image = previews?.[links?.website ?? ""]?.image ?? "";
  const detailHref = slug ? `${ROUTES.PROJECTS}/${slug}` : undefined;

  const titleElement = detailHref ? (
    <Link
      href={detailHref}
      className="text-primary font-normal hover:underline underline-offset-4"
    >
      {title}
    </Link>
  ) : (
    <h3 className="text-primary font-normal">{title}</h3>
  );

  return (
    <div className={cn("space-y-1", className)} {...attr}>
      {isGrid && image && (
        <Link
          href={detailHref ?? "#"}
          className={cn(
            "mb-2 block rounded-md border p-1",
            !detailHref && "pointer-events-none"
          )}
        >
          <div className="relative aspect-1200/630 w-full overflow-hidden rounded-sm border border-border select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>
      )}
      <div className="flex items-center justify-between gap-4">
        {titleElement}
        <div className="flex shrink-0 flex-row items-center justify-start gap-1.5">
          {links?.website && (
            <ProjectLink
              href={links.website}
              label="Website"
              icon={<GlobeIcon />}
              isGrid={isGrid}
              preview={previews?.[links.website]}
              listClassName="min-w-[66px]"
            />
          )}
          {links?.github && (
            <ProjectLink
              href={links.github}
              label="GitHub"
              icon={<Icons.github />}
              isGrid={isGrid}
              preview={previews?.[links.github]}
            />
          )}
        </div>
      </div>

      {description && (
        <p className="text-muted-foreground text-sm font-normal">
          {description}
        </p>
      )}
    </div>
  );
};

export { ProjectItem, type ProjectItemProps };
