import { cn } from "@/lib/utils";

const Title = ({ className, ...attr }: React.ComponentProps<"h2">) => (
  <h2
    className={cn(
      "font-heading text-primary text-xl leading-snug font-medium italic",
      className
    )}
    {...attr}
  >
    {attr?.children}
  </h2>
);

export { Title };
