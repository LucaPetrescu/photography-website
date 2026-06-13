/**
 * Single source of truth for site-wide identity, navigation, and contact
 * details. Imported by the layout, header, footer, metadata, and SEO files.
 */

export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Luca Petrescu",
  /** Used in metadata title templates and OG. */
  brand: "Luca Petrescu Photography",
  tagline:
    "Landscape and portrait photography from the Pacific Northwest. Available for commissions worldwide.",
  shortBio: "Landscape and portrait photography from the Pacific Northwest.",
  location: "Pacific Northwest, USA",
  /** Public-facing contact address (safe to expose; used in mailto links). */
  email: "hello@lucapetrescu.com",
  /** Canonical site URL. Override with NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lucapetrescu.com",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Gear", href: "/gear" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
  socials: {
    instagram: {
      label: "@luca.petrescu",
      href: "https://instagram.com/luca.petrescu",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
