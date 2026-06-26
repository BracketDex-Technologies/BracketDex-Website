import type { MetadataRoute } from "next";

import { getCanonicalUrl, seoRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return seoRoutes.map((route) => ({
    url: getCanonicalUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
