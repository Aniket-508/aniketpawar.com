"use client";

import { useState } from "react";

import { CopyLink } from "@/components/copy-link";
import { ProjectItem } from "@/components/project-item";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { Title } from "@/components/ui/title";
import type { ViewVariant } from "@/components/view-tabs";
import { ViewToggle } from "@/components/view-tabs";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/projects";

interface ProjectsViewProps {
  projects: readonly Project[];
  previews: Record<string, GlimpseData>;
  defaultVariant?: ViewVariant;
  showHeader?: boolean;
  headerClassName?: string;
  viewClassName?: string;
}

const ProjectsView = ({
  projects,
  previews,
  showHeader = true,
  headerClassName,
  viewClassName,
  defaultVariant = "list",
}: ProjectsViewProps) => {
  const [variant, setVariant] = useState(defaultVariant);

  return (
    <>
      {showHeader && (
        <div
          className={cn(
            "flex items-center justify-between gap-4",
            headerClassName
          )}
        >
          <div className="group/projects flex-1 flex items-center gap-1">
            <Title>{"projects."}</Title>
            <CopyLink
              title={"Projects"}
              className="hidden group-hover/projects:inline-flex"
            />
          </div>
          <ViewToggle
            value={variant}
            onChange={setVariant}
            section="projects"
          />
        </div>
      )}

      <div
        className={cn(
          "grid grid-cols-1 gap-8",
          variant === "grid" && "sm:grid-cols-2",
          viewClassName
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
            location={showHeader ? "home" : "listing"}
          />
        ))}
      </div>
    </>
  );
};

export { ProjectsView };
