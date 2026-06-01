import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const Title = ({
  className,
  asChild = false,
  ...attr
}: React.ComponentProps<"h2"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot.Root : "h2";

  return (
    <Comp
      data-slot="title"
      className={cn(
        "font-heading text-primary text-xl leading-snug font-medium italic",
        className
      )}
      {...attr}
    >
      {attr?.children}
    </Comp>
  );
};

export { Title };
