"use client";

import Link from "next/link";

import { MediaPreview } from "@/components/media-preview";
import {
  Glimpse,
  GlimpseContent,
  GlimpseTrigger,
} from "@/components/ui/glimpse";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import { trackCraftDetailClick } from "@/lib/events";
import { cn } from "@/lib/utils";
import type { Craft } from "@/types/crafts";

interface CraftItemProps
  extends Craft, Omit<React.ComponentProps<"div">, "title"> {
  showHeader?: boolean;
  variant?: string;
}

const CraftItem = ({
  slug,
  title,
  description,
  links,
  showHeader = true,
  variant = "list",
  className,
  ...attr
}: CraftItemProps) => {
  const isGrid = variant === "grid";

  const craftHref = `${ROUTES.CRAFTS}/${slug}`;
  const trackClick = () =>
    trackCraftDetailClick(slug, title, showHeader ? "home" : "listing");

  const titleRender = showHeader ? <h3>{title}</h3> : <h2>{title}</h2>;

  const linkedTitleRender = showHeader ? (
    <h3>
      <Link
        href={craftHref}
        className="hover:underline underline-offset-4 whitespace-nowrap"
        onClick={trackClick}
      >
        {title}
      </Link>
    </h3>
  ) : (
    <h2>
      <Link
        href={craftHref}
        className="hover:underline underline-offset-4 whitespace-nowrap"
        onClick={trackClick}
      >
        {title}
      </Link>
    </h2>
  );

  const titleClassName = "font-sans text-base font-normal flex-1";

  if (isGrid) {
    return (
      <div
        className={cn(
          "py-4 w-full transition-[border-color,opacity] duration-50 hover:opacity-100 group-hover:opacity-30 flex flex-col items-start gap-1",
          className
        )}
        {...attr}
      >
        <MediaPreview
          src={links.preview}
          title={title}
          className="mb-1"
          type="video"
        />
        <Title className={titleClassName} render={linkedTitleRender} />
        <p
          className="text-muted-foreground text-sm font-normal max-w-full"
          title={description}
        >
          {description}
        </p>
      </div>
    );
  }

  return (
    <Glimpse>
      <GlimpseTrigger
        className={cn(
          "py-4 w-full transition-[border-color,opacity] duration-50 hover:opacity-100 group-hover:opacity-30 flex items-center justify-between gap-2 min-w-0 cursor-pointer",
          className
        )}
        href={craftHref}
        onClick={trackClick}
      >
        <Title className={titleClassName} render={titleRender} />
        <p
          className="text-muted-foreground text-sm font-normal truncate max-w-[60%]"
          title={description}
        >
          {description}
        </p>
      </GlimpseTrigger>
      <GlimpseContent side="left" sideOffset={8} className="ring-0 p-0 w-80">
        <MediaPreview src={links.preview} title={title} type="video" />
      </GlimpseContent>
    </Glimpse>
  );
};

export { CraftItem, type CraftItemProps };
