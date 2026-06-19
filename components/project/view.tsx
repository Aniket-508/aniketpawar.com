"use client";

import { Suspense } from "react";

import { CopyLink } from "@/components/copy-link";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { Title } from "@/components/ui/title";
import type { Variant } from "@/lib/events";
import { filterProjectsBySource } from "@/lib/projects";
import { useProjectsListingFilters } from "@/lib/search-params/hooks";
import type { ProjectsListingDefaults } from "@/lib/search-params/hooks";
import type { ProjectFilterQueryKeys } from "@/lib/search-params/keys";
import { cn } from "@/lib/utils";
import type { Project, ProjectSource } from "@/types/projects";

import { ProjectItem } from "./item";
import { ProjectsViewToolbar } from "./view-toolbar";
import type { ProjectSourceControl } from "./view-toolbar";

interface ProjectsViewListProps {
  projects: readonly Project[];
  previews: Record<string, GlimpseData>;
  source: ProjectSource;
  variant: Variant;
  showHeader?: boolean;
  viewClassName?: string;
  featuredOnly?: boolean;
  limit?: number;
}

const ProjectsViewList = ({
  projects,
  previews,
  source,
  variant,
  showHeader = true,
  viewClassName,
  featuredOnly = false,
  limit,
}: ProjectsViewListProps) => {
  let filteredProjects = filterProjectsBySource(projects, source);

  if (featuredOnly) {
    filteredProjects = filteredProjects.filter((project) => project.featured);
  }

  if (limit !== undefined) {
    filteredProjects = filteredProjects.slice(0, limit);
  }

  return (
    <div
      className={cn(
        "group grid grid-cols-1",
        variant === "grid" &&
          "sm:grid-cols-2 sm:[&>*:nth-child(2n+1)]:pr-4 sm:[&>*:nth-child(2n+2)]:pl-4 [&>*:nth-child(2n+1)]:pb-4 [&>*:nth-child(2n+2)]:pb-4",
        variant === "list" && "divide-y divide-border",
        viewClassName
      )}
    >
      {filteredProjects.map((project) => (
        <ProjectItem
          key={project.slug}
          slug={project.slug}
          title={project.title}
          description={project.description}
          links={project.links}
          previews={previews}
          variant={variant}
          showHeader={showHeader}
        />
      ))}
    </div>
  );
};

interface ProjectsViewListUrlProps {
  queryKeys: ProjectFilterQueryKeys;
  defaults?: ProjectsListingDefaults;
  projects: readonly Project[];
  previews: Record<string, GlimpseData>;
  showHeader?: boolean;
  viewClassName?: string;
  featuredOnly?: boolean;
  limit?: number;
}

const ProjectsViewListUrl = ({
  queryKeys,
  defaults,
  projects,
  previews,
  showHeader = true,
  viewClassName,
  featuredOnly = false,
  limit,
}: ProjectsViewListUrlProps) => {
  const { source, view } = useProjectsListingFilters(queryKeys, defaults);

  return (
    <ProjectsViewList
      source={source}
      variant={view}
      projects={projects}
      previews={previews}
      showHeader={showHeader}
      viewClassName={viewClassName}
      featuredOnly={featuredOnly}
      limit={limit}
    />
  );
};

interface ProjectsViewHeaderProps {
  queryKeys: ProjectFilterQueryKeys;
  defaults?: ProjectsListingDefaults;
  headerClassName?: string;
  sourceControl?: ProjectSourceControl;
}

const ProjectsViewHeader = ({
  queryKeys,
  defaults,
  headerClassName,
  sourceControl = "combobox",
}: ProjectsViewHeaderProps) => (
  <div
    className={cn("flex items-center justify-between gap-4", headerClassName)}
  >
    <div className="group/projects flex flex-1 items-center gap-1">
      <Title
        className="text-xl font-medium italic"
        render={<h2>{"projects."}</h2>}
      />
      <CopyLink
        title={"Projects"}
        className="hidden group-hover/projects:inline-flex"
      />
    </div>
    <ProjectsViewToolbar
      queryKeys={queryKeys}
      defaults={defaults}
      sourceControl={sourceControl}
      className="w-auto shrink-0 justify-end gap-2"
    />
  </div>
);

interface ProjectsViewProps {
  queryKeys: ProjectFilterQueryKeys;
  defaults?: ProjectsListingDefaults;
  projects: readonly Project[];
  previews: Record<string, GlimpseData>;
  showHeader?: boolean;
  showToolbar?: boolean;
  sourceControl?: ProjectSourceControl;
  headerClassName?: string;
  toolbarClassName?: string;
  viewClassName?: string;
  featuredOnly?: boolean;
  limit?: number;
}

const ProjectsView = ({
  queryKeys,
  defaults,
  projects,
  previews,
  showHeader = true,
  showToolbar = false,
  headerClassName,
  toolbarClassName,
  viewClassName,
  sourceControl = "combobox",
  featuredOnly,
  limit,
}: ProjectsViewProps) => (
  <>
    {showHeader && (
      <Suspense>
        <ProjectsViewHeader
          queryKeys={queryKeys}
          defaults={defaults}
          headerClassName={headerClassName}
          sourceControl={sourceControl}
        />
      </Suspense>
    )}
    {showToolbar && (
      <Suspense>
        <ProjectsViewToolbar
          queryKeys={queryKeys}
          defaults={defaults}
          sourceControl={sourceControl}
          className={toolbarClassName}
        />
      </Suspense>
    )}
    <Suspense>
      <ProjectsViewListUrl
        queryKeys={queryKeys}
        defaults={defaults}
        projects={projects}
        previews={previews}
        showHeader={showHeader}
        viewClassName={viewClassName}
        featuredOnly={featuredOnly}
        limit={limit}
      />
    </Suspense>
  </>
);

export {
  ProjectsView,
  ProjectsViewHeader,
  ProjectsViewList,
  ProjectsViewListUrl,
  ProjectsViewToolbar,
};
