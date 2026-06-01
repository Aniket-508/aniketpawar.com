"use client";

import { LayoutGridIcon, TextAlignJustifyIcon } from "lucide-react";
import { useState } from "react";

import { ProjectItem } from "@/components/project-item";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/projects";

interface ProjectsListViewProps {
  projects: readonly Project[];
  previews: Record<string, GlimpseData>;
  defaultVariant?: "list" | "grid";
}

const ProjectsListView = ({
  projects,
  previews,
  defaultVariant = "grid",
}: ProjectsListViewProps) => {
  const [variant, setVariant] = useState(defaultVariant);

  return (
    <>
      <div className="mb-8 flex items-center justify-end">
        <div className="flex rounded-lg border border-border p-0.5">
          <button
            type="button"
            aria-label="List view"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
              variant === "list"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setVariant("list")}
          >
            <TextAlignJustifyIcon className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Grid view"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
              variant === "grid"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setVariant("grid")}
          >
            <LayoutGridIcon className="size-4" />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid grid-cols-1 gap-8",
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
    </>
  );
};

export { ProjectsListView };
