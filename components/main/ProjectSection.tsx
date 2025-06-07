import React from "react"

import { getProjects } from "@/lib/projects"
import { cn } from "@/lib/utils"

import { CopyLink } from "../CopyLink"
import Section from "../layout/Section"
import LinkText from "../ui/LinkText"
import Tag from "../ui/Tag"
import Title from "../ui/Title"

interface ProjectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  projectTitle?: string
  projectData?: {
    liveURL?: string
    githubURL?: string
    relatedLinks?: Array<{
      label?: string | React.ReactNode
      link?: string
    }>
  }
  description?: string[]
  tech?: string[]
  category: Array<
    | "design"
    | "community"
    | "accessibilty"
    | "ui/ux"
    | "design-system"
    | "static-website"
    | "full-stack"
  >
  status?: "Ongoing" | "Open Source" | "Maintained"
}

const parseProjectStatus = ({
  status = "Maintained",
}: {
  status: "Ongoing" | "Open Source" | "Maintained"
}): string => {
  switch (status) {
    case "Ongoing":
      return "🏗️ Ongoing"
    case "Open Source":
      return "✨ Open Source"
    case "Maintained":
      return "👍🏽 Maintained"
    default:
      return ""
  }
}

const ProjectSection: React.FunctionComponent = () => {
  return (
    <Section
      className="grid grid-cols-1 justify-start gap-4 border-b"
      id="projects"
    >
      <span className="group/projects flex items-center space-x-2">
        <Title>{"projects."}</Title>
        <CopyLink
          title={"Projects"}
          className="hidden size-4 group-hover/projects:inline"
        />
      </span>
      {getProjects()?.map((project: ProjectItemProps, projectIndex: number) => (
        <ProjectItem {...project} key={projectIndex} />
      ))}
    </Section>
  )
}

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
    <div className={cn("space-y-1 rounded-lg border p-4", className)} {...attr}>
      <div className="flex flex-wrap items-center">
        <h3 className="font-normal capitalize text-primary">{projectTitle}</h3>
        {status && (
          <Tag className="bg-inherit hover:bg-inherit hover:text-muted-foreground">
            [
            {parseProjectStatus({
              status,
            })}
            ]
          </Tag>
        )}
      </div>
      <div className="flex flex-row items-center justify-start gap-1.5 text-sm">
        {projectData?.liveURL && (
          <LinkText
            className="text-xs font-normal text-muted-foreground"
            href={projectData?.liveURL}
            target={"_blank"}
          >
            {"Live Preview"}
          </LinkText>
        )}
        {projectData?.githubURL && (
          <LinkText
            className="text-xs font-normal text-muted-foreground"
            href={projectData?.githubURL}
            target={"_blank"}
          >
            {"GitHub"}
          </LinkText>
        )}
        {projectData?.relatedLinks?.map(
          (
            relatedLinkItem: {
              label?: string | React.ReactNode
              link?: string
            },
            relatedLinkIndex: number
          ) => {
            if (relatedLinkItem?.link) {
              return (
                <LinkText
                  className="text-xs font-normal text-muted-foreground"
                  href={relatedLinkItem?.link}
                  target={"_blank"}
                  key={relatedLinkIndex}
                >
                  {relatedLinkItem?.label}
                </LinkText>
              )
            }
          }
        )}
      </div>
      {description?.length && (
        <ul className="mt-3 flex flex-col items-start justify-start gap-2 pl-3">
          {description.map((descriptionItem, descriptionIndex) => (
            <li
              key={descriptionIndex}
              className="list-outside list-disc text-sm font-normal text-muted-foreground"
            >
              {descriptionItem}
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center gap-2">
        <p className="text-sm text-muted-foreground">category:</p>
        <div className="flex flex-wrap gap-1">
          {category.map((categoryItem, tagIndex) => (
            <Tag key={tagIndex} className="font-mono">
              {categoryItem}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectSection

export type { ProjectItemProps }
