"use client";

import { useMemo, useState } from "react";
import type { GalleryImage } from "@/lib/gallery";
import {
  GalleryFilter,
  type FilterValue,
} from "@/components/gallery/GalleryFilter";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Lightbox } from "@/components/gallery/Lightbox";

/**
 * Client orchestrator for the gallery: owns the active category filter and the
 * lightbox selection, and wires the filter chips, grid, and lightbox together.
 * The full manifest is passed down from the (server) gallery page.
 */
export function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState<FilterValue>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? images
        : images.filter((img) => img.categories.includes(filter)),
    [images, filter],
  );

  // Reset any open lightbox when the filter changes so the index stays valid.
  const handleFilterChange = (value: FilterValue) => {
    setOpenIndex(null);
    setFilter(value);
  };

  return (
    <>
      <GalleryFilter value={filter} onChange={handleFilterChange} />

      {filtered.length > 0 ? (
        <GalleryGrid images={filtered} onOpen={setOpenIndex} />
      ) : (
        <p className="py-16 text-center text-muted">
          No photographs in this category yet.
        </p>
      )}

      <Lightbox
        images={filtered}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
