import { cn } from "@/lib/utils";

const Tag = ({ className, ...attr }: React.ComponentProps<"span">) => (
  <span
    className={cn(
      "text-secondary-foreground flex w-fit cursor-default items-center justify-center text-xs opacity-70 hover:underline hover:opacity-100",
      className
    )}
    {...attr}
  >
    {attr?.children}
  </span>
);

export { Tag };
