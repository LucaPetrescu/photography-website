import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { GearSection } from "@/components/gear/GearSection";
import { getGearGroups } from "@/lib/gear";

export const metadata: Metadata = {
  title: "Gear I Use",
  description:
    "The camera body and lenses Luca Petrescu carries into the field — a Nikon D750 with three Tamron and Nikkor lenses.",
};

export default function GearPage() {
  const groups = getGearGroups();

  return (
    <div className="pt-14">
      <Container as="section" className="pb-4 pt-12">
        <p className="text-[0.75rem] uppercase tracking-[0.1em] text-muted">
          Gear I Use
        </p>
        <h1 className="mt-4 font-display text-display font-semibold">
          The kit
        </h1>
        <p className="mt-4 max-w-[54ch] text-body-lg text-muted">
          People ask, so here it is. None of it matters as much as being there
          at the right hour — but a light, weather-sealed setup means I actually
          want to carry it up the hill.
        </p>
      </Container>

      <Container className="pb-16 md:pb-24">
        {groups.map((group) => (
          <GearSection key={group.category} group={group} />
        ))}

        <p className="mt-10 max-w-[60ch] border border-border p-5 text-[0.875rem] text-muted">
          <strong className="font-medium text-text">A note on links.</strong>{" "}
          You won&rsquo;t find any here &mdash; no affiliate trackers, no referral
          codes. I don&rsquo;t earn anything if you buy. Use what you have; the
          best camera is the one you brought.
        </p>
      </Container>
    </div>
  );
}
