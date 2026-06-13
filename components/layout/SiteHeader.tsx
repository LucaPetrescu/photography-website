"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";

/**
 * Sticky top navigation.
 * - On the home page it starts transparent over the full-bleed hero with light
 *   text, then swaps to a solid, blurred surface once the user scrolls past
 *   ~80vh.
 * - On every other route it is solid from the start.
 * - The current route link is marked with aria-current and an accent underline.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // `scrolled` controls the transparent↔solid appearance. Off-home it is always
  // solid; on home it tracks scroll position.
  const [scrolled, setScrolled] = useState(false);
  // Reset appearance during render when the route changes (the allowed
  // "adjusting state on prop change" pattern — no effect, no cascading render).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setScrolled(!isHome);
  }

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    // Sync once in case the page loads already scrolled (e.g. back-nav).
    // Deferred to a frame so it runs after commit, not synchronously in the
    // effect body.
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const solid = scrolled || !isHome;

  return (
    <header
      data-scrolled={solid}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-[var(--dur-base)] ease-[var(--ease-out)]",
        solid
          ? "border-border bg-[color-mix(in_srgb,var(--color-surface)_82%,transparent)] backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8 xl:px-16">
        <Link
          href="/"
          className={cn(
            "font-display text-xl font-semibold tracking-[-0.01em] transition-colors",
            solid ? "text-text" : "text-white",
          )}
        >
          Luca&nbsp;Petrescu
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => {
            const active = isActive(item.href);

            // Contact renders as an accent CTA button to match the mobile
            // drawer. The accent fill stays legible over the hero and when the
            // header is solid, so no per-state colour swap is needed.
            if (item.href === "/contact") {
              return (
                <Button
                  key={item.href}
                  href={item.href}
                  variant="primary"
                  aria-current={active ? "page" : undefined}
                  className="px-5 py-2 text-eyebrow font-medium uppercase tracking-[0.12em]"
                >
                  {item.label}
                </Button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex min-h-11 items-center text-eyebrow font-medium uppercase tracking-[0.12em] transition-colors",
                  solid
                    ? active
                      ? "text-text after:absolute after:inset-x-0 after:bottom-2 after:h-px after:bg-accent"
                      : "text-muted hover:text-text"
                    : active
                      ? "text-white after:absolute after:inset-x-0 after:bottom-2 after:h-px after:bg-accent"
                      : "text-white/80 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <MobileNav onDark={!solid} />
      </div>
    </header>
  );
}
