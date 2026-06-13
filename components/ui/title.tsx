import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "@/lib/utils";

const Title = ({
  className,
  render,
  ...props
}: useRender.ComponentProps<"h2">) =>
  useRender({
    defaultTagName: "h2",
    props: mergeProps<"h2">(
      {
        className: cn(
          "font-heading text-primary text-xl leading-snug font-medium italic",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "title",
    },
  });

export { Title };
