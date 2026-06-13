import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Heading level for the title. Default 2. */
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
  id?: string;
};

/** Eyebrow → heading → optional subtitle, in the editorial rhythm. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as: Tag = "h2",
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  const titleClass =
    Tag === "h1"
      ? "font-display text-h1 text-text"
      : "font-display text-h2 text-text";

  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="text-eyebrow font-medium uppercase text-accent">
          {eyebrow}
        </p>
      ) : null}
      <Tag id={id} className={cn(titleClass, eyebrow && "mt-2")}>
        {title}
      </Tag>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-body-lg text-muted",
            align === "center"
              ? "mx-auto max-w-[var(--container-prose)]"
              : "max-w-[var(--container-prose)]",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
