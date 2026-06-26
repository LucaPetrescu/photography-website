"use client";

import { useCallback, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type B2LightboxProps = {
  urls: string[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
};

export function B2Lightbox({ urls, index, onClose, onNavigate }: B2LightboxProps) {
  const open = index !== null;
  const url = index !== null ? urls[index] : null;

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + urls.length) % urls.length);
  }, [index, urls.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % urls.length);
  }, [index, urls.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, goPrev, goNext]);

  return (
    <Dialog.Root open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-[2px] data-[state=open]:animate-[fadeIn_var(--dur-slow)_var(--ease-out)]" />
        <Dialog.Content
          aria-label="Image viewer"
          aria-roledescription="image viewer"
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 focus:outline-none"
          onOpenAutoFocus={(e) => { e.preventDefault(); (e.currentTarget as HTMLElement).focus(); }}
          tabIndex={-1}
        >
          {url && index !== null ? (
            <>
              <Dialog.Title className="sr-only">Photograph {index + 1}</Dialog.Title>
              <Dialog.Description className="sr-only">Full-size photograph</Dialog.Description>

              <Dialog.Close
                aria-label="Close viewer"
                className="fixed right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X size={22} strokeWidth={2} aria-hidden="true" />
              </Dialog.Close>

              {urls.length > 1 && (
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
                    <ChevronRight size={24} strokeWidth={2} aria-hidden="true" />
                  </button>
                </>
              )}

              <figure className="flex max-w-[92vw] flex-col items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Photograph ${index + 1}`}
                  className="max-h-[80vh] w-auto rounded-lg object-contain shadow-[var(--shadow-lg)]"
                />
              </figure>

              <span
                aria-hidden="true"
                className="fixed bottom-5 left-1/2 -translate-x-1/2 font-mono text-mono text-white/70"
              >
                {String(index + 1).padStart(2, "0")} / {String(urls.length).padStart(2, "0")}
              </span>
            </>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
