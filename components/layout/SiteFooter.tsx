import Link from "next/link";
import { AtSign, Mail } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/Container";

const year = new Date().getFullYear();

/** Persistent site footer: wordmark + bio, nav repeat, social/contact links. */
export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="font-display text-xl font-semibold tracking-[-0.01em] text-text"
            >
              Luca&nbsp;Petrescu
            </Link>
            <p className="mt-3 max-w-[34ch] text-body-sm text-muted">
              {siteConfig.tagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-4 text-eyebrow font-medium uppercase tracking-[0.12em] text-muted">
              Explore
            </h2>
            <ul className="grid gap-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-text transition-colors hover:text-accent"
                  >
                    {item.label === "Gear" ? "Gear I use" : item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-eyebrow font-medium uppercase tracking-[0.12em] text-muted">
              Elsewhere
            </h2>
            <div className="flex gap-2">
              <a
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-muted hover:text-accent"
                href={siteConfig.socials.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <AtSign size={20} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-muted hover:text-accent"
                href={`mailto:${siteConfig.email}`}
                aria-label="Email"
              >
                <Mail size={20} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-body-sm text-muted">
          <span>
            © {year} {siteConfig.name} · Built with care
          </span>
          <span className="font-mono text-mono">{siteConfig.location}</span>
        </div>
      </Container>
    </footer>
  );
}
