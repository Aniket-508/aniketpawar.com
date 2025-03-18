import Link from "next/link";
import { getExperiences } from "@/lib/experiences";
import { techLinks } from "@/lib/tech";
import { cn } from "@/lib/utils";
import Section from "../layout/Section";
import LinkText from "../ui/LinkText";
import Title from "../ui/Title";

interface ExperienceItemProps extends React.HTMLAttributes<HTMLDivElement> {
  experienceTitle: React.ReactNode | string;
  experienceDescription?: string[];
  experienceOrg: {
    name: React.ReactNode | string;
    link: React.ReactNode | string;
    websiteDisplayName: React.ReactNode | string;
  };
  experienceStatus: {
    startAt: React.ReactNode | string;
    endAt: React.ReactNode | string;
  };
  experienceTech?: string[];
}

const ExperienceSection: React.FunctionComponent = () => {
  return (
    <Section
      className="grid grid-cols-1 border-b justify-start gap-4"
      id="experience"
    >
      <Title>{"worked as."}</Title>
      <Section className="grid grid-cols-1 justify-start p-0 gap-8">
        {getExperiences()?.map(
          (experience: ExperienceItemProps, experienceIndex: number) => (
            <ExperienceItem {...experience} key={experienceIndex} />
          )
        )}
      </Section>
    </Section>
  );
};

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
    <div className={cn(className)} {...attr}>
      <div className="flex flex-row items-start justify-between max-md:flex-col max-md:justify-start max-md:gap-2 max-sm:w-[320px]">
        <span>
          <h3 className="font-normal text-primary w-[50ch] max-md:w-[30ch]">
            {experienceTitle + ", " + experienceOrg?.name}
          </h3>
          <div className="text-sm flex flex-row items-center justify-start gap-1.5">
            {"at, "}
            {typeof experienceOrg?.link === "string" ? (
              <LinkText
                className="font-normal text-sm"
                href={experienceOrg?.link}
                target={"_blank"}
              >
                {experienceOrg?.websiteDisplayName}
              </LinkText>
            ) : (
              <span className="font-normal text-sm">
                {experienceOrg?.websiteDisplayName}
              </span>
            )}
          </div>
        </span>
        <p className="font-normal text-muted-foreground text-sm">
          {experienceStatus?.startAt + " - " + experienceStatus?.endAt}
        </p>
      </div>
      {experienceDescription?.length ? (
        <ul className="mt-4 flex flex-col items-start justify-start gap-2 pl-3">
          {experienceDescription.map((descriptionItem, index) => (
            <li
              key={index}
              className="font-normal text-muted-foreground text-sm list-disc list-outside"
              dangerouslySetInnerHTML={{ __html: descriptionItem }}
            />
          ))}
        </ul>
      ) : null}
      {experienceTech?.length ? (
        <div className="mt-3 flex gap-2">
          <p className="font-normal text-muted-foreground text-sm">tech:</p>
          <div className="flex flex-wrap gap-1">
            {experienceTech.map((tech) => (
              <Link
                key={tech}
                href={techLinks[tech as keyof typeof techLinks]}
                target="_blank"
                className="text-xs cursor-pointer rounded px-2 py-1 bg-muted w-fit text-muted-foreground hover:bg-primary hover:text-primary-foreground"
              >
                {tech}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ExperienceSection;

export type { ExperienceItemProps };
