import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

const Section: React.FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...attr
}) => {
  return (
    <section className={cn("p-4", className)} {...attr}>
      {attr?.children}
    </section>
  );
};

export default Section;
