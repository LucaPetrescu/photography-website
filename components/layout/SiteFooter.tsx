import Link from "next/link";
import { AtSign, Mail } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/Container";

const year = new Date().getFullYear();

/** Minimal, centered footer sitting on the void — no bio blurb, no card. */
export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border-subtle py-8">
      <Container className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <span className="text-[0.75rem] text-muted">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </span>

        <nav
          aria-label="Footer"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.75rem] uppercase tracking-[0.15em] text-muted transition-colors hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            className="inline-flex h-5 w-5 items-center justify-center text-muted transition-colors hover:text-text"
            href={siteConfig.socials.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <AtSign size={20} strokeWidth={1.5} aria-hidden="true" />
          </a>
          <a
            className="inline-flex h-5 w-5 items-center justify-center text-muted transition-colors hover:text-text"
            href={`mailto:${siteConfig.email}`}
            aria-label="Email"
          >
            <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
