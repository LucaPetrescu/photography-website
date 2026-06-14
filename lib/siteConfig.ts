export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Luca Petrescu",
  brand: "Luca Petrescu Photography",
  tagline:
    "Landscape and portrait photography from the Pacific Northwest. Available for commissions worldwide.",
  shortBio: "Landscape and portrait photography from the Pacific Northwest.",
  location: "Pacific Northwest, USA",
  email: "hello@lucapetrescu.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lucapetrescu.com",
  nav: [
    { label: "Overview", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Info", href: "/info" },
    { label: "Gear I Use", href: "/gear" },
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
