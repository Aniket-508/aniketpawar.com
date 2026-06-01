import Link from "next/link";

import { LinkText } from "@/components/ui/link-text";
import { Tag } from "@/components/ui/tag";
import { ROUTES } from "@/constants/routes";
import { getTechLink } from "@/lib/tech";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types/experiences";

interface ExperienceItemProps
  extends Experience, Omit<React.ComponentProps<"div">, "title"> {}

const ExperienceItem = ({
  slug,
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
          <Link
            href={`${ROUTES.EXPERIENCES}/${slug}`}
            className="hover:underline underline-offset-4"
          >
            {`${experienceTitle}, ${experienceOrg?.name}`}
          </Link>
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
        {experienceTech.map((tech, index) => {
          const techUrl = getTechLink(tech);

          return (
            <div key={tech} className="flex items-center gap-1">
              {techUrl ? (
                <a href={techUrl} target="_blank" rel="noreferrer">
                  <Tag className="cursor-pointer font-mono">{tech}</Tag>
                </a>
              ) : (
                <Tag className="font-mono">{tech}</Tag>
              )}
              <span className="text-secondary-foreground text-xs opacity-70">
                {index !== experienceTech.length - 1 && "/"}
              </span>
            </div>
          );
        })}
      </div>
    ) : null}
  </div>
);

export { ExperienceItem, type ExperienceItemProps };
