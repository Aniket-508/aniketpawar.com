"use client";

import type { GlimpseData } from "@/components/ui/glimpse/types";
import { useProjectsListingFilters } from "@/lib/search-params/hooks";
import type { ProjectsListingDefaults } from "@/lib/search-params/hooks";
import { QUERY_KEYS } from "@/lib/search-params/keys";
import type { ProjectFilterQueryKeys } from "@/lib/search-params/keys";
import type { Project } from "@/types/projects";

import { ProjectsViewList } from "./view";

interface ProjectsListingListProps {
  projects: readonly Project[];
  previews: Record<string, GlimpseData>;
  queryKeys?: ProjectFilterQueryKeys;
  defaults?: ProjectsListingDefaults;
  showHeader?: boolean;
  viewClassName?: string;
}

const ProjectsListingList = ({
  projects,
  previews,
  queryKeys = QUERY_KEYS.projects.page,
  defaults,
  showHeader = false,
  viewClassName,
}: ProjectsListingListProps) => {
  const { source, view } = useProjectsListingFilters(queryKeys, defaults);

  return (
    <ProjectsViewList
      source={source}
      variant={view}
      projects={projects}
      previews={previews}
      showHeader={showHeader}
      viewClassName={viewClassName}
    />
  );
};

export { ProjectsListingList };
