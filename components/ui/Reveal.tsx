"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Stagger delay in ms applied as transition-delay. */
  delay?: number;
} & Omit<ComponentProps<"div">, "className" | "children" | "ref" | "style">;

/**
 * Fades + lifts its children into view on first scroll into the viewport.
 *
 * Under `prefers-reduced-motion: reduce` the `.reveal` rule in globals.css
 * forces the final (visible) state via CSS, so we never need to toggle state in
 * that case — we just set up the IntersectionObserver and let it run when
 * motion is allowed.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={delay !== undefined ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
