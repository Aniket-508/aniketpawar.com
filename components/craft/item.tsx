"use client";

import Link from "next/link";

import { MediaPreview } from "@/components/media-preview";
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

  const titleLink = (
    <Link
      href={`${ROUTES.CRAFTS}/${slug}`}
      className="hover:underline underline-offset-4 whitespace-nowrap"
      onClick={() =>
        trackCraftDetailClick(slug, title, showHeader ? "home" : "listing")
      }
    >
      {title}
    </Link>
  );

  return (
    <div
      className={cn(
        "py-4 w-full transition-[border-color,opacity] duration-50 hover:opacity-100 group-hover:opacity-30 flex items-center justify-between gap-2 min-w-0",
        isGrid && "flex-col items-start gap-1",
        className
      )}
      {...attr}
    >
      {isGrid && (
        <MediaPreview
          src={links.preview}
          title={title}
          className="mb-1"
          type="video"
        />
      )}
      <Title
        className="font-sans text-base font-normal flex-1"
        render={showHeader ? <h3>{titleLink}</h3> : <h2>{titleLink}</h2>}
      />
      <p
        className={cn(
          "text-muted-foreground text-sm font-normal truncate max-w-[60%]",
          isGrid && "max-w-full"
        )}
        title={description}
      >
        {description}
      </p>
    </div>
  );
};

export { CraftItem, type CraftItemProps };
