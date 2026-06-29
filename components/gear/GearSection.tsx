import type { GearGroup } from "@/lib/gear";
import { GearCard } from "@/components/gear/GearCard";
import { Reveal } from "@/components/ui/Reveal";

export function GearSection({ group }: { group: GearGroup }) {
  const headingId = `gear-${group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <section aria-labelledby={headingId}>
      <Reveal>
        <h2
          id={headingId}
          className="mb-6 border-t border-border pt-8 font-display text-h2 font-semibold"
        >
          {group.category}
        </h2>
      </Reveal>
      <div>
        {group.items.map((item, i) => (
          <Reveal
            key={item.name}
            delay={i * 150}
            className="reveal-fly"
          >
            <GearCard item={item} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
