import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/services/ServiceCard";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Private sessions, event coverage, and personalized photography packages from Luca Petrescu.",
};

export default function ServicesPage() {
  return (
    <div className="pt-14">
      <Container className="pb-4 pt-12">
        <p className="text-[0.75rem] uppercase tracking-[0.1em] text-muted">
          Services
        </p>
        <h1 className="mt-4 max-w-[20ch] font-display text-display font-semibold">
          What I can shoot for you.
        </h1>
        <p className="mt-5 max-w-[var(--container-prose)] text-body-lg text-muted">
          Three ways to work together — pick the one that fits, or get in
          touch and we&rsquo;ll figure it out.
        </p>
      </Container>

      <Container as="section" className="pb-12 pt-8 md:pb-16">
        {services.map((service, i) => (
          <Reveal key={service.name} delay={i * 100}>
            <ServiceCard service={service} index={i} />
          </Reveal>
        ))}
      </Container>

      <Container className="pb-16 md:pb-24">
        <Reveal className="flex flex-col items-start gap-4 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[46ch] text-body-lg">
            Ready to book, or still deciding? Tell me what you have in mind.
          </p>
          <Link
            href="/contact"
            className="inline-flex h-12 flex-none items-center gap-2 bg-text px-6 text-sm font-medium text-surface transition-colors hover:bg-accent-hover"
          >
            Get in touch
            <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </Reveal>
      </Container>
    </div>
  );
}
