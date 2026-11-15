import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

import officeImage from "@/public/images/Luca_Petrescu_Office.jpg";

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
              className="relative overflow-hidden rounded-lg bg-surface-muted"
              style={{ aspectRatio: "3 / 4" }}
            >
              <Image
                src={officeImage}
                alt="Luca Petrescu in his office"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal>
            <div className="[&_p]:mb-5 [&_p]:max-w-[var(--container-prose)] [&_p]:leading-[1.7]">
              <p className="text-body-lg">
                I work on my own, by choice. No studio and no account manager in
                the middle &mdash; you write to me, we plan the shoot together,
                and I&rsquo;m the one behind the camera.
              </p>
              <p>
                I like to plan ahead, so before the shoot we&rsquo;ll go through
                exactly what you want: the kind of images, the location, the
                timing. Having that clear from the start keeps the session
                relaxed and lets us focus on the photos.
              </p>
              <p>
                Sessions are professional, but relaxed. We do the work, and
                there&rsquo;s room to chat along the way. I keep posing to a
                minimum and I&rsquo;m happy to try your own ideas during the
                shoot. Mostly, I want you to feel comfortable enough that you
                stop thinking about the camera.
              </p>

              <h2 className="mb-4 mt-10 font-display text-h2 font-normal">
                How I work
              </h2>
              <p>
                I take on private sessions, events, and personalized commissions, planned around what you actually need.
              </p>
              <p>
                Individual / couple sessions and events are a fixed price.
                Personalized commissions are the only ones quoted separately.
              </p>
              <ul className="my-6 grid max-w-[var(--container-prose)] gap-2.5">
                <li className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 flex-none bg-muted"
                  />
                  Book an appointment by phone or through the contact form.
                </li>
                <li className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 flex-none bg-muted"
                  />
                  Every service comes with an invoice.
                </li>
                <li className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 flex-none bg-muted"
                  />
                  A deposit reserves your date.
                </li>
              </ul>
              <p>
                If you have a mood or vision board on Pinterest, send it over
                &mdash; it gives me a clear idea of what you&rsquo;re after, and
                we can talk through the ideas together.
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
