"use client";

import { CopyLink } from "@/components/copy-link";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { Title } from "@/components/ui/title";
import { filterProjectsBySource } from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/projects";

import { ProjectItem } from "./item";
import { ProjectsViewProvider, useProjectsView } from "./view-context";
import { ProjectsViewToolbar } from "./view-toolbar";
import type { ProjectSourceControl } from "./view-toolbar";

interface ProjectsViewListProps {
  projects: readonly Project[];
  previews: Record<string, GlimpseData>;
  showHeader?: boolean;
  viewClassName?: string;
  featuredOnly?: boolean;
  limit?: number;
}

const ProjectsViewList = ({
  projects,
  previews,
  showHeader = true,
  viewClassName,
  featuredOnly = false,
  limit,
}: ProjectsViewListProps) => {
  const { source, variant } = useProjectsView();
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

interface ProjectsViewHeaderProps {
  headerClassName?: string;
  sourceControl?: ProjectSourceControl;
}

const ProjectsViewHeader = ({
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
      sourceControl={sourceControl}
      className="w-auto shrink-0 justify-end gap-2"
    />
  </div>
);

interface ProjectsViewProps {
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
  <ProjectsViewProvider>
    {showHeader && (
      <ProjectsViewHeader
        headerClassName={headerClassName}
        sourceControl={sourceControl}
      />
    )}
    {showToolbar && (
      <ProjectsViewToolbar
        sourceControl={sourceControl}
        className={toolbarClassName}
      />
    )}
    <ProjectsViewList
      projects={projects}
      previews={previews}
      showHeader={showHeader}
      viewClassName={viewClassName}
      featuredOnly={featuredOnly}
      limit={limit}
    />
  </ProjectsViewProvider>
);

export {
  ProjectsView,
  ProjectsViewHeader,
  ProjectsViewList,
  ProjectsViewProvider,
  ProjectsViewToolbar,
};

export { useProjectsView } from "./view-context";
