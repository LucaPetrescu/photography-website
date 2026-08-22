"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

/**
 * Sun/moon toggle. Reads the theme the blocking init script (in layout.tsx)
 * already set on <html> before paint, then flips `data-theme` + persists to
 * localStorage on click. Renders an empty slot until mounted so it never
 * guesses the theme and causes a hydration flash.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  if (!theme) {
    return (
      <span
        aria-hidden="true"
        className={className}
        style={{ width: 20, height: 20 }}
      />
    );
  }

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage unavailable (private mode, etc.) — theme just won't persist.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      className={className}
    >
      {theme === "light" ? (
        <Moon size={18} strokeWidth={1.5} aria-hidden="true" />
      ) : (
        <Sun size={18} strokeWidth={1.5} aria-hidden="true" />
      )}
    </button>
  );
}
