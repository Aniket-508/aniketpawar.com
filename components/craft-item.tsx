import Link from "next/link";

import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import type { Craft } from "@/types/crafts";

interface CraftItemProps
  extends Craft, Omit<React.ComponentProps<"div">, "title"> {
  variant?: string;
}

const CraftItem = ({
  slug,
  title,
  description,
  links,
  variant = "list",
  className,
  ...attr
}: CraftItemProps) => {
  const isGrid = variant === "grid";

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 min-w-0",
        isGrid && "flex-col items-start gap-1",
        className
      )}
      {...attr}
    >
      {isGrid && (
        <div className="mb-1 p-1 rounded-md border">
          <div className="relative w-full rounded-sm border border-border aspect-video overflow-hidden select-none">
            <video
              src={links.preview}
              autoPlay
              muted
              loop
              aria-label={`Preview of ${title}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      <h3 className="text-primary font-normal">
        <Link
          href={`${ROUTES.CRAFTS}/${slug}`}
          className="hover:underline underline-offset-4"
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
