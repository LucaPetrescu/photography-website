import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { getProjectCategories } from "@/lib/gallery";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url;

  const navPages = siteConfig.nav.map((item) => ({
    url: new URL(item.href, base).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));

  const categoryPages = getProjectCategories().map((p) => ({
    url: new URL(`/projects/${p.slug}`, base).toString(),
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...navPages, ...categoryPages];
}
