"use client";

import Link from "next/link";

import { TechStack } from "@/components/tech-stack";
import { AppLink } from "@/components/ui/app-link";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { ROUTES } from "@/constants/routes";
import { trackExperienceDetailClick } from "@/lib/events";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types/experiences";

interface ExperienceItemProps
  extends Experience, Omit<React.ComponentProps<"div">, "title"> {
  location?: "home" | "listing";
  preview?: GlimpseData | null;
}

const ExperienceItem = ({
  slug,
  experienceTitle,
  experienceDescription,
  experienceOrg,
  experienceStatus,
  experienceTech,
  category: _category,
  orgDescription: _orgDescription,
  experienceLinks: _experienceLinks,
  location = "home",
  preview,
  className,
  ...attr
}: ExperienceItemProps) => (
  <div
    className={cn(
      "py-4 w-full space-y-4 transition-[border-color,opacity] duration-50 hover:opacity-100 group-hover:opacity-30",
      className
    )}
    {...attr}
  >
    <div className="flex flex-wrap items-start justify-between gap-2">
      <div>
        <h3 className="text-primary font-normal">
          <Link
            href={`${ROUTES.EXPERIENCES}/${slug}`}
            className="hover:underline underline-offset-4"
            onClick={() =>
              trackExperienceDetailClick(
                slug,
                `${experienceTitle}, ${experienceOrg.name}`,
                location
              )
            }
          >
            {`${experienceTitle}, ${experienceOrg?.name}`}
          </Link>
        </h3>
        <div className="flex items-center justify-start gap-1.5 text-sm">
          {"at, "}
          {typeof experienceOrg?.link === "string" ? (
            <AppLink
              className="text-sm font-normal"
              href={experienceOrg?.link}
              target="_blank"
              external
              preview={preview}
              eventName="external_link_click"
              eventProperties={{
                context: "experience_item",
                link_type: "website",
                slug,
                title: experienceOrg.name,
                url: experienceOrg.link,
              }}
            >
              {experienceOrg?.websiteDisplayName}
            </AppLink>
          ) : (
            <span className="text-sm font-normal">
              {experienceOrg?.websiteDisplayName}
            </span>
          )}
        </div>
      </div>
      <p className="text-muted-foreground text-sm font-normal tabular-nums">
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
    {experienceTech?.length ? <TechStack items={experienceTech} /> : null}
  </div>
);

export { ExperienceItem, type ExperienceItemProps };
