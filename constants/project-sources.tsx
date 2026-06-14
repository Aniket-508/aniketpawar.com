import type { ComponentType, SVGProps } from "react";

import { Icons } from "@/components/icons";
import { SITE } from "@/constants/site";
import type { ProjectSource } from "@/types/projects";

type SourceIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface ProjectSourceOption {
  value: ProjectSource;
  label: string;
  icon?: SourceIcon;
  image?: string;
}

export const PROJECT_SOURCES = [
  {
    image: SITE.AUTHOR.AVATAR,
    label: "Personal",
    value: "personal",
  },
  {
    icon: Icons.shadcnlabs,
    label: "Shadcn Labs",
    value: "shadcn-labs",
  },
] as const satisfies readonly ProjectSourceOption[];

export const DEFAULT_PROJECT_SOURCE: ProjectSource = "personal";

export const getProjectSourceOption = (
  source: ProjectSource
): ProjectSourceOption =>
  PROJECT_SOURCES.find((option) => option.value === source) ??
  PROJECT_SOURCES[0];
