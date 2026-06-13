import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import portrait from "@/public/images/about/portrait.jpg";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Luca Petrescu is a landscape and portrait photographer based in the Pacific Northwest, drawn to weather, water, and the soft hour before the world wakes up.",
};

const facts = [
  { label: "Since", value: "2016", caption: "Shooting full-time" },
  { label: "Based", value: "PNW", caption: "Portland, OR" },
  { label: "Featured", value: "12", caption: "Publications" },
  { label: "Prints", value: "40+", caption: "Editions sold" },
];

export default function AboutPage() {
  return (
    <article className="pt-[72px]">
      <Container className="pb-4 pt-16">
        <p className="text-eyebrow font-medium uppercase tracking-[0.14em] text-accent">
          About
        </p>
        <h1 className="mt-3 max-w-[16ch] font-display text-display font-semibold">
          Hello — I&rsquo;m Luca.
        </h1>
        <p className="mt-6 max-w-[var(--container-prose)] font-display text-[1.25rem] font-normal leading-[1.6] text-muted">
          A landscape and portrait photographer based in the Pacific Northwest,
          drawn to weather, water, and the soft hour before the world wakes up.
        </p>
      </Container>

      <Container as="section" className="pb-16 pt-8 md:pb-24">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-[100px]">
            <div className="aspect-[4/5] overflow-hidden rounded-lg bg-surface-muted">
              <Image
                src={portrait}
                alt="Portrait of Luca Petrescu outdoors in soft natural light."
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal>
            <div className="[&_p]:mb-5 [&_p]:max-w-[var(--container-prose)] [&_p]:leading-[1.7]">
              <p className="text-body-lg">
                I came to photography late, and sideways. For years I was a
                hydrologist measuring snowpack in the Cascades — which mostly
                meant being outdoors at dawn in places few people see. I started
                carrying a camera to remember them, and somewhere along the way
                the remembering became the work.
              </p>
              <p>
                My pictures are quiet on purpose. I&rsquo;m not chasing the
                dramatic single moment so much as the feeling of a place
                settling into itself: fog lifting off a field, the tide going
                out, a face caught mid-thought. I shoot slowly, return often,
                and throw most of it away.
              </p>

              <blockquote className="my-10 max-w-[42ch] border-l-2 border-accent pl-5 font-display text-[1.5rem] leading-[1.35] tracking-[-0.01em] text-text">
                &ldquo;I&rsquo;d rather wait two hours for the right light than
                fake it in five minutes afterward.&rdquo;
              </blockquote>

              <h2 className="mb-4 mt-10 font-display text-h2 font-semibold">
                How I work
              </h2>
              <p>
                Small kit, long days, real weather. I work primarily in natural
                light, print everything I&rsquo;m proud of, and treat editing as
                restraint rather than reinvention. For portraits I like to walk
                and talk first and photograph second — the good frames tend to
                arrive once people forget the camera is there.
              </p>
              <p>
                I take on a handful of commissions a year — editorial, fine-art
                commissions, and the occasional wedding for people who
                don&rsquo;t mind a 4 a.m. call time. If that sounds like you,
                I&rsquo;d love to hear from you.
              </p>

              <Button href="/contact" variant="primary" className="group mt-2">
                Start a conversation
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-[var(--dur-base)] group-hover:translate-x-0.5"
                />
              </Button>

              <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="mb-1.5 block font-mono text-mono text-accent">
                      {fact.label}
                    </dt>
                    <dd>
                      <span className="block font-display text-[2rem] font-semibold leading-none">
                        {fact.value}
                      </span>
                      <span className="mt-1.5 block text-body-sm text-muted">
                        {fact.caption}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Container>
    </article>
  );
}
