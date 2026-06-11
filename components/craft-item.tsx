"use client";

import Link from "next/link";

import { MediaPreview } from "@/components/media-preview";
import { ROUTES } from "@/constants/routes";
import { trackCraftDetailClick } from "@/lib/events";
import { cn } from "@/lib/utils";
import type { Craft } from "@/types/crafts";

interface CraftItemProps
  extends Craft, Omit<React.ComponentProps<"div">, "title"> {
  location?: "home" | "listing";
  variant?: string;
}

const CraftItem = ({
  slug,
  title,
  description,
  links,
  location = "home",
  variant = "list",
  className,
  ...attr
}: CraftItemProps) => {
  const isGrid = variant === "grid";

  return (
    <div
      className={cn(
        "w-full flex items-center justify-between gap-2 min-w-0",
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
      <h3 className="text-primary font-normal flex-1">
        <Link
          href={`${ROUTES.CRAFTS}/${slug}`}
          className="hover:underline underline-offset-4 whitespace-nowrap"
          onClick={() => trackCraftDetailClick(slug, title, location)}
        >
          {title}
        </Link>
      </h3>
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
