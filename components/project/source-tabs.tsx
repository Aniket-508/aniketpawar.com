"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROJECT_SOURCES } from "@/constants/projects";
import type { ProjectSource } from "@/types/projects";

import { ProjectSourceLabel } from "./source-label";

interface ProjectSourceTabsProps {
  value: ProjectSource;
  onChange: (source: ProjectSource) => void;
  className?: string;
}

const ProjectSourceTabs = ({
  value,
  onChange,
  className,
}: ProjectSourceTabsProps) => (
  <Tabs
    value={value}
    onValueChange={(next) => {
      if (!next) {
        return;
      }

      onChange(next as ProjectSource);
    }}
    className={className}
  >
    <TabsList>
      {PROJECT_SOURCES.map((source) => (
        <TabsTrigger
          key={source.value}
          value={source.value}
          className="gap-1.5 px-2"
        >
          <ProjectSourceLabel source={source} />
        </TabsTrigger>
      ))}
    </TabsList>
  </Tabs>
);

export { ProjectSourceTabs };
