"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

/** "Gallery" and "Services" render together as one dropdown in the desktop nav. */
const GALLERY_GROUP_HREFS = ["/gallery", "/services"];

/**
 * Fixed top navigation — transparent over the void by default, fading to
 * surface-dark with a hairline border once the page scrolls (The Void Rule
 * still holds: this is a scroll-state chrome change, not a light section).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const galleryGroup = siteConfig.nav.filter((item) =>
    GALLERY_GROUP_HREFS.includes(item.href),
  );
  const galleryGroupActive = GALLERY_GROUP_HREFS.some(isActive);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--dur-base)] ease-[var(--ease-out)]",
        scrolled
          ? "border-b border-border bg-surface"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-text transition-colors hover:text-muted"
        >
          Luca Petrescu
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => {
            // "Services" renders inside the Gallery dropdown, not as its own link.
            if (item.href === "/services") return null;

            if (item.href === "/gallery") {
              return (
                <DropdownMenu.Root key={item.href}>
                  <DropdownMenu.Trigger
                    className={cn(
                      "flex items-center gap-1 text-[0.75rem] uppercase tracking-[0.15em] outline-none transition-colors",
                      galleryGroupActive
                        ? "text-text"
                        : "text-muted hover:text-text",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      align="start"
                      sideOffset={14}
                      className="z-[60] min-w-[10rem] border border-border bg-surface py-1.5 shadow-[var(--shadow-sm)] data-[state=open]:animate-[fadeIn_var(--dur-fast)_var(--ease-out)]"
                    >
                      {galleryGroup.map((subItem) => (
                        <DropdownMenu.Item key={subItem.href} asChild>
                          <Link
                            href={subItem.href}
                            aria-current={
                              isActive(subItem.href) ? "page" : undefined
                            }
                            className={cn(
                              "block px-4 py-2 text-[0.75rem] uppercase tracking-[0.15em] outline-none transition-colors",
                              isActive(subItem.href)
                                ? "text-text"
                                : "text-muted hover:text-text",
                            )}
                          >
                            {subItem.label}
                          </Link>
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "text-[0.75rem] uppercase tracking-[0.15em] transition-colors",
                  isActive(item.href)
                    ? "text-text"
                    : "text-muted hover:text-text",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <ThemeToggle className="inline-flex h-5 w-5 items-center justify-center text-muted transition-colors hover:text-text" />
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
