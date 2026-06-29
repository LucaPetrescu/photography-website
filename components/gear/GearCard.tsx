import Image from "next/image";
import type { GearItem } from "@/lib/gear";

export function GearCard({ item, index }: { item: GearItem; index: number }) {
  const flip = index % 2 !== 0;
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`flex flex-col border-t border-border md:flex-row ${flip ? "md:flex-row-reverse" : ""}`}
    >
      {/* Image */}
      <div
        className="relative w-full flex-none bg-surface md:w-[55%]"
        style={{ minHeight: "340px" }}
      >
        <Image
          src={item.image}
          alt={item.name}
          placeholder="blur"
          fill
          sizes="(min-width: 768px) 55vw, 100vw"
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between px-8 py-10 md:px-12 md:py-14">
        <div>
          <span
            aria-hidden="true"
            className="block select-none font-display font-semibold leading-none text-border"
            style={{ fontSize: "clamp(3.5rem, 6vw, 5.5rem)" }}
          >
            {num}
          </span>
          <p className="mt-5 font-mono text-mono text-muted">
            {item.category}
          </p>
          <h3 className="mt-1.5 font-display text-h1 font-semibold leading-tight">
            {item.name}
          </h3>
          {item.description && (
            <p className="mt-5 max-w-[36ch] text-[0.9375rem] leading-relaxed text-muted">
              {item.description}
            </p>
          )}
        </div>

        {item.specs && item.specs.length > 0 && (
          <dl className="mt-10 border-t border-border pt-5">
            {item.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex justify-between border-b border-border py-2.5 font-mono text-mono"
              >
                <dt className="text-muted">{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
