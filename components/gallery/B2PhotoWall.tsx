"use client";

import { useState } from "react";
import { B2Lightbox } from "./B2Lightbox";

const ease = "cubic-bezier(0.16,1,0.3,1)";

export function B2PhotoWall({ urls }: { urls: string[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-3 lg:columns-4" style={{ columnGap: "12px" }}>
        {urls.map((url, idx) => (
          <button
            key={url}
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt={`Photograph ${idx + 1}`}
              style={{ width: "100%", height: "auto", display: "block" }}
              className="transition-opacity duration-[var(--dur-base)] group-hover:opacity-80"
            />
          </button>
        ))}
      </div>

      <B2Lightbox
        urls={urls}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
