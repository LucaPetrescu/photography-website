import Link from "next/link";
import { AtSign, Mail } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/Container";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border py-12">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link
              href="/"
              className="text-sm font-medium text-text transition-colors hover:text-muted"
            >
              Luca Petrescu
            </Link>
            <p className="mt-2 max-w-[30ch] text-[0.8125rem] text-muted">
              {siteConfig.shortBio}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.8125rem] text-muted transition-colors hover:text-text"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              className="inline-flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-text"
              href={siteConfig.socials.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <AtSign size={18} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a
              className="inline-flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-text"
              href={`mailto:${siteConfig.email}`}
              aria-label="Email"
            >
              <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-[0.75rem] text-muted">
          <span>
            &copy; {year} {siteConfig.name}
          </span>
          <span>{siteConfig.location}</span>
        </div>
      </Container>
    </footer>
  );
}
