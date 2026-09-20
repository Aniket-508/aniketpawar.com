import { cn } from "cn";

import { SITE } from "@/constants/site";

export { cn };

export const absoluteUrl = (path: string) => `${SITE.URL}${path}`;
