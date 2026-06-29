import type { StaticImageData } from "next/image";
import tamron2470 from "@/public/images/Tamron24-70.jpg";
import tamron70200 from "@/public/images/Tamron70-200.jpg";
import nikkor50 from "@/public/images/Nikkor50.jpg";

export type GearItem = {
  name: string;
  category: string;
  description?: string;
  image: StaticImageData;
  specs?: { label: string; value: string }[];
};

/**
 * Confirmed kit. Each item has a required image and NO outbound link (no
 * affiliate links). To add an item: add an entry here and a matching image in
 * `public/images/`.
 */
export const gearItems: GearItem[] = [
  {
    name: "Tamron 24-70mm f/2.8",
    category: "Lenses",
    description:
      "My most-used lens by far. Wide enough for big landscapes, long enough for tighter compositions — the one that stays mounted most days.",
    image: tamron2470,
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
    image: tamron70200,
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
    image: nikkor50,
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
