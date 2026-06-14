import type { Transition } from "motion/react";

import { DEFAULT_CHART_ENTER_TRANSITION } from "./animation";

export const transitionWithDelay = (
  transition: Transition | undefined,
  delaySeconds: number,
  fallback: Transition = DEFAULT_CHART_ENTER_TRANSITION
): Transition => {
  const base = transition ?? fallback;
  return { ...base, delay: delaySeconds };
};

export interface SpringOptions {
  stiffness: number;
  damping: number;
  mass?: number;
}

const DEFAULT_SPRING: SpringOptions = { damping: 20, stiffness: 60 };

export const springOptionsFromTransition = (
  transition?: Transition,
  fallback: SpringOptions = DEFAULT_SPRING
): SpringOptions => {
  if (!transition) {
    return fallback;
  }
  if (transition.type === "spring") {
    const bounce =
      typeof transition.bounce === "number" ? transition.bounce : undefined;
    const baseStiffness =
      typeof transition.stiffness === "number"
        ? transition.stiffness
        : fallback.stiffness;
    const baseDamping =
      typeof transition.damping === "number"
        ? transition.damping
        : fallback.damping;
    return {
      damping:
        bounce === null || bounce === undefined
          ? baseDamping
          : Math.max(8, baseDamping * (1 - bounce * 0.25)),
      mass:
        typeof transition.mass === "number" ? transition.mass : fallback.mass,
      stiffness:
        bounce === null || bounce === undefined
          ? baseStiffness
          : Math.min(400, Math.max(80, baseStiffness * (1 + bounce * 0.35))),
    };
  }
  const duration =
    "duration" in transition && typeof transition.duration === "number"
      ? transition.duration
      : 0.8;
  return {
    damping: Math.min(40, Math.max(12, 18 + duration * 4)),
    stiffness: Math.min(500, Math.max(40, 280 / duration)),
  };
};
