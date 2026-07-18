export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Luca Petrescu",
  brand: "Luca Petrescu Photography",
  tagline:
    "Portrait, events and travel photographer from Bucharest, Romania. Available for commissions in all of Europe.",
  shortBio: "Portrait, events and travel photographer from Bucharest Romania.",
  location: "Bucharest, Romania",
  email: "lucapetrescufotograf@gmail.com",
  phone: "+40725189163",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lucapetrescu.com",
  nav: [
    { label: "Overview", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "About Me", href: "/about" },
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
