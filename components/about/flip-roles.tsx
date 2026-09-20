"use client";

import { useInView, usePageInView } from "motion/react";
import { useRef } from "react";

import { TextFlip } from "@/components/text-flip";

const FlipRoles = ({
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children" | "ref"> & {
  children: string[];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isPageInView = usePageInView();
  const isInView = useInView(ref);

  return (
    <div ref={ref} {...props}>
      <TextFlip
        className="shimmer text-base leading-snug text-muted-foreground shimmer-once shimmer-duration-1500 not-dark:shimmer-color-foreground"
        interval={3}
        play={isPageInView && isInView}
      >
        {children}
      </TextFlip>
    </div>
  );
};

export { FlipRoles };
