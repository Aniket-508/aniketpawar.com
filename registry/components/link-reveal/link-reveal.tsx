"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { LinkRevealData } from "./types";

export type LinkRevealProps = Omit<
  React.ComponentProps<"a">,
  | "children"
  | "onDrag"
  | "onDragEnd"
  | "onDragStart"
  | "onAnimationStart"
  | "onAnimationEnd"
> &
  Partial<LinkRevealData> & {
    children: ReactNode;
    icon?: ReactNode;
  };

export const LinkReveal = ({
  favicon,
  primaryColor,
  icon,
  className,
  children,
  ...props
}: LinkRevealProps) => {
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const animate = reducedMotion ? false : hovered;

  return (
    <motion.a
      className={cn(
        "group/link relative inline-flex items-center font-medium",
        "underline underline-offset-2 !no-underline",
        primaryColor && "hover:text-[var(--link-reveal-color)]",
        className
      )}
      style={
        {
          "--link-reveal-color": primaryColor ?? undefined,
        } as React.CSSProperties
      }
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={animate ? { x: -4 } : { x: 0 }}
      transition={{ damping: 25, stiffness: 400, type: "spring" }}
      {...props}
    >
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 my-auto inline-flex size-[1.2em] items-center overflow-hidden rounded-xs"
        animate={animate ? { opacity: 1, x: 0 } : { opacity: 0, x: 4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {icon ??
          (favicon && (
            // biome-ignore lint/performance/noImgElement: registry component, favicon from external source
            <img
              alt=""
              className="size-full shrink-0 object-contain"
              height={16}
              src={favicon}
              width={16}
            />
          ))}
      </motion.span>
      <motion.span
        className="leading-none"
        animate={animate ? { paddingLeft: "1.4em" } : { paddingLeft: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.span>
    </motion.a>
  );
};
