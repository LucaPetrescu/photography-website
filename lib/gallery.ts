import type { StaticImageData } from "next/image";

import ridgeline from "@/public/images/gallery/ridgeline.jpg";
import tideline from "@/public/images/gallery/tideline.jpg";
import fogField from "@/public/images/gallery/fog-field.jpg";
import harborPortrait from "@/public/images/gallery/harbor-portrait.jpg";
import snowline from "@/public/images/gallery/snowline.jpg";
import lastFerry from "@/public/images/gallery/last-ferry.jpg";
import driftwood from "@/public/images/gallery/driftwood.jpg";
import quietTrail from "@/public/images/gallery/quiet-trail.jpg";
import riverBend from "@/public/images/gallery/river-bend.jpg";
import windowLight from "@/public/images/gallery/window-light.jpg";
import alpineLake from "@/public/images/gallery/alpine-lake.jpg";
import duneGrass from "@/public/images/gallery/dune-grass.jpg";

/**
 * Gallery taxonomy. "All" is a synthetic filter handled in the UI, so it is not
 * a category a photo can be tagged with.
 */
export const GALLERY_CATEGORIES = [
  "Landscape",
  "Portrait",
  "Coast",
  "Mountains",
  "Fog & weather",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export type GalleryImage = {
  /** Stable id, also used as the lightbox key. */
  id: string;
  src: StaticImageData;
  /** Descriptive alt text (never "image"). */
  alt: string;
  /** Display title shown in captions. */
  title: string;
  /** Categories this photo belongs to (used by the filter chips). */
  categories: GalleryCategory[];
  /** Short location/date line shown in the caption. */
  meta: string;
  /** Optional EXIF-style metadata shown in the lightbox caption. */
  exif?: string;
};

/**
 * The gallery manifest. To add a photo: drop a 4:5 JPEG into
 * `public/images/gallery/` and add one entry here. Nothing else to wire.
 */
export const galleryImages: GalleryImage[] = [
  {
    id: "ridgeline",
    src: ridgeline,
    alt: "A mountain ridgeline catching the first warm light of dawn above a valley of shadow.",
    title: "Ridgeline, first light",
    categories: ["Landscape", "Mountains"],
    meta: "Cascades · 2025",
    exif: "Nikon D750 · 70-200mm · f/8 · 1/250s",
  },
  {
    id: "tideline",
    src: tideline,
    alt: "Long-exposure of the outgoing tide smoothing into mist at dusk on the Oregon coast.",
    title: "Tideline",
    categories: ["Landscape", "Coast"],
    meta: "Oregon coast · 2025",
    exif: "Nikon D750 · 24-70mm · f/11 · 20s",
  },
  {
    id: "fog-field",
    src: fogField,
    alt: "Low morning fog drifting across an open field with a lone tree dissolving into white.",
    title: "Fog field",
    categories: ["Landscape", "Fog & weather"],
    meta: "Willamette · 2024",
    exif: "Nikon D750 · 50mm · f/4 · 1/125s",
  },
  {
    id: "harbor-portrait",
    src: harborPortrait,
    alt: "A portrait of a woman at a harbor, looking off-camera in soft overcast light.",
    title: "Mara, harbor",
    categories: ["Portrait", "Coast"],
    meta: "Portrait · 2025",
    exif: "Nikon D750 · 50mm · f/1.8 · 1/500s",
  },
  {
    id: "snowline",
    src: snowline,
    alt: "The snowline of a mountain meeting bare rock under a pale winter sky.",
    title: "Snowline",
    categories: ["Landscape", "Mountains"],
    meta: "Rainier · 2024",
    exif: "Nikon D750 · 70-200mm · f/9 · 1/400s",
  },
  {
    id: "last-ferry",
    src: lastFerry,
    alt: "A ferry crossing calm water at dusk with distant lights reflecting on the surface.",
    title: "Last ferry",
    categories: ["Landscape", "Coast"],
    meta: "Puget Sound · 2025",
    exif: "Nikon D750 · 24-70mm · f/5.6 · 1/60s",
  },
  {
    id: "driftwood",
    src: driftwood,
    alt: "Weathered driftwood logs stacked on a grey beach beneath a heavy sky.",
    title: "Driftwood",
    categories: ["Coast"],
    meta: "Cannon Beach · 2024",
    exif: "Nikon D750 · 24-70mm · f/11 · 1/200s",
  },
  {
    id: "quiet-trail",
    src: quietTrail,
    alt: "A narrow forest trail disappearing into mist between tall dark trees.",
    title: "Quiet trail",
    categories: ["Landscape", "Fog & weather"],
    meta: "Columbia Gorge · 2025",
    exif: "Nikon D750 · 50mm · f/2.8 · 1/160s",
  },
  {
    id: "river-bend",
    src: riverBend,
    alt: "A wide river bend curving through high desert canyon in low evening light.",
    title: "River bend",
    categories: ["Landscape"],
    meta: "Deschutes · 2023",
    exif: "Nikon D750 · 24-70mm · f/8 · 1/250s",
  },
  {
    id: "window-light",
    src: windowLight,
    alt: "A portrait lit by soft directional window light, the subject in quiet thought.",
    title: "Window light",
    categories: ["Portrait"],
    meta: "Portrait · 2024",
    exif: "Nikon D750 · 50mm · f/1.8 · 1/200s",
  },
  {
    id: "alpine-lake",
    src: alpineLake,
    alt: "A still alpine lake mirroring jagged peaks under a clear high-altitude sky.",
    title: "Alpine lake",
    categories: ["Landscape", "Mountains"],
    meta: "North Cascades · 2025",
    exif: "Nikon D750 · 24-70mm · f/11 · 1/125s",
  },
  {
    id: "dune-grass",
    src: duneGrass,
    alt: "Wind-bent dune grass tracing arcs in the sand on an empty stretch of coast.",
    title: "Dune grass",
    categories: ["Coast"],
    meta: "Pacific City · 2024",
    exif: "Nikon D750 · 70-200mm · f/8 · 1/640s",
  },
];

/** First N images, for the home "selected work" preview strip. */
export function getFeaturedImages(count = 6): GalleryImage[] {
  return galleryImages.slice(0, count);
}
