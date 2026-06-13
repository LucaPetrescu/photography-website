"use client";

import { useRef } from "react";
import { GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/gallery";
import { cn } from "@/lib/cn";

export type FilterValue = "All" | GalleryCategory;

const FILTERS: FilterValue[] = ["All", ...GALLERY_CATEGORIES];

type GalleryFilterProps = {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
};

/**
 * Horizontal row of toggle chips. Behaves as a single-select group: chips use
 * `aria-pressed` and are arrow-key navigable (roving focus across the row).
 */
export function GalleryFilter({ value, onChange }: GalleryFilterProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (idx + dir + FILTERS.length) % FILTERS.length;
    refs.current[next]?.focus();
  };

  return (
    <div
      role="group"
      aria-label="Filter photographs by category"
      className="-mx-5 flex gap-2 overflow-x-auto px-5 py-6 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {FILTERS.map((filter, idx) => {
        const active = value === filter;
        return (
          <button
            key={filter}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(filter)}
            onKeyDown={(e) => onKeyDown(e, idx)}
            className={cn(
              "min-h-10 flex-none rounded-sm border px-3.5 py-2 text-body-sm font-medium transition-colors duration-[var(--dur-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
              active
                ? "border-[color-mix(in_srgb,var(--color-accent)_35%,transparent)] bg-accent-subtle text-accent"
                : "border-border bg-transparent text-muted hover:text-text",
            )}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
