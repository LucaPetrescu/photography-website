"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

/**
 * Hamburger trigger + right-side slide-in drawer (Radix Dialog).
 * Radix handles focus trapping, Esc-to-close, scroll-lock, and focus return.
 */
export function MobileNav({ onDark = false }: { onDark?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Primary links excluding Contact (rendered as an accent CTA at the bottom).
  const links = siteConfig.nav.filter((item) => item.href !== "/contact");

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open navigation menu"
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center md:hidden",
          onDark ? "text-white" : "text-text",
        )}
      >
        <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm data-[state=open]:animate-[fadeIn_var(--dur-base)_var(--ease-out)]" />
        <Dialog.Content
          aria-label="Site navigation"
          className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col bg-surface p-6 shadow-[var(--shadow-lg)] focus:outline-none data-[state=open]:animate-[slideInRight_var(--dur-base)_var(--ease-out)]"
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-xl font-semibold tracking-[-0.01em] text-text">
              Luca&nbsp;Petrescu
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close navigation menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted transition-colors hover:text-text"
            >
              <X size={22} strokeWidth={1.75} aria-hidden="true" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Main site navigation links.
          </Dialog.Description>

          <nav className="mt-8 flex flex-1 flex-col gap-2" aria-label="Mobile">
            {links.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "inline-flex min-h-11 items-center font-display text-h3 transition-colors",
                    active ? "text-accent" : "text-text hover:text-accent",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Button
            href="/contact"
            variant="primary"
            className="mt-6 w-full"
            onClick={() => setOpen(false)}
          >
            Get in touch
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
