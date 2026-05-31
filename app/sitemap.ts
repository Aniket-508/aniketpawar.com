import type { MetadataRoute } from "next";

import { SITE } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 1,
      url: SITE.URL,
    },
  ];
}
