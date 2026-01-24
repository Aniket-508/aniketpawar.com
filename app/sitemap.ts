import { MetadataRoute } from "next"
import { SITE } from "@/constants"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
