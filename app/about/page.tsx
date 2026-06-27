import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About Me",
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
    <article className="pt-14">
      <Container className="pb-4 pt-12">
        <p className="text-[0.75rem] uppercase tracking-[0.1em] text-muted">
          About Me
        </p>
        <h1 className="mt-4 max-w-[18ch] font-display text-display font-semibold">
          Hello &mdash; I&rsquo;m Luca.
        </h1>
        <p className="mt-5 max-w-[var(--container-prose)] text-body-lg text-muted">
          A landscape and portrait photographer based in the Pacific Northwest,
          drawn to weather, water, and the soft hour before the world wakes up.
        </p>
      </Container>

      <Container as="section" className="pb-16 pt-8 md:pb-24">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-[80px]">
            <div
              className="bg-surface-muted"
              style={{ aspectRatio: "3 / 4" }}
            />
          </Reveal>

          <Reveal>
            <div className="[&_p]:mb-5 [&_p]:max-w-[var(--container-prose)] [&_p]:leading-[1.7]">
              <p className="text-body-lg">
                I came to photography late, and sideways. For years I was a
                hydrologist measuring snowpack in the Cascades &mdash; which
                mostly meant being outdoors at dawn in places few people see. I
                started carrying a camera to remember them, and somewhere along
                the way the remembering became the work.
              </p>
              <p>
                My pictures are quiet on purpose. I&rsquo;m not chasing the
                dramatic single moment so much as the feeling of a place
                settling into itself: fog lifting off a field, the tide going
                out, a face caught mid-thought. I shoot slowly, return often,
                and throw most of it away.
              </p>

              <blockquote className="my-10 max-w-[42ch] border-l border-text pl-5 font-display text-[1.4rem] leading-[1.4] tracking-[-0.01em]">
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
                and talk first and photograph second &mdash; the good frames
                tend to arrive once people forget the camera is there.
              </p>
              <p>
                I take on a handful of commissions a year &mdash; editorial,
                fine-art commissions, and the occasional wedding for people who
                don&rsquo;t mind a 4&nbsp;a.m. call time. If that sounds like
                you, I&rsquo;d love to hear from you.
              </p>

              <Link
                href="/contact"
                className="group mt-2 inline-flex items-center gap-2 text-[0.8125rem] text-muted transition-colors hover:text-text"
              >
                Start a conversation
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-[var(--dur-base)] group-hover:translate-x-0.5"
                />
              </Link>

              <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="mb-1 block text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
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
