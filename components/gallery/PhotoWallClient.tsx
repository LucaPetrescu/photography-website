"use client";

import { useState } from "react";
import type { GalleryImage } from "@/lib/gallery";
import { PhotoWall } from "@/components/gallery/PhotoWall";
import { Lightbox } from "@/components/gallery/Lightbox";

/**
 * Client wrapper around PhotoWall that owns the lightbox open/close state.
 * The full image manifest is passed down from the (server) parent page.
 */
export function PhotoWallClient({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <PhotoWall images={images} onOpen={setOpenIndex} />
      <Lightbox
        images={images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
