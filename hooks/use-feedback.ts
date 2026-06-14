"use client";

import type { SoundDefinition } from "@web-kits/audio";
import { defineSound } from "@web-kits/audio";
import { usePatch } from "@web-kits/audio/react";
import { useCallback } from "react";
import type { HapticInput } from "web-haptics";

import { _patch } from "@/audio/core";
import { useHaptics } from "@/providers/haptics-provider";

type PatchSoundKey = keyof typeof _patch.sounds;

type KebabToCamel<S extends string> = S extends `${infer A}-${infer B}`
  ? `${A}${Capitalize<KebabToCamel<B>>}`
  : S;

export type FeedbackType = {
  [K in PatchSoundKey as KebabToCamel<K>]: K;
}[KebabToCamel<PatchSoundKey>];

const toFeedbackKey = (key: string): FeedbackType =>
  key.replaceAll(/-([a-z])/gu, (_, char: string) =>
    char.toUpperCase()
  ) as FeedbackType;

const patchKeyByFeedback = Object.fromEntries(
  (Object.keys(_patch.sounds) as PatchSoundKey[]).map((key) => [
    toFeedbackKey(key),
    key,
  ])
) as Record<FeedbackType, PatchSoundKey>;

const hapticPresetByType: Partial<Record<FeedbackType, HapticInput>> = {
  blur: "light",
  checkbox: "light",
  click: "medium",
  copy: "selection",
  deselect: "light",
  error: "error",
  focus: "light",
  heart: "light",
  hover: "soft",
  keyPress: "light",
  notification: "nudge",
  pop: "medium",
  radio: "medium",
  scrollSnap: "selection",
  select: "selection",
  star: "medium",
  success: "success",
  tabSwitch: "selection",
  tap: "light",
  tick: "selection",
  toggleOff: "light",
  toggleOn: "light",
  warning: "warning",
};

export interface UseFeedbackOptions {
  sound?: FeedbackType;
  soundDef?: SoundDefinition;
  haptic?: boolean;
}

export const useFeedback = ({
  sound,
  soundDef,
  haptic = true,
}: UseFeedbackOptions) => {
  const patch = usePatch(_patch);
  const { trigger: hapticTrigger } = useHaptics();

  return useCallback(
    (override?: FeedbackType) => {
      const activeSound = override ?? sound;

      if (!activeSound && !soundDef) {
        return;
      }

      if (activeSound && patch.ready) {
        patch.play(patchKeyByFeedback[activeSound]);
      } else if (soundDef) {
        defineSound(soundDef)();
      }

      if (activeSound && haptic) {
        void hapticTrigger(hapticPresetByType[activeSound]);
      }
    },
    [sound, soundDef, haptic, hapticTrigger, patch]
  );
};

export const inferButtonFeedback = (
  variant:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "outline"
    | "secondary"
    | null
    | undefined,
  target: EventTarget | null
): FeedbackType => {
  if (target instanceof HTMLAnchorElement) {
    return "tap";
  }

  if (variant === "destructive") {
    return "warning";
  }

  if (variant === "link") {
    return "tap";
  }

  return "click";
};
