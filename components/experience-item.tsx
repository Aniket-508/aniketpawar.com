import { LinkText } from "@/components/ui/link-text";
import { Tag } from "@/components/ui/tag";
import { techLinks } from "@/lib/tech";
import { cn } from "@/lib/utils";

interface ExperienceItemProps extends React.ComponentProps<"div"> {
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

const ExperienceItem = ({
  experienceTitle,
  experienceDescription,
  experienceOrg,
  experienceStatus,
  experienceTech,
  className,
  ...attr
}: ExperienceItemProps) => (
  <div
    className={cn("-mx-3 flex flex-col gap-4 rounded-lg px-3 py-2", className)}
    {...attr}
  >
    <div className="flex flex-wrap items-start justify-between gap-2">
      <div>
        <h3 className="text-primary font-normal">
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
      <p className="text-muted-foreground text-sm font-normal">
        {`${experienceStatus?.startAt} - ${experienceStatus?.endAt}`}
      </p>
    </div>
    {experienceDescription?.length ? (
      <ul className="hidden flex-col items-start justify-start gap-2 pl-3">
        {experienceDescription.map((descriptionItem, index) => (
          <li
            key={index}
            className="text-muted-foreground list-outside list-disc text-sm font-normal"
            dangerouslySetInnerHTML={{ __html: descriptionItem }}
          />
        ))}
      </ul>
    ) : null}
    {experienceTech?.length ? (
      <div className="flex flex-wrap gap-1">
        {experienceTech.map((tech, index) => (
          <div key={tech} className="flex items-center gap-1">
            <a
              href={techLinks[tech as keyof typeof techLinks]}
              target="_blank"
              rel="noreferrer"
            >
              <Tag className="cursor-pointer font-mono">{tech}</Tag>
            </a>
            <span className="text-secondary-foreground text-xs opacity-70">
              {index !== experienceTech.length - 1 && "/"}
            </span>
          </div>
        ))}
      </div>
    ) : null}
  </div>
);

export { ExperienceItem, type ExperienceItemProps };
