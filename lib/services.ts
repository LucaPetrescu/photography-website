import type { LucideIcon } from "lucide-react";
import { User, CalendarDays, Sparkles } from "lucide-react";

export type Service = {
  name: string;
  icon: LucideIcon;
  description: string;
  details: string[];
};

export const services: Service[] = [
  {
    name: "Private Session",
    icon: User,
    description:
      "One-on-one portrait sessions — solo, couples, or family. Natural light, relaxed pacing, and a set of images that actually look like you.",
    details: [
      "Individual, couple, or family portraits",
      "1–2 hour session, on location or studio",
      "Edited digital gallery delivered within a week",
    ],
  },
  {
    name: "Events",
    icon: CalendarDays,
    description:
      "Weddings, corporate events, birthdays, and everything in between. Documentary-style coverage that captures the moments you'd otherwise miss.",
    details: [
      "Full or half-day coverage",
      "Candid and posed moments",
      "Quick-turnaround preview gallery",
    ],
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
  },
];
