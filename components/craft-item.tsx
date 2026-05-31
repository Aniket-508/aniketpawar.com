import { cn } from "@/lib/utils";

interface CraftItemProps extends React.ComponentProps<"div"> {
  title: string;
  description: string;
  links: {
    preview: string;
  };
  variant?: string;
}

const CraftItem = ({
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
      <h3 className="text-primary font-normal">{title}</h3>
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
