"use client";

import { useActionState, useId } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { submitContact } from "@/app/contact/actions";
import { contactInitialState } from "@/lib/validation";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";
import { SubmitButton } from "@/components/contact/SubmitButton";

const inputBase =
  "w-full min-h-11 rounded-md border bg-surface px-4 py-3 text-base text-text transition-[border-color,box-shadow] duration-[var(--dur-fast)] placeholder:text-muted/70 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_18%,transparent)]";

const inputError =
  "border-error focus:border-error focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-error)_18%,transparent)]";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span
      id={id}
      className="flex items-center gap-1.5 text-[0.8125rem] text-error"
    >
      <AlertCircle size={14} strokeWidth={2} aria-hidden="true" />
      {message}
    </span>
  );
}

/**
 * Contact form driven by React 19 useActionState over the submitContact Server
 * Action. Renders inline field errors (aria-live), pending state (via
 * SubmitButton), and a success panel. A mailto: fallback is always present.
 */
export function ContactForm() {
  const [state, formAction] = useActionState(
    submitContact,
    contactInitialState,
  );
  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    subject: `${uid}-subject`,
    message: `${uid}-message`,
    nameErr: `${uid}-name-err`,
    emailErr: `${uid}-email-err`,
    messageErr: `${uid}-message-err`,
    status: `${uid}-status`,
  };

  const errors = state.ok ? {} : state.errors;
  const formError = state.ok ? undefined : state.formError;

  if (state.ok) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-4 rounded-lg border border-[color-mix(in_srgb,var(--color-success)_30%,transparent)] bg-accent-subtle p-8"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-success)_18%,transparent)] text-success">
          <CheckCircle2 size={26} strokeWidth={2.2} aria-hidden="true" />
        </span>
        <h2 className="font-display text-h2 font-semibold">
          Thanks — your message is on its way.
        </h2>
        <p className="max-w-[48ch] text-muted">
          I read every note personally and usually reply within two days. If
          it&rsquo;s urgent, you can always reach me directly at{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-accent underline underline-offset-2"
          >
            {siteConfig.email}
          </a>
          .
        </p>
        <Link
          href="/gallery"
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-border px-6 py-3 text-body-sm font-medium transition-colors hover:border-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
        >
          Back to the gallery
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor={ids.name} className="text-body-sm font-medium">
            Name
          </label>
          <input
            id={ids.name}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? ids.nameErr : undefined}
            className={cn(inputBase, errors.name && inputError)}
          />
          <FieldError id={ids.nameErr} message={errors.name?.[0]} />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor={ids.email} className="text-body-sm font-medium">
            Email
          </label>
          <input
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? ids.emailErr : undefined}
            className={cn(inputBase, errors.email && inputError)}
          />
          <FieldError id={ids.emailErr} message={errors.email?.[0]} />
        </div>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor={ids.subject} className="text-body-sm font-medium">
          Subject <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id={ids.subject}
          name="subject"
          type="text"
          placeholder="Commission, print enquiry, …"
          className={inputBase}
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor={ids.message} className="text-body-sm font-medium">
          Message
        </label>
        <textarea
          id={ids.message}
          name="message"
          rows={6}
          placeholder="Tell me about the project, dates, and location."
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? ids.messageErr : undefined}
          className={cn(
            inputBase,
            "min-h-[140px] resize-y leading-[1.6]",
            errors.message && inputError,
          )}
        />
        <FieldError id={ids.messageErr} message={errors.message?.[0]} />
      </div>

      {/* Honeypot — visually hidden, off the tab order; bots tend to fill it. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor={`${uid}-company`}>Company</label>
        <input
          id={`${uid}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton />
        <span className="text-[0.8125rem] text-muted">
          Prefer email?{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-accent underline underline-offset-2"
          >
            {siteConfig.email}
          </a>
        </span>
      </div>

      {/* Live region: announces form-level errors and error counts to SR users. */}
      <p id={ids.status} aria-live="polite" className="sr-only">
        {formError
          ? formError
          : Object.keys(errors).length > 0
            ? `There ${Object.keys(errors).length === 1 ? "is 1 problem" : `are ${Object.keys(errors).length} problems`} with the form.`
            : ""}
      </p>

      {formError ? (
        <p className="flex items-center gap-1.5 text-[0.8125rem] text-error">
          <AlertCircle size={14} strokeWidth={2} aria-hidden="true" />
          {formError}
        </p>
      ) : null}
    </form>
  );
}
