import type { Metadata } from "next";
import { galleryImages } from "@/lib/gallery";
import { PhotoWallClient } from "@/components/gallery/PhotoWallClient";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.brand} — Landscape & Portrait Photographer`,
  },
  description: siteConfig.tagline,
};

export default function OverviewPage() {
  return (
    <main id="main" className="pt-14">
      <div className="px-4 pb-5 pt-8 md:px-8">
        <p className="text-[0.75rem] uppercase tracking-[0.1em] text-muted">
          Overview — {galleryImages.length} photographs
        </p>
      </div>
      <div className="px-4 pb-16 md:px-8">
        <PhotoWallClient images={galleryImages} />
      </div>
    </main>
  );
}
