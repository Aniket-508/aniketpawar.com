import { useHotkeys } from "react-hotkeys-hook";

import { useGridMode } from "@/providers/grid-mode-provider";

export const useGridModeToggle = () => {
  const { enabled, toggleGridMode } = useGridMode();

  useHotkeys("b", () => toggleGridMode(), { preventDefault: true });

  return { enabled, toggleGridMode };
};
