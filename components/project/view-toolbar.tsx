"use client";

import { ViewToggle } from "@/components/view-tabs";
import type { ProjectsListingDefaults } from "@/lib/search-params/hooks";
import type { ProjectFilterQueryKeys } from "@/lib/search-params/keys";
import { cn } from "@/lib/utils";

import { ProjectSourceCombobox } from "./source-combobox";
import { ProjectSourceTabs } from "./source-tabs";

type ProjectSourceControl = "combobox" | "tabs";

interface ProjectsViewToolbarProps {
  queryKeys: ProjectFilterQueryKeys;
  defaults?: ProjectsListingDefaults;
  sourceControl?: ProjectSourceControl;
  className?: string;
}

const ProjectsViewToolbar = ({
  queryKeys,
  defaults,
  sourceControl = "combobox",
  className,
}: ProjectsViewToolbarProps) => (
  <div className={cn("flex items-center justify-between gap-4", className)}>
    {sourceControl === "combobox" ? (
      <ProjectSourceCombobox
        queryKey={queryKeys.source}
        defaultValue={defaults?.source}
      />
    ) : (
      <ProjectSourceTabs
        queryKey={queryKeys.source}
        defaultValue={defaults?.source}
      />
    )}
    <ViewToggle
      queryKey={queryKeys.view}
      section="projects"
      defaultValue={defaults?.view}
    />
  </div>
);

export { ProjectsViewToolbar };
export type { ProjectSourceControl, ProjectsViewToolbarProps };
