"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";
import { MobileNav } from "@/components/layout/MobileNav";

/** "Gallery" and "Services" render together as one dropdown in the desktop nav. */
const GALLERY_GROUP_HREFS = ["/gallery", "/services"];

/**
 * Minimal fixed top navigation — always solid white, no hero-transparency logic.
 * Name on left, nav links on right, clean and unobtrusive.
 */
export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const galleryGroup = siteConfig.nav.filter((item) =>
    GALLERY_GROUP_HREFS.includes(item.href),
  );
  const galleryGroupActive = GALLERY_GROUP_HREFS.some(isActive);

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
          {siteConfig.nav.map((item) => {
            // "Services" renders inside the Gallery dropdown, not as its own link.
            if (item.href === "/services") return null;

            if (item.href === "/gallery") {
              return (
                <DropdownMenu.Root key={item.href}>
                  <DropdownMenu.Trigger
                    className={cn(
                      "flex items-center gap-1 text-[0.8125rem] outline-none transition-colors",
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
                      className="z-[60] min-w-[10rem] border border-border bg-surface py-1.5 shadow-[var(--shadow-lg)] data-[state=open]:animate-[fadeIn_var(--dur-fast)_var(--ease-out)]"
                    >
                      {galleryGroup.map((subItem) => (
                        <DropdownMenu.Item key={subItem.href} asChild>
                          <Link
                            href={subItem.href}
                            aria-current={
                              isActive(subItem.href) ? "page" : undefined
                            }
                            className={cn(
                              "block px-4 py-2 text-[0.8125rem] outline-none transition-colors",
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
                  "text-[0.8125rem] transition-colors",
                  isActive(item.href)
                    ? "text-text"
                    : "text-muted hover:text-text",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
