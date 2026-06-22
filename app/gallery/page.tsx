import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProjectCategories } from "@/lib/gallery";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photography gallery by Luca Petrescu — landscape, portrait, coast, mountains, and weather across the Pacific Northwest.",
};

export default function GalleryPage() {
  const gallery = getProjectCategories();

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
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i * 60}>
              <Link
                href={`/gallery/${project.slug}`}
                className="group block"
                aria-label={`View ${project.category} — ${project.count} photograph${project.count === 1 ? "" : "s"}`}
              >
                <div className="overflow-hidden bg-surface-muted">
                  <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    style={{ width: "100%", height: "auto", display: "block" }}
                    className="transition-opacity duration-[var(--dur-base)] group-hover:opacity-85"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <h2 className="text-sm font-medium text-text">
                    {project.category}
                  </h2>
                  <span className="text-[0.75rem] text-muted">
                    {project.count}&nbsp;
                    {project.count === 1 ? "photo" : "photos"}
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
