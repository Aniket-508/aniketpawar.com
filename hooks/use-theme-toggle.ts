"use client";

import { useSound } from "@web-kits/audio/react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { toggleOff, toggleOn } from "@/audio/core";
import { useMetaColor } from "@/hooks/use-meta-color";

export const useThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { setMetaColor, metaColor } = useMetaColor();

  const playToggleOn = useSound(toggleOn);
  const playToggleOff = useSound(toggleOff);

  useEffect(() => {
    setMetaColor(metaColor);
  }, [metaColor, setMetaColor]);

  const toggleTheme = () => {
    const nextResolved = resolvedTheme === "dark" ? "light" : "dark";
    if (nextResolved === "dark") {
      playToggleOff();
    } else if (nextResolved === "light") {
      playToggleOn();
    } else {
      playToggleOn();
    }
    setTheme(nextResolved);
  };

  useHotkeys("d", () => toggleTheme(), { preventDefault: true });

  return { theme, toggleTheme };
};
