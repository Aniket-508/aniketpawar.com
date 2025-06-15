import Link from "next/link"

import { getExperiences } from "@/lib/experiences"
import { techLinks } from "@/lib/tech"
import { cn } from "@/lib/utils"

import { CopyLink } from "../CopyLink"
import Section from "../layout/Section"
import LinkText from "../ui/LinkText"
import Tag from "../ui/Tag"
import Title from "../ui/Title"

interface ExperienceItemProps extends React.HTMLAttributes<HTMLDivElement> {
  experienceTitle: React.ReactNode | string
  experienceDescription?: string[]
  experienceOrg: {
    name: React.ReactNode | string
    link: React.ReactNode | string
    websiteDisplayName: React.ReactNode | string
  }
  experienceStatus: {
    startAt: React.ReactNode | string
    endAt: React.ReactNode | string
  }
  experienceTech?: string[]
}

const ExperienceSection: React.FunctionComponent = () => {
  return (
    <Section className="grid grid-cols-1 justify-start gap-6" id="experience">
      <span className="group/experience flex items-center space-x-2">
        <Title>{"worked as."}</Title>
        <CopyLink
          title={"Experience"}
          className="hidden size-4 group-hover/experience:inline"
        />
      </span>
      {getExperiences()?.map(
        (experience: ExperienceItemProps, experienceIndex: number) => (
          <ExperienceItem {...experience} key={experienceIndex} />
        )
      )}
    </Section>
  )
}

const ExperienceItem: React.FunctionComponent<ExperienceItemProps> = ({
  experienceTitle,
  experienceDescription,
  experienceOrg,
  experienceStatus,
  experienceTech,
  className,
  ...attr
}) => {
  return (
    <div
      className={cn(
        "-mx-4 flex transform flex-col gap-4 rounded-lg px-4 py-2 transition-all duration-300 ease-in-out md:hover:scale-[1.02] md:hover:bg-accent",
        className
      )}
      {...attr}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-normal text-primary">
            {`${experienceTitle}, ${experienceOrg?.name}`}
          </h3>
          <div className="flex items-center justify-start gap-1.5 text-sm">
            {"at, "}
            {typeof experienceOrg?.link === "string" ? (
              <LinkText
                className="text-sm font-normal"
                href={experienceOrg?.link}
                target={"_blank"}
              >
                {experienceOrg?.websiteDisplayName}
              </LinkText>
            ) : (
              <span className="text-sm font-normal">
                {experienceOrg?.websiteDisplayName}
              </span>
            )}
          </div>
        </div>
        <p className="text-sm font-normal text-muted-foreground">
          {experienceStatus?.startAt + " - " + experienceStatus?.endAt}
        </p>
      </div>
      {/* {experienceDescription?.length ? (
        <ul className="flex flex-col items-start justify-start gap-2 pl-3">
          {experienceDescription.map((descriptionItem, index) => (
            <li
              key={index}
              className="list-outside list-disc text-sm font-normal text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: descriptionItem }}
            />
          ))}
        </ul>
      ) : null} */}
      {experienceTech?.length ? (
        <div className="flex flex-wrap gap-1">
          {experienceTech.map((tech, index) => (
            <div className="flex items-center gap-1">
              <Link
                key={tech}
                href={techLinks[tech as keyof typeof techLinks]}
                target="_blank"
              >
                <Tag className="cursor-pointer font-mono">{tech}</Tag>
              </Link>
              <span className="text-xs text-secondary-foreground opacity-70">
                {index !== experienceTech.length - 1 && "/"}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default ExperienceSection

export type { ExperienceItemProps }
