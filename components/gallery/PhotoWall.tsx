import Image from "next/image";
import type { GalleryImage } from "@/lib/gallery";

type PhotoWallProps = {
  images: GalleryImage[];
  onOpen: (index: number) => void;
};

const ease = "cubic-bezier(0.16,1,0.3,1)";

/**
 * Masonry photo wall using CSS columns.
 * Images display at their natural aspect ratios, flowing column-by-column.
 * Each tile is a keyboard-operable button that opens the lightbox.
 */
export function PhotoWall({ images, onOpen }: PhotoWallProps) {
  return (
    <div className="columns-2 lg:columns-3" style={{ columnGap: "2px" }}>
      {images.map((img, idx) => (
        <button
          key={img.id}
          type="button"
          onClick={() => onOpen(idx)}
          aria-label={`Open "${img.title}"`}
          className="group block w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--color-focus)]"
          style={{
            breakInside: "avoid",
            display: "block",
            marginBottom: "2px",
            animation: `fadeInUp 700ms ${ease} ${Math.min(idx * 50, 400)}ms both`,
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            placeholder="blur"
            sizes="(min-width: 1024px) 33vw, 50vw"
            style={{ width: "100%", height: "auto", display: "block" }}
            className="transition-opacity duration-[var(--dur-base)] group-hover:opacity-80"
          />
        </button>
      ))}
    </div>
  );
}
