"use client";

import { motion, useInView, usePageInView } from "motion/react";
import { useRef } from "react";

import { TextFlip } from "@/components/text-flip";

const FlipRoles = () => {
  const ref = useRef<HTMLSpanElement>(null);
  const isPageInView = usePageInView();
  const isInView = useInView(ref);

  return (
    <span ref={ref}>
      <TextFlip
        as={motion.span}
        className="shimmer text-base leading-snug text-muted-foreground shimmer-duration-1500 shimmer-once not-dark:shimmer-color-foreground"
        interval={3}
        play={isPageInView && isInView}
      >
        <span>Frontend Engineer</span>
        <span>Design Engineer</span>
        <span>Product Engineer</span>
      </TextFlip>
    </span>
  );
};

export { FlipRoles };
