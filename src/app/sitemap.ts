import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";

// Single-page site: just the homepage for now. Add entries as pages are added.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
