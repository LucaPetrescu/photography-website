"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/B2Bucket";
import { B2Lightbox } from "./B2Lightbox";

const ease = "cubic-bezier(0.16,1,0.3,1)";

// Above-the-fold tiles load eagerly and get fetch priority; the rest wait
// for next/image's built-in lazy-load threshold so requests don't all fire at once.
const EAGER_COUNT = 6;

export function B2PhotoWall({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-3 lg:columns-4" style={{ columnGap: "12px" }}>
        {photos.map((photo, idx) => (
          <button
            key={photo.url}
            type="button"
            onClick={() => setOpenIndex(idx)}
            aria-label={`Open photograph ${idx + 1}`}
            className="group block w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--color-focus)]"
            style={{
              breakInside: "avoid",
              display: "block",
              marginBottom: "12px",
              animation: `fadeInUp 700ms ${ease} ${Math.min(idx * 50, 400)}ms both`,
            }}
          >
            <Image
              src={photo.url}
              alt={`Photograph ${idx + 1}`}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 25vw, 33vw"
              priority={idx < EAGER_COUNT}
              loading={idx < EAGER_COUNT ? "eager" : "lazy"}
              style={{ width: "100%", height: "auto", display: "block" }}
              className="transition-opacity duration-[var(--dur-base)] group-hover:opacity-80"
            />
          </button>
        ))}
      </div>

      <B2Lightbox
        photos={photos}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
