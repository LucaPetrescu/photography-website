"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";
import { MobileNav } from "@/components/layout/MobileNav";

/**
 * Minimal fixed top navigation — always solid white, no hero-transparency logic.
 * Name on left, nav links on right, clean and unobtrusive.
 */
export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-surface">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="text-sm font-medium tracking-[-0.01em] text-text transition-colors hover:text-muted"
        >
          Luca Petrescu
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "text-[0.8125rem] transition-colors",
                isActive(item.href)
                  ? "text-text"
                  : "text-muted hover:text-text",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
