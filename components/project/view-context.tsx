"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import { DEFAULT_PROJECT_SOURCE } from "@/constants/project-sources";
import type { Variant } from "@/lib/events";
import type { ProjectSource } from "@/types/projects";

interface ProjectsViewContextValue {
  source: ProjectSource;
  setSource: (source: ProjectSource) => void;
  variant: Variant;
  setVariant: (variant: Variant) => void;
}

const ProjectsViewContext = createContext<ProjectsViewContextValue | null>(
  null
);

interface ProjectsViewProviderProps {
  children: ReactNode;
  defaultSource?: ProjectSource;
  defaultVariant?: Variant;
}

const ProjectsViewProvider = ({
  children,
  defaultSource = DEFAULT_PROJECT_SOURCE,
  defaultVariant = "list",
}: ProjectsViewProviderProps) => {
  const [source, setSourceState] = useState<ProjectSource>(defaultSource);
  const [variant, setVariantState] = useState<Variant>(defaultVariant);

  const setSource = useCallback((nextSource: ProjectSource) => {
    setSourceState(nextSource);
  }, []);

  const setVariant = useCallback((nextVariant: Variant) => {
    setVariantState(nextVariant);
  }, []);

  const value = useMemo(
    () => ({
      setSource,
      setVariant,
      source,
      variant,
    }),
    [setSource, setVariant, source, variant]
  );

  return (
    <ProjectsViewContext.Provider value={value}>
      {children}
    </ProjectsViewContext.Provider>
  );
};

const useProjectsView = (): ProjectsViewContextValue => {
  const context = useContext(ProjectsViewContext);

  if (!context) {
    throw new Error("useProjectsView must be used within ProjectsViewProvider");
  }

  return context;
};

export { ProjectsViewProvider, useProjectsView };
export type { ProjectsViewContextValue, ProjectsViewProviderProps };
