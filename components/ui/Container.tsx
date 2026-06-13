import type { ComponentProps, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** Render as a different element (e.g. "section", "header"). Default "div". */
  as?: ElementType;
  /** Full-bleed: span 100vw, ignoring the max-width container. */
  bleed?: boolean;
} & Omit<ComponentProps<"div">, "className" | "children">;

/**
 * Centered max-width content wrapper with responsive gutters.
 * `bleed` opts an element out of the container to span the full viewport
 * width (used by the hero).
 */
export function Container({
  children,
  className,
  as: Tag = "div",
  bleed = false,
  ...rest
}: ContainerProps) {
  if (bleed) {
    return (
      <Tag
        className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
        {...rest}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-7xl px-5 md:px-8 xl:px-16",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
