import Image, { type StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

type HeroProps = {
  image: StaticImageData;
  imageAlt: string;
  eyebrow: string;
  headline: string;
  lead: string;
};

const ease = "cubic-bezier(0.22,1,0.36,1)";

/**
 * Full-bleed home hero. The photograph is the LCP element.
 * Text elements enter sequentially via CSS animation so no JS is needed —
 * the sequence plays immediately without waiting for hydration.
 */
export function Hero({ image, imageAlt, eyebrow, headline, lead }: HeroProps) {
  return (
    <section
      aria-label="Introduction"
      className="relative left-1/2 flex min-h-[88vh] w-screen -translate-x-1/2 items-end"
    >
      <Image
        src={image}
        alt={imageAlt}
        placeholder="blur"
        priority
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.2)_100%)]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 text-white md:px-8 xl:px-16">
        <p
          style={{ animation: `fadeInUp 600ms ${ease} 100ms both` }}
          className="text-eyebrow font-medium uppercase tracking-[0.14em] text-white/75"
        >
          {eyebrow}
        </p>
        <h1
          style={{ animation: `fadeInUp 700ms ${ease} 280ms both` }}
          className="mb-4 mt-3 max-w-[14ch] font-display text-display font-semibold"
        >
          {headline}
        </h1>
        <p
          style={{ animation: `fadeInUp 600ms ${ease} 500ms both` }}
          className="mb-8 max-w-[46ch] text-body-lg text-white/85"
        >
          {lead}
        </p>
        <div
          style={{ animation: `fadeInUp 600ms ${ease} 700ms both` }}
          className="flex flex-wrap gap-3"
        >
          <Button href="/gallery" variant="primary">
            View the work
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-[var(--dur-base)] group-hover:translate-x-0.5"
            />
          </Button>
          <Button href="/about" variant="ghost" onDark>
            About me
          </Button>
        </div>
      </div>
    </section>
  );
}
