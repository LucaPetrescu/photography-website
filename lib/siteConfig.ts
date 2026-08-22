export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Luca Petrescu",
  brand: "Luca Petrescu Photography",
  tagline:
    "Private sessions, events, and personalized shoots — direct with Luca, based in Bucharest, Romania.",
  shortBio:
    "Private sessions, events, and personalized shoots from Bucharest, Romania.",
  location: "Bucharest, Romania",
  email: "lucapetrescufotograf@gmail.com",
  phone: "+40 725 189 163",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lucapetrescu.com",
  nav: [
    { label: "Overview", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "Services", href: "/services" },
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
