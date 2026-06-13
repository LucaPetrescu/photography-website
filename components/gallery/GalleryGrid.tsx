import Image from "next/image";
import type { GalleryImage } from "@/lib/gallery";

type GalleryGridProps = {
  images: GalleryImage[];
  /** Called with the index (within `images`) of the tile that was activated. */
  onOpen: (index: number) => void;
};

/**
 * Responsive 1→2→3→4 column grid of uniform 4:5 portrait tiles. Each tile is a
 * keyboard-operable button that opens the lightbox. Blur-up placeholders and
 * lazy loading come from `next/image` (only off-screen images are deferred).
 */
const ease = "cubic-bezier(0.22,1,0.36,1)";

export function GalleryGrid({ images, onOpen }: GalleryGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {images.map((img, idx) => (
        <li
          key={img.id}
          style={{ animation: `fadeInUp 500ms ${ease} ${Math.min(idx * 55, 380)}ms both` }}
        >
          <button
            type="button"
            onClick={() => onOpen(idx)}
            aria-label={`Open “${img.title}”`}
            className="group relative block aspect-[4/5] w-full overflow-hidden rounded-lg bg-surface-muted transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              placeholder="blur"
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-full w-full object-cover transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent)] p-3.5 text-left text-white opacity-0 transition-opacity duration-[var(--dur-base)] group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="block text-body-sm">{img.title}</span>
              <span className="block font-mono text-mono text-white/80">
                {img.meta}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
