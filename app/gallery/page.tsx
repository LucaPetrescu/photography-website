import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { GalleryClient } from "@/components/gallery/GalleryClient";
import { galleryImages } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Selected landscape and portrait photographs by Luca Petrescu — coast, mountains, fog, and weather across the Pacific Northwest.",
};

export default function GalleryPage() {
  return (
    <div className="pt-[72px]">
      <Container as="section" className="pb-6 pt-14">
        <p className="text-eyebrow font-medium uppercase tracking-[0.14em] text-accent">
          Gallery
        </p>
        <h1 className="mt-2 font-display text-display font-semibold">
          The work
        </h1>
        <p className="mt-4 max-w-[48ch] text-body-lg text-muted">
          Landscapes and portraits, mostly made before breakfast. Select any
          frame to view it larger.
        </p>
      </Container>

      <Container className="pb-16 md:pb-24">
        <GalleryClient images={galleryImages} />
      </Container>
    </div>
  );
}
