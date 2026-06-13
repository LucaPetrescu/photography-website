import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import heroImage from "@/public/images/hero/hero.jpg";
import featureImage from "@/public/images/gallery/fog-field.jpg";
import { Hero } from "@/components/layout/Hero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedImages } from "@/lib/gallery";

export default function HomePage() {
  const featured = getFeaturedImages(6);

  return (
    <>
      <Hero
        image={heroImage}
        imageAlt="Misty mountain ridgeline at dawn over a still valley."
        eyebrow="Landscape & Portrait — Pacific Northwest"
        headline="Light, patiently waited for."
        lead="I photograph quiet places at the edge of the day — the half-hour when the land turns gold and goes still."
      />

      {/* Editorial feature split */}
      <Container as="section" className="py-16 md:py-28">
        <Reveal className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="aspect-[4/5] overflow-hidden rounded-lg bg-surface-muted">
            <Image
              src={featureImage}
              alt="Low fog drifting across an open field at first light."
              placeholder="blur"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-eyebrow font-medium uppercase tracking-[0.14em] text-accent">
              The approach
            </p>
            <h2 className="mb-4 mt-3 font-display text-h2 font-semibold">
              A small kit, long walks, and a great deal of standing still.
            </h2>
            <p className="mb-6 max-w-[40ch] text-body-lg text-muted">
              No drones, no staging. Just early starts and the discipline to
              wait for a scene to become itself. Most frames here took more time
              to find than to take.
            </p>
            <Button href="/about" variant="ghost" className="group">
              Read the story
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-[var(--dur-base)] group-hover:translate-x-0.5"
              />
            </Button>
          </div>
        </Reveal>
      </Container>

      {/* Selected work preview */}
      <Container
        as="section"
        aria-labelledby="selected-work"
        className="pb-16 md:pb-28"
      >
        <Reveal className="mb-10">
          <SectionHeading
            eyebrow="Selected work"
            title="A few that stayed with me"
            id="selected-work"
          />
        </Reveal>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {featured.map((img, i) => (
            <Reveal as="li" key={img.id} delay={i * 80}>
              <Link
                href="/gallery"
                className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-surface-muted transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
                aria-label={`View "${img.title}" in the gallery`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  placeholder="blur"
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="h-full w-full object-cover transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent)] p-4 text-left text-white opacity-0 transition-opacity duration-[var(--dur-base)] group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="block text-body-sm">{img.title}</span>
                  <span className="block font-mono text-mono text-white/80">
                    {img.meta}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-10 flex justify-center">
          <Button href="/gallery" variant="ghost" className="group">
            See the full gallery
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-[var(--dur-base)] group-hover:translate-x-0.5"
            />
          </Button>
        </Reveal>
      </Container>

      {/* CTA band — plain white with top border for a cleaner, more minimal feel */}
      <section className="border-t border-border py-20 text-center md:py-36">
        <Container>
          <Reveal>
            <p className="text-eyebrow font-medium uppercase tracking-[0.14em] text-accent">
              Work together
            </p>
            <h2 className="mx-auto mb-4 mt-2 max-w-[18ch] font-display text-h1 font-semibold">
              Commissions & print enquiries welcome.
            </h2>
            <p className="mx-auto mb-8 max-w-[48ch] text-body-lg text-muted">
              Editorial assignments, fine-art prints, and the occasional wedding
              for people who like to walk uphill before sunrise.
            </p>
            <Button href="/contact" variant="primary" className="group">
              Get in touch
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-[var(--dur-base)] group-hover:translate-x-0.5"
              />
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
