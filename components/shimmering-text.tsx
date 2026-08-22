"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { useCallback } from "react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type ShimmeringTextProps = Omit<
  ComponentProps<typeof motion.span>,
  "children"
> & {
  /** The text to render with the shimmering effect. */
  text: string;
  /**
   * Duration in seconds for one shimmer cycle.
   * @default 1
   */
  duration?: number;
  /**
   * Whether the shimmer animation is paused.
   * @default false
   */
  isStopped?: boolean;
};

export const ShimmeringText = ({
  text,
  duration = 1,
  isStopped = false,
  className,
  ...props
}: ShimmeringTextProps) => {
  const reducedMotion = useReducedMotion();
  const stopped = isStopped || reducedMotion === true;

  const createCharVariants = useCallback(
    (charIndex: number): Variants => ({
      running: {
        color: ["var(--color)", "var(--shimmering-color)", "var(--color)"],
        transition: {
          delay: (charIndex * duration) / text.length,
          duration,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: text.length * 0.05,
          repeatType: "loop",
        },
      },
      stopped: {
        color: "var(--color)",
        transition: {
          duration: duration * 0.5,
          ease: "easeOut",
        },
      },
    }),
    [duration, text.length]
  );

  return (
    <motion.span
      className={cn(
        "inline-flex select-none items-center leading-none",
        "[--color:var(--muted-foreground)] [--shimmering-color:var(--foreground)]",
        className
      )}
      {...props}
    >
      {[...text].map((char, index) => (
        <motion.span
          animate={stopped ? "stopped" : "running"}
          aria-hidden
          className="inline-block whitespace-pre leading-none"
          initial="stopped"
          // biome-ignore lint/suspicious/noArrayIndexKey: static label text, order never changes
          key={index}
          variants={createCharVariants(index)}
        >
          {char}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </motion.span>
  );
};
