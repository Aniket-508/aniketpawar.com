import { useSound } from "@web-kits/audio/react";
import { useHotkeys } from "react-hotkeys-hook";

import { toggleOff, toggleOn } from "@/audio/core";
import { useHaptics } from "@/providers/haptics-provider";

export const useHapticsToggle = () => {
  const { enabled, setEnabled } = useHaptics();

  const playToggleOn = useSound(toggleOn);
  const playToggleOff = useSound(toggleOff);

  const toggleHaptics = () => {
    if (enabled) {
      playToggleOff();
    } else {
      playToggleOn();
    }
    setEnabled((prev) => !prev);
  };

  useHotkeys("h", () => toggleHaptics(), { preventDefault: true });

  return { enabled, toggleHaptics };
};
