"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Send } from "lucide-react";

/**
 * Submit button that reflects the parent form's pending state via
 * useFormStatus: shows a spinner + "Sending…" and disables itself while the
 * Server Action is in flight.
 */
export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-transparent bg-accent px-6 py-3 text-body-sm font-medium text-white transition-[background-color,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:bg-accent-hover active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          Sending…
        </>
      ) : (
        <>
          Send message
          <Send size={16} aria-hidden="true" />
        </>
      )}
    </button>
  );
}
