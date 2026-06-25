import type { StaticImageData } from "next/image";

export type GearItem = {
  name: string;
  category: string;
  description?: string;
  /** Static image import — gives width/height/blurDataURL for free. */
  image: StaticImageData;
  /** Optional EXIF-style spec rows (label/value), rendered in mono. */
  specs?: { label: string; value: string }[];
};

/** Temporary placeholder until real gear photos are wired up (B2 bucket). */
const PLACEHOLDER: StaticImageData = {
  src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'%3E%3Crect width='100%25' height='100%25' fill='%23e5e5e5'/%3E%3C/svg%3E",
  width: 1200,
  height: 800,
  blurDataURL:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'%3E%3Crect width='100%25' height='100%25' fill='%23d4d4d4'/%3E%3C/svg%3E",
};

/**
 * Confirmed kit. Each item has a required image and NO outbound link (no
 * affiliate links). To add an item: add an entry here and a matching image in
 * `public/images/gear/`.
 */
export const gearItems: GearItem[] = [
  {
    name: "Nikon D750",
    category: "Camera Body",
    description:
      "My everyday body. The full-frame sensor holds shadow detail beautifully at dawn, and the weather sealing has survived a lot of coastal drizzle.",
    image: PLACEHOLDER,
    specs: [
      { label: "Sensor", value: "24MP full-frame" },
      { label: "Weight", value: "750 g" },
    ],
  },
  {
    name: "Tamron 24-70mm f/2.8",
    category: "Lenses",
    description:
      "My most-used lens by far. Wide enough for big landscapes, long enough for tighter compositions — the one that stays mounted most days.",
    image: PLACEHOLDER,
    specs: [
      { label: "Focal", value: "24-70mm" },
      { label: "Aperture", value: "f/2.8" },
    ],
  },
  {
    name: "Tamron 70-200mm f/2.8",
    category: "Lenses",
    description:
      "For compressing ridgelines and reaching distant weather. Heavy, but the reach and sharpness earn their place in the bag.",
    image: PLACEHOLDER,
    specs: [
      { label: "Focal", value: "70-200mm" },
      { label: "Aperture", value: "f/2.8" },
    ],
  },
  {
    name: "Nikkor 50mm f/1.8G",
    category: "Lenses",
    description:
      "Light, sharp, and kind to faces. The prime I reach for with portraits when I want a quiet background and a natural field of view.",
    image: PLACEHOLDER,
    specs: [
      { label: "Focal", value: "50mm" },
      { label: "Aperture", value: "f/1.8" },
    ],
  },
];

export type GearGroup = {
  category: string;
  items: GearItem[];
};

/** Group items by category, preserving first-seen category order. */
export function getGearGroups(items: GearItem[] = gearItems): GearGroup[] {
  const order: string[] = [];
  const map = new Map<string, GearItem[]>();
  for (const item of items) {
    if (!map.has(item.category)) {
      map.set(item.category, []);
      order.push(item.category);
    }
    map.get(item.category)!.push(item);
  }
  return order.map((category) => ({ category, items: map.get(category)! }));
}
