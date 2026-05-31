import { LayoutGridIcon, TextAlignJustifyIcon } from "lucide-react";
import React from "react";

import { CopyLink } from "@/components/copy-link";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { LinkText } from "@/components/ui/link-text";
import { Tag } from "@/components/ui/tag";
import { Title } from "@/components/ui/title";
import { getProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  links?: {
    website?: string;
    github?: string;
    other?: {
      label?: string;
      link?: string;
    }[];
  };
  description?: string[];
  tech?: string[];
  category: (
    | "ui/ux"
    | "design-system"
    | "static-website"
    | "full-stack"
    | "ai-tool"
    | "icon-set"
  )[];
  status?: "Ongoing" | "Open Source" | "Maintained";
  variant?: "grid" | "list";
}

const parseProjectStatus = ({
  status = "Maintained",
}: {
  status: "Ongoing" | "Open Source" | "Maintained";
}): string => {
  switch (status) {
    case "Ongoing": {
      return "🏗️ Ongoing";
    }
    case "Open Source": {
      return "✨ Open Source";
    }
    case "Maintained": {
      return "👍🏽 Maintained";
    }
    default: {
      return "";
    }
  }
};

const ProjectItem = ({
  title,
  links,
  description,
  tech: _tech,
  category,
  status,
  className,
  variant: _variant = "grid",
  ...attr
}: ProjectItemProps) => (
  <div className={cn("space-y-2 rounded-lg", className)} {...attr}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h3 className="text-primary font-normal capitalize">{title}</h3>
        {status && (
          <Tag className="max-sm:hidden">
            [{parseProjectStatus({ status })}]
          </Tag>
        )}
      </div>
      <div className="flex flex-row items-center justify-start gap-1.5 text-sm">
        {links?.website && (
          <LinkText
            className="text-muted-foreground min-w-[92px] text-xs font-normal"
            href={links?.website}
            target="_blank"
            side="bottom"
          >
            {"Live Preview"}
          </LinkText>
        )}
        {links?.github && (
          <LinkText
            className="text-muted-foreground min-w-[60px] text-xs font-normal"
            href={links?.github}
            target="_blank"
            side="bottom"
          >
            {"GitHub"}
          </LinkText>
        )}
        {links?.other?.map(
          (
            otherLinkItem: {
              label?: string | React.ReactNode;
              link?: string;
            },
            relatedLinkIndex: number
          ) => {
            if (otherLinkItem?.link) {
              return (
                <LinkText
                  className="text-muted-foreground text-xs font-normal"
                  href={otherLinkItem?.link}
                  target={"_blank"}
                  key={relatedLinkIndex}
                >
                  {otherLinkItem?.label}
                </LinkText>
              );
            }
            return null;
          }
        )}
      </div>
    </div>

    {description?.length && (
      <ul className="mt-3 flex flex-col items-start justify-start gap-2 pl-3">
        {description.map((descriptionItem, descriptionIndex) => (
          <li
            key={descriptionIndex}
            className="text-muted-foreground list-outside list-disc text-sm font-normal"
          >
            {descriptionItem}
          </li>
        ))}
      </ul>
    )}
    <div className="flex flex-wrap gap-1">
      {category.map((categoryItem, tagIndex) => (
        <div key={tagIndex} className="flex items-center gap-1">
          <Tag className="font-mono">{categoryItem}</Tag>
          <span className="text-secondary-foreground text-xs opacity-70">
            {tagIndex !== category.length - 1 && "/"}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const ProjectSection = () => (
  <Section
    className="animation-delay-700 grid grid-cols-1 justify-start gap-8"
    id="projects"
  >
    <div className="flex items-center justify-between gap-4">
      <div className="group/projects flex items-center gap-2">
        <Title>{"projects."}</Title>
        <CopyLink
          title={"Projects"}
          className="hidden size-4 group-hover/projects:inline"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <TextAlignJustifyIcon />
        </Button>
        <Button variant="ghost" size="icon">
          <LayoutGridIcon />
        </Button>
      </div>
    </div>
    {getProjects()?.map((project: ProjectItemProps, projectIndex: number) => (
      <ProjectItem {...project} key={projectIndex} />
    ))}
  </Section>
);

export { ProjectSection, type ProjectItemProps };
