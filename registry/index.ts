import type { Registry } from "shadcn/schema";

import { components } from "./components/_registry";

export const registry = {
  homepage: "https://aniketpawar.com",
  items: [...components],
  name: "aniket-ui",
} satisfies Registry;
