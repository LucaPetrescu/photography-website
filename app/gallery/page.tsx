import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { listPhotos } from "@/lib/B2bucket";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photography gallery by Luca Petrescu — landscape, portrait, coast, mountains, and weather across the Pacific Northwest.",
};

export default async function GalleryPage() {
  const [peopleUrls, studioUrls] = await Promise.all([
    listPhotos("people"),
    listPhotos("studio"),
  ]);

  const series = [
    { slug: "people", label: "People", cover: peopleUrls[0], count: peopleUrls.length },
    { slug: "studio", label: "Studio", cover: studioUrls[0], count: studioUrls.length },
  ].filter((s) => s.cover);

  return (
    <main id="main" className="pt-14">
      <Container className="pb-4 pt-12">
        <p className="text-[0.75rem] uppercase tracking-[0.1em] text-muted">
          Gallery
        </p>
        <h1 className="mt-4 font-display text-display font-semibold">
          The work, by series.
        </h1>
      </Container>

      <Container className="pb-16 pt-8 md:pb-24">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {series.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 60}>
              <Link
                href={`/gallery/${s.slug}`}
                className="group block"
                aria-label={`View ${s.label} — ${s.count} photograph${s.count === 1 ? "" : "s"}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
                  <Image
                    src={s.cover}
                    alt={`${s.label} series cover`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-opacity duration-[var(--dur-base)] group-hover:opacity-85"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <h2 className="text-sm font-medium text-text">{s.label}</h2>
                  <span className="text-[0.75rem] text-muted">
                    {s.count}&nbsp;{s.count === 1 ? "photo" : "photos"}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </main>
  );
}
