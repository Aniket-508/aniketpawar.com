"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEFAULT_PROJECT_SOURCE, PROJECT_SOURCES } from "@/constants/projects";
import { useProjectSourceQueryState } from "@/lib/search-params/hooks";
import type { ProjectSource } from "@/types/projects";

import { ProjectSourceLabel } from "./source-label";

interface ProjectSourceTabsProps {
  queryKey: string;
  defaultValue?: ProjectSource;
  className?: string;
}

const ProjectSourceTabs = ({
  queryKey,
  defaultValue = DEFAULT_PROJECT_SOURCE,
  className,
}: ProjectSourceTabsProps) => {
  const [value, setValue] = useProjectSourceQueryState(queryKey, defaultValue);

  return (
    <Tabs
      value={value}
      onValueChange={(next) => {
        if (!next) {
          return;
        }

        void setValue(next as ProjectSource);
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
};

export { ProjectSourceTabs };
