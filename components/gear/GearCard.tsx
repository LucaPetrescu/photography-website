import Image from "next/image";
import type { GearItem } from "@/lib/gear";

/** A single piece of gear: image, category label, name, description. No links. */
export function GearCard({ item }: { item: GearItem }) {
  return (
    <article className="group flex flex-col">
      <div className="mb-5 aspect-[3/2] overflow-hidden rounded-md bg-surface-muted">
        <Image
          src={item.image}
          alt={`${item.name} — ${item.category}`}
          placeholder="blur"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-[1.03]"
        />
      </div>

      <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
        {item.category}
      </span>
      <h3 className="mt-1 font-display text-h3 font-medium">{item.name}</h3>

      {item.description ? (
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
          {item.description}
        </p>
      ) : null}

      {item.specs && item.specs.length > 0 ? (
        <ul className="mt-4 grid gap-1.5 border-t border-border pt-4">
          {item.specs.map((spec) => (
            <li
              key={spec.label}
              className="flex justify-between gap-4 font-mono text-mono"
            >
              <span className="text-muted">{spec.label}</span>
              <span>{spec.value}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
