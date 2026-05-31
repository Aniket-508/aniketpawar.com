import { cn } from "@/lib/utils";

const Section = ({ className, ...attr }: React.ComponentProps<"section">) => (
  <section
    className={cn(
      "animate-in fade-in fill-mode-both px-4 py-6 duration-1000",
      className
    )}
    {...attr}
  >
    {attr?.children}
  </section>
);

export { Section };
