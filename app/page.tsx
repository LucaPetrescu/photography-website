import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { listFolders, listPhotos, folderToLabel } from "@/lib/localImages";
import { Container } from "@/components/ui/Container";
import { Hero } from "@/components/layout/Hero";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/siteConfig";

import heroImage from "@/public/images/Luca_Petrescu.jpg";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.brand} — Private Sessions, Events & Personalized Photography`,
  },
  description: siteConfig.tagline,
};

export default async function OverviewPage() {
  const folders = listFolders();
  const photosByFolder = await Promise.all(
    folders.map((folder) => listPhotos(folder)),
  );

  const projects = folders
    .map((folder, i) => ({
      slug: folder,
      label: folderToLabel(folder),
      cover: photosByFolder[i][0],
      count: photosByFolder[i].length,
    }))
    .filter((p) => p.cover);

  return (
    <main id="main">
      <Hero
        image={heroImage}
        imageAlt="Luca Petrescu - Photographer"
        eyebrow="Private Sessions · Events · Personalized Shoots"
        headline="Luca Petrescu"
        lead="Photography, direct — based in Bucharest, Romania."
      />

      {/* Centered text block — introduces the work, sits directly on the void. */}
      <Container className="py-24 md:py-32">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <h2 className="font-display text-h1 font-normal text-text">
            About My Work
          </h2>
          <p className="mt-6 text-body-lg text-muted">
            I shoot private sessions, events, and personalized commissions —
            real moments, handled directly and without a studio in between.
            Every shoot is planned around the people in it, not a template.
          </p>
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 text-[0.875rem] text-text transition-opacity hover:opacity-70"
          >
            Learn More About Me
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </Container>

      {/* Featured projects — full-bleed 2-column grid, hover reveals title + count. */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {projects.map((project) => (
          <Reveal key={project.slug} className="group">
            <Link
              href={`/gallery/${project.slug}`}
              className="relative block aspect-[3/2] w-full overflow-hidden rounded-lg"
              aria-label={`View ${project.label} — ${project.count} photograph${project.count === 1 ? "" : "s"}`}
            >
              <Image
                src={project.cover.url}
                alt=""
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100"
              />
              <div className="absolute bottom-6 left-6 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100">
                <p className="font-display text-h3 font-normal text-white">
                  {project.label}
                </p>
                <p className="mt-1 text-[0.875rem] text-muted">
                  {project.count}&nbsp;
                  {project.count === 1 ? "photograph" : "photographs"}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Container className="py-16 text-center md:py-24">
        <Link
          href="/gallery"
          className="group inline-flex items-center gap-2 text-[0.875rem] text-text transition-opacity hover:opacity-70"
        >
          View All Projects
          <ArrowRight
            size={16}
            strokeWidth={1.5}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </Container>
    </main>
  );
}
