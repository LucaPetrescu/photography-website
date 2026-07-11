import type { Metadata } from "next";
import { listAllPhotos } from "@/lib/B2Bucket";
import { B2PhotoWall } from "@/components/gallery/B2PhotoWall";
import { siteConfig } from "@/lib/siteConfig";

// Signed B2 URLs expire after 1hr — regenerate the page well before that.
export const revalidate = 1800;

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.brand} — Landscape & Portrait Photographer`,
  },
  description: siteConfig.tagline,
};

export default async function OverviewPage() {
  const photos = await listAllPhotos();

  return (
    <main id="main" className="pt-14">
      <div className="px-4 pb-5 pt-8 md:px-8">
        <p className="text-[0.75rem] uppercase tracking-[0.1em] text-muted">
          Overview
        </p>
      </div>
      <div className="px-4 pb-16 md:px-8">
        <B2PhotoWall photos={photos} />
      </div>
    </main>
  );
}
