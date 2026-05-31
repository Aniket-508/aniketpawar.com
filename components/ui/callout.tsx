import { cn } from "@/lib/utils";

const Callout = ({ className, ...attr }: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "bg-accent text-accent-foreground rounded-lg p-4 text-sm leading-6 font-normal",
      className
    )}
    {...attr}
  >
    {attr?.children}
  </div>
);

export { Callout };
