"use server";

import { z } from "zod";
import { Resend } from "resend";
import { siteConfig } from "@/lib/siteConfig";
import {
  contactSchema,
  type ContactState,
  type ContactFieldErrors,
} from "@/lib/validation";

/**
 * Contact form Server Action. Signature matches useActionState:
 * (prevState, formData) => nextState.
 *
 * Flow: honeypot check → Zod validation → send via Resend → typed result.
 * The Resend client is created lazily and only when a key is present, so the
 * build (SSG) succeeds without the secret.
 */
export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return { ok: true };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject") ?? "",
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const flat = z.flattenError(parsed.error);
    return {
      ok: false,
      errors: flat.fieldErrors as ContactFieldErrors,
    };
  }

  const { name, email, subject, message } = parsed.data;

  // 4. Send via Resend. Guard the client init so a missing key is handled
  //    gracefully at runtime (and never breaks the build).
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      errors: {},
      formError: `Email isn't configured yet. Please reach me directly at ${siteConfig.email}.`,
    };
  }

  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
  const subjectLine = subject && subject.length > 0 ? subject : "New enquiry";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `${siteConfig.brand} <${from}>`,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subjectLine}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        subject ? `Subject: ${subject}` : null,
        "",
        message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    });

    if (error) {
      return {
        ok: false,
        errors: {},
        formError: `Something went wrong sending your message. Please email me directly at ${siteConfig.email}.`,
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      errors: {},
      formError: `Something went wrong sending your message. Please email me directly at ${siteConfig.email}.`,
    };
  }
}
