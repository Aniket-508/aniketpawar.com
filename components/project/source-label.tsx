import Image from "next/image";

import { cn } from "@/lib/utils";
import type { ProjectSourceOption } from "@/types/projects";

interface ProjectSourceLabelProps {
  source: ProjectSourceOption;
  className?: string;
}

const ProjectSourceLabel = ({ source, className }: ProjectSourceLabelProps) => {
  const Icon = source.icon;

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      {source.image ? (
        <Image
          alt={source.label}
          className="size-4 shrink-0 rounded-full object-cover"
          height={16}
          src={source.image}
          width={16}
        />
      ) : (
        Icon && <Icon className="size-4 shrink-0" />
      )}
      <span>{source.label}</span>
    </span>
  );
};

export { ProjectSourceLabel };
