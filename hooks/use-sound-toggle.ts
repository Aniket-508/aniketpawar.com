import { useSound } from "@web-kits/audio/react";
import { useHotkeys } from "react-hotkeys-hook";

import { toggleOff, toggleOn } from "@/audio/core";
import { useSoundEnabled } from "@/providers/sound-provider";

export const useSoundToggle = () => {
  const { enabled, setEnabled } = useSoundEnabled();

  const playToggleOn = useSound(toggleOn);
  const playToggleOff = useSound(toggleOff);

  const toggleSound = () => {
    if (enabled) {
      playToggleOff();
    } else {
      playToggleOn();
    }
    setEnabled((prev) => !prev);
  };

  useHotkeys("s", () => toggleSound(), { preventDefault: true });

  return { enabled, toggleSound };
};
