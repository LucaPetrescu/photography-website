"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";

/**
 * Hamburger trigger + right-side slide-in drawer (Radix Dialog).
 * Radix handles focus trapping, Esc-to-close, scroll-lock, and focus return.
 */
export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const links = siteConfig.nav.filter((item) => item.href !== "/contact");

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open navigation menu"
        className="inline-flex h-11 w-11 items-center justify-center text-text md:hidden"
      >
        <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/30 data-[state=open]:animate-[fadeIn_var(--dur-base)_var(--ease-out)]" />
        <Dialog.Content
          aria-label="Site navigation"
          className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-xs flex-col bg-surface p-6 shadow-[var(--shadow-lg)] focus:outline-none data-[state=open]:animate-[slideInRight_var(--dur-base)_var(--ease-out)]"
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-sm font-medium text-text">
              Luca Petrescu
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close navigation menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-muted transition-colors hover:text-text"
            >
              <X size={20} strokeWidth={1.5} aria-hidden="true" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Main site navigation links.
          </Dialog.Description>

          <nav className="mt-10 flex flex-1 flex-col gap-1" aria-label="Mobile">
            {links.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "inline-flex min-h-11 items-center text-lg font-medium transition-colors",
                    active ? "text-text" : "text-muted hover:text-text",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex h-12 w-full items-center justify-center bg-text text-sm font-medium text-surface transition-colors hover:bg-accent-hover"
          >
            Contact
          </Link>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
