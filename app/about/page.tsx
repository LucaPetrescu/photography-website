import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Luca Petrescu is a photographer based in Bucharest, Romania, working directly with clients on private sessions, events, and personalized shoots.",
};

const facts = [
  {
    label: "Based",
    value: "Bucharest",
    caption: "Romania · shooting worldwide",
  },
  { label: "Services", value: "3", caption: "Private, events, custom" },
];

export default function AboutPage() {
  return (
    <article className="pt-16">
      <Container className="pb-4 pt-12">
        <p className="text-[0.75rem] uppercase tracking-[0.15em] text-muted">
          About
        </p>
        <h1 className="mt-4 max-w-[18ch] font-display text-h1 font-normal">
          Hello &mdash; I&rsquo;m Luca.
        </h1>
        <p className="mt-5 max-w-[var(--container-prose)] text-body-lg text-muted">
          A photographer based in Bucharest, Romania, working directly with
          clients on private sessions, events, and personalized shoots.
        </p>
      </Container>

      <Container as="section" className="pb-16 pt-8 md:pb-24">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-[96px]">
            <div
              className="bg-surface-muted"
              style={{ aspectRatio: "3 / 4" }}
            />
          </Reveal>

          <Reveal>
            <div className="[&_p]:mb-5 [&_p]:max-w-[var(--container-prose)] [&_p]:leading-[1.7]">
              <p className="text-body-lg">
                I work alone, by choice. No studio, no account manager between
                us &mdash; when you book a session, you&rsquo;re working
                directly with me from the first message to the final gallery.
              </p>
              <p>
                My approach is simple: fewer poses, more moments. I&rsquo;d
                rather you forget the camera is there for a few minutes than
                walk away with twenty stiff, camera-aware frames &mdash; true
                whether it&rsquo;s a private session, an event, or something in
                between.
              </p>

              <blockquote className="my-10 max-w-[42ch] border-l border-text pl-5 font-display text-h3 tracking-[-0.01em]">
                &ldquo;I&rsquo;d rather wait for the right moment than force it
                in five minutes.&rdquo;
              </blockquote>

              <h2 className="mb-4 mt-10 font-display text-h2 font-normal">
                How I work
              </h2>
              <p>
                Small kit, real light, minimal setup &mdash; I&rsquo;d rather
                spend the time with you than behind equipment. I take on private
                sessions, events, and personalized commissions built around what
                you actually need, not a fixed package.
              </p>
              <p>
                Not sure which of those fits? That&rsquo;s fine &mdash; reach
                out and we&rsquo;ll figure it out together.
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

              <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-border py-8">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="mb-1 block text-eyebrow uppercase tracking-[0.15em] text-muted">
                      {fact.label}
                    </dt>
                    <dd>
                      <span className="block font-display text-[2rem] font-normal leading-none">
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
