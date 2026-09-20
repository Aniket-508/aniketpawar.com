import type { Registry } from "shadcn/schema";

import { blocks } from "./blocks/_registry";
import { components } from "./components/_registry";

export const registry = {
  homepage: "https://aniketpawar.com",
  items: [...components, ...blocks],
  name: "aniket-ui",
} satisfies Registry;
