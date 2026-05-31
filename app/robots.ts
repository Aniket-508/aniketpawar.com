import type { MetadataRoute } from "next";

import { SITE } from "@/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      userAgent: "*",
    },
    sitemap: `${SITE.URL}/sitemap.xml`,
  };
}
