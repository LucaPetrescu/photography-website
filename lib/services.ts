import type { LucideIcon } from "lucide-react";
import { User, CalendarDays, Sparkles } from "lucide-react";

export type Service = {
  name: string;
  icon: LucideIcon;
  description: string;
  details: string[];
  /** Price block heading label — e.g. "Session rate", "Starting from". */
  priceTag?: string;
  /** Amount shown in the price block — e.g. "€250", "from €600", "Custom quote". */
  priceLabel: string;
  /** Optional line under the amount — e.g. "1–2 hours · photos within a week". */
  priceMeta?: string;
};

export const services: Service[] = [
  {
    name: "Private Session",
    icon: User,
    description:
      "One-on-one portrait sessions — solo, couples, or family. Natural light, relaxed pacing, and a set of images that actually look like you.",
    details: [
      "Individual, couple, or family portraits",
      "On location or studio",
    ],
    priceTag: "Session rate",
    priceLabel: "500 RON",
    priceMeta: "1–2 hours · photos within a week",
  },
  {
    name: "Events",
    icon: CalendarDays,
    description:
      "Weddings, corporate events, birthdays, and everything in between. Documentary-style coverage that captures the moments you'd otherwise miss.",
    details: [
      "Candid and posed moments",
      "Quick-turnaround preview gallery (also within a week)",
    ],
    priceTag: "Starting from",
    priceLabel: "3000 RON",
    priceMeta: "Half-day · full-day options available",
  },
  {
    name: "Personalized Offer",
    icon: Sparkles,
    description:
      "Not sure which category fits? Tell me what you have in mind and I'll put together a package built around your budget, timeline, and location.",
    details: [
      "Custom scope and pricing",
      "Multi-day or recurring shoots welcome",
      "A quick call or email to plan it out",
    ],
    priceTag: "Pricing",
    priceLabel: "Custom quote",
    priceMeta: "Scoped to your brief",
  },
];
