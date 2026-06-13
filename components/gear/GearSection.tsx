import type { GearGroup } from "@/lib/gear";
import { GearCard } from "@/components/gear/GearCard";
import { Reveal } from "@/components/ui/Reveal";

/** One category group: a heading + a responsive grid of gear cards. */
export function GearSection({ group }: { group: GearGroup }) {
  const headingId = `gear-${group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const count = group.items.length;

  return (
    <Reveal as="section" aria-labelledby={headingId} className="py-10">
      <div className="mb-7 flex items-baseline gap-4 border-t border-border pt-7">
        <h2 id={headingId} className="font-display text-h2 font-semibold">
          {group.category}
        </h2>
        <span className="font-mono text-mono text-muted">
          {count} {count === 1 ? "item" : "items"}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {group.items.map((item) => (
          <GearCard key={item.name} item={item} />
        ))}
      </div>
    </Reveal>
  );
}
