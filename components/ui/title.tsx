import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "@/lib/utils";

const Title = ({
  className,
  render,
  ...props
}: useRender.ComponentProps<"h1">) =>
  useRender({
    defaultTagName: "h1",
    props: mergeProps<"h1">(
      {
        className: cn(
          "font-heading text-primary text-2xl leading-snug font-semibold",
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
