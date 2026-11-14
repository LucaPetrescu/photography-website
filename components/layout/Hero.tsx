import Image, { type StaticImageData } from "next/image";
import { ChevronDown } from "lucide-react";

type HeroProps = {
  image: StaticImageData;
  imageAlt: string;
  eyebrow: string;
  headline: string;
  lead: string;
};

/**
 * Full-viewport home hero: the name centered over a full-bleed photograph.
 * The photograph is the LCP element, so it is prioritized and blurred up from
 * a placeholder.
 */
export function Hero({ image, imageAlt, eyebrow, headline, lead }: HeroProps) {
  return (
    <section
      aria-label="Introduction"
      className="relative flex h-screen min-h-[560px] w-full items-center justify-center overflow-hidden bg-bg"
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover object-[center_35%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/40 to-bg/80"
      />

      <div className="relative flex flex-col items-center px-6 text-center">
        <p className="text-[0.75rem] uppercase tracking-[0.15em] text-muted">
          {eyebrow}
        </p>
        <h1 className="mt-6 font-display text-display font-light leading-none tracking-[-0.02em] text-text">
          {headline}
        </h1>
        <p className="mt-6 text-[0.875rem] text-muted">{lead}</p>
      </div>

      <ChevronDown
        size={22}
        strokeWidth={1.25}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        style={{ animation: "scrollHint 2.2s var(--ease-in-out) infinite" }}
      />
    </section>
  );
}
