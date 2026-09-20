import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { markdownResponse } from "@/lib/llms/api";
import { buildHomeMarkdown } from "@/lib/llms/pages";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";
export const revalidate = false;

const homepageMdx = (): string => {
  const base = SITE.URL.replace(/\/$/u, "");

  return `${buildHomeMarkdown().trim()}

## Quick links

- [Projects](${base}${ROUTES.PROJECTS}.mdx)
- [Crafts](${base}${ROUTES.CRAFTS}.mdx)
- [Experiences](${base}${ROUTES.EXPERIENCES}.mdx)
- [LLM index (llms.txt)](${absoluteUrl(ROUTES.LLMS)})
- [Full content (llms-full.txt)](${absoluteUrl(ROUTES.LLMS_FULL)})
`;
};

export const GET = () => markdownResponse(homepageMdx(), true);

export const HEAD = () => markdownResponse(homepageMdx(), false);
