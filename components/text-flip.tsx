"use client";

import type { Transition, Variants } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { Children, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const defaultTransition: Transition = { duration: 0.3 };

const defaultVariants: Variants = {
  animate: {
    filter: "blur(0px)",
    opacity: 1,
    y: "0%",
  },
  exit: {
    filter: "blur(1px)",
    opacity: 0,
    transition: { ease: "easeOut" },
    y: "40%",
  },
  initial: { filter: "blur(1px)", opacity: 0, y: "-20%" },
};

type MotionElement = typeof motion.p | typeof motion.span | typeof motion.code;

export interface TextFlipProps {
  /**
   * Motion element to render.
   * @default motion.p
   * */
  as?: MotionElement;
  className?: string;
  /** Array of children to cycle through. */
  children: React.ReactNode[];

  /**
   * Time in seconds between each flip.
   * @default 2
   * */
  interval?: number;
  /**
   * Motion transition configuration.
   * @default { duration: 0.3 }
   * */
  transition?: Transition;
  /** Motion variants for enter/exit animations. */
  variants?: Variants;

  /** Controls whether the flip animation runs. */
  play?: boolean;

  /** Called with the new index after each flip. */
  onIndexChange?: (index: number) => void;
}

export const TextFlip = ({
  as: Component = motion.p,
  className,
  children,

  interval = 2,
  transition = defaultTransition,
  variants = defaultVariants,
  play = true,

  onIndexChange,
}: TextFlipProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = Children.toArray(children);

  useEffect(() => {
    if (!play) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, interval * 1000);

    return () => clearInterval(timer);
  }, [play, interval, items.length, onIndexChange]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Component
        key={currentIndex}
        className={cn("inline-block", className)}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        variants={variants}
      >
        {items[currentIndex]}
      </Component>
    </AnimatePresence>
  );
};
