import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 min-h-11 rounded-md px-6 py-3 text-body-sm font-medium font-sans cursor-pointer border border-transparent transition-[background-color,border-color,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  ghost: "bg-transparent text-text border-border hover:border-text",
};

/** Variant for use over dark imagery (e.g. on the hero). */
const onDark =
  "text-white border-white/50 hover:border-white hover:bg-white/10";

type CommonProps = {
  variant?: Variant;
  /** Lighten ghost button for placement over dark imagery. */
  onDark?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, keyof CommonProps | "ref"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, keyof CommonProps | "ref"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/** Shared CTA button — renders an anchor (next/link) when `href` is given. */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    onDark: dark = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    base,
    variants[variant],
    dark && variant === "ghost" && onDark,
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const { type, ...buttonRest } = rest as ButtonAsButton;
  return (
    <button type={type ?? "button"} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
