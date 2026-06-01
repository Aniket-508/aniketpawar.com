"use client";

import {
  ArrowUpRightIcon,
  LayoutGridIcon,
  TextAlignJustifyIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { CopyLink } from "@/components/copy-link";
import { ProjectItem } from "@/components/project-item";
import { Button } from "@/components/ui/button";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { Title } from "@/components/ui/title";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/projects";

interface ProjectSectionViewProps {
  projects: readonly Project[];
  previews: Record<string, GlimpseData>;
  showViewAll?: boolean;
}

const ProjectSectionView = ({
  projects,
  previews,
  showViewAll = false,
}: ProjectSectionViewProps) => {
  const [variant, setVariant] = useState("list");

  return (
    <>
      <div className="col-span-2 flex w-full items-center justify-between gap-4">
        <div className="group/projects flex items-center gap-2">
          <Title>{"projects."}</Title>
          <CopyLink
            title={"Projects"}
            className="hidden size-4 group-hover/projects:inline"
          />
        </div>
        <ToggleGroup
          type="single"
          value={variant}
          onValueChange={(value) => value && setVariant(value)}
        >
          <ToggleGroupItem value="list" className="h-8 w-8">
            <TextAlignJustifyIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="grid" className="h-8 w-8">
            <LayoutGridIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div
        className={cn(
          "col-span-2 grid grid-cols-1 gap-8",
          variant === "grid" && "sm:grid-cols-2"
        )}
      >
        {projects.map((project) => (
          <ProjectItem
            key={project.slug}
            slug={project.slug}
            title={project.title}
            description={project.description}
            links={project.links}
            previews={previews}
            variant={variant}
          />
        ))}
      </div>
      {showViewAll && (
        <Button variant="secondary" className="group col-span-2" asChild>
          <Link href={ROUTES.PROJECTS}>
            View all
            <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </Button>
      )}
    </>
  );
};

export { ProjectSectionView };
