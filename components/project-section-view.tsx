"use client";

import { LayoutGridIcon, TextAlignJustifyIcon } from "lucide-react";
import { useState } from "react";

import { CopyLink } from "@/components/copy-link";
import { ProjectItem } from "@/components/project-item";
import type { ProjectItemProps } from "@/components/project-item";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { Title } from "@/components/ui/title";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

interface ProjectSectionViewProps {
  projects: ProjectItemProps[];
  previews: Record<string, GlimpseData>;
}

const ProjectSectionView = ({
  projects,
  previews,
}: ProjectSectionViewProps) => {
  const [variant, setVariant] = useState("list");

  return (
    <>
      <div className="col-span-2 w-full flex items-center justify-between gap-4">
        <div className="group/projects flex items-center gap-2">
          <Title>{"projects."}</Title>
          <CopyLink
            title={"Projects"}
            className="hidden size-4 group-hover/projects:inline"
          />
        </div>
        <ToggleGroup type="single" value={variant} onValueChange={setVariant}>
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
        {projects.map((project, projectIndex) => (
          <ProjectItem
            {...project}
            key={project.title ?? projectIndex}
            previews={previews}
            variant={variant}
          />
        ))}
      </div>
    </>
  );
};

export { ProjectSectionView };
