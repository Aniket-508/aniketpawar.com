"use client";

import { GlobeIcon } from "lucide-react";
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
import { cn } from "@/lib/utils";

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

interface ProjectItemProps extends React.ComponentProps<"div"> {
  title?: string;
  links?: {
    website?: string;
    github?: string;
  };
  description?: string;
  tech?: string[];
  variant?: string;
  previews?: Record<string, GlimpseData>;
}

const ProjectItem = ({
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

  return (
    <div className={cn("space-y-1", className)} {...attr}>
      {isGrid && (
        <div className="mb-2 p-1 rounded-md border">
          <div className="relative w-full rounded-sm border border-border aspect-1200/630 overflow-hidden select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <h3 className="text-primary font-normal">{title}</h3>
        <div className="flex flex-row items-center justify-start gap-1.5">
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
