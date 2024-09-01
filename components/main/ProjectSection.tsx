import React from "react";
import { getProjects } from "@/lib/projects";
import { cn } from "@/utils/helper";
import Section from "../layout/Section";
import LinkText from "../ui/LinkText";
import Title from "../ui/Title";

interface ProjectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  projectTitle?: string;
  projectData?: {
    liveURL?: string;
    githubURL?: string;
    relatedLinks?: Array<{
      label?: string | React.ReactNode;
      link?: string;
    }>;
  };
  description?: string[];
  tech?: string[];
  category?: Array<
    | "design"
    | "community"
    | "accessibilty"
    | "ui/ux"
    | "design-system"
    | "static-website"
    | "full-stack"
  >;
  status?: "Ongoing" | "Open Source" | "Maintained";
}

const parseProjectStatus = ({
  status = "Maintained",
}: {
  status: "Ongoing" | "Open Source" | "Maintained";
}): string => {
  switch (status) {
    case "Ongoing":
      return "🏗️ Ongoing";
    case "Open Source":
      return "✨ Open Source";
    case "Maintained":
      return "👍🏽 Maintained";
    default:
      return "";
  }
};

const ProjectSection: React.FunctionComponent = () => {
  return (
    <Section className="grid grid-cols-1 justify-start gap-4" id="projects">
      <Title>{"projects."}</Title>
      <Section className="mt-4 grid grid-cols-1 justify-start gap-8">
        {getProjects()?.map(
          (project: ProjectItemProps, projectIndex: number) => (
            <ProjectItem {...project} key={projectIndex} />
          )
        )}
      </Section>
    </Section>
  );
};

const ProjectItem: React.FunctionComponent<ProjectItemProps> = ({
  projectTitle,
  projectData,
  description,
  tech,
  category,
  status,
  className,
  ...attr
}) => {
  return (
    <div
      className={cn(
        "border-l-2 pl-4 hover:border-blue-400 cursor-default transition-all",
        className
      )}
      {...attr}
    >
      <div className="flex flex-row items-start justify-between max-md:flex-col max-md:justify-start max-md:gap-2 max-sm:w-[320px]">
        <span>
          <h3 className="font-normal text-zinc-900 capitalize w-[46ch] max-md:w-[30ch]">
            {projectTitle}
          </h3>
          <div className="text-sm flex flex-row items-center justify-start gap-1.5">
            {projectData?.liveURL && (
              <LinkText
                className="text-xs font-normal text-zinc-500"
                href={projectData?.liveURL}
                target={"_blank"}
              >
                {"Live Preview"}
              </LinkText>
            )}
            {projectData?.githubURL && (
              <LinkText
                className="text-xs font-normal text-zinc-500"
                href={projectData?.githubURL}
                target={"_blank"}
              >
                {"GitHub"}
              </LinkText>
            )}
            {projectData?.relatedLinks?.map(
              (
                relatedLinkItem: {
                  label?: string | React.ReactNode;
                  link?: string;
                },
                relatedLinkIndex: number
              ) => {
                if (relatedLinkItem?.link) {
                  return (
                    <LinkText
                      className="text-xs font-normal text-zinc-500"
                      href={relatedLinkItem?.link}
                      target={"_blank"}
                      key={relatedLinkIndex}
                    >
                      {relatedLinkItem?.label}
                    </LinkText>
                  );
                }
              }
            )}
          </div>
        </span>
      </div>
      <div>
        {status && (
          <p className="my-2 text-xs rounded px-2 py-1 bg-zinc-200 w-fit text-zinc-500 hover:bg-zinc-800 hover:text-gray-100">
            {parseProjectStatus({
              status,
            })}
          </p>
        )}
        {description?.length && (
          <ul className="mt-3 flex flex-col items-start justify-start gap-2 pl-3">
            {description.map((descriptionItem, descriptionIndex) => (
              <li
                key={descriptionIndex}
                className="font-normal text-zinc-500 text-sm list-disc list-outside"
              >
                {descriptionItem}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-3">
          <span className="text-sm text-gray-500">
            {"category: " + category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;

export type { ProjectItemProps };
