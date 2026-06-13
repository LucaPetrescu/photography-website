"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/lib/gallery";

type LightboxProps = {
  images: GalleryImage[];
  /** Index into `images`, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

/**
 * Full-screen image viewer (Radix Dialog). Radix provides the focus trap,
 * scroll-lock, and focus return to the trigger. We add ←/→ keyboard navigation
 * and an accessible caption with EXIF metadata.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: LightboxProps) {
  const open = index !== null;
  const current = index !== null ? images[index] : null;

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, goPrev, goNext]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-[2px] data-[state=open]:animate-[fadeIn_var(--dur-slow)_var(--ease-out)]" />
        <Dialog.Content
          aria-label="Image viewer"
          aria-roledescription="image viewer"
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 focus:outline-none"
          onOpenAutoFocus={(e) => {
            // Keep focus on the dialog container rather than the first control,
            // so the close button doesn't steal it on open.
            e.preventDefault();
            (e.currentTarget as HTMLElement).focus();
          }}
          tabIndex={-1}
        >
          {current && index !== null ? (
            <>
              <Dialog.Title className="sr-only">{current.title}</Dialog.Title>
              <Dialog.Description className="sr-only">
                {current.alt}
              </Dialog.Description>

              <Dialog.Close
                aria-label="Close viewer"
                className="fixed right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X size={22} strokeWidth={2} aria-hidden="true" />
              </Dialog.Close>

              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous image"
                    className="fixed left-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:left-8"
                  >
                    <ChevronLeft size={24} strokeWidth={2} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next image"
                    className="fixed right-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:right-8"
                  >
                    <ChevronRight
                      size={24}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </button>
                </>
              ) : null}

              <figure className="flex max-w-[92vw] flex-col items-center gap-4">
                <Image
                  src={current.src}
                  alt={current.alt}
                  placeholder="blur"
                  sizes="92vw"
                  className="max-h-[80vh] w-auto rounded-lg object-contain shadow-[var(--shadow-lg)]"
                />
                <figcaption className="flex max-w-[60ch] flex-col gap-1 text-center text-white">
                  <span className="font-display text-[1.125rem]">
                    {current.title}
                  </span>
                  <span className="font-mono text-mono text-white/70">
                    {current.meta}
                    {current.exif ? ` · ${current.exif}` : ""}
                  </span>
                </figcaption>
              </figure>

              <span
                aria-hidden="true"
                className="fixed bottom-5 left-1/2 -translate-x-1/2 font-mono text-mono text-white/70"
              >
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>
            </>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
