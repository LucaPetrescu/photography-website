import type { StaticImageData } from "next/image";

export const GALLERY_CATEGORIES = [
  "Travel",
  "Portrait",
  "Studio Jobs",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export type GalleryImage = {
  id: string;
  src: StaticImageData;
  alt: string;
  title: string;
  categories: GalleryCategory[];
  meta: string;
  exif?: string;
};

export const galleryImages: GalleryImage[] = [];

export function getFeaturedImages(count = 6): GalleryImage[] {
  return galleryImages.slice(0, count);
}

export function categoryToSlug(category: GalleryCategory): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getCategoryFromSlug(slug: string): GalleryCategory | undefined {
  return GALLERY_CATEGORIES.find((cat) => categoryToSlug(cat) === slug);
}

export function getImagesByCategory(category: GalleryCategory): GalleryImage[] {
  return galleryImages.filter((img) => img.categories.includes(category));
}

export type ProjectCategory = {
  category: GalleryCategory;
  slug: string;
  count: number;
  cover: GalleryImage;
};

export function getProjectCategories(): ProjectCategory[] {
  return GALLERY_CATEGORIES.flatMap((cat) => {
    const photos = galleryImages.filter((img) => img.categories.includes(cat));
    if (photos.length === 0) return [];
    return [
      {
        category: cat,
        slug: categoryToSlug(cat),
        count: photos.length,
        cover: photos[0],
      },
    ];
  });
}
