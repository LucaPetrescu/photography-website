import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { listFolders } from "@/lib/localImages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url;

  const navPages = siteConfig.nav.map((item) => ({
    url: new URL(item.href, base).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));

  const categoryPages = listFolders().map((folder) => ({
    url: new URL(`/gallery/${folder}`, base).toString(),
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...navPages, ...categoryPages];
}
