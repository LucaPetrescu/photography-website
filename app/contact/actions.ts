"use server";

import { z } from "zod";
import { Resend } from "resend";
import { siteConfig } from "@/lib/siteConfig";
import {
  contactSchema,
  type ContactState,
  type ContactFieldErrors,
} from "@/lib/validation";
import { renderCustomerConfirmationEmail } from "@/lib/emails/customerConfirmation";
import { renderOwnerNotificationEmail } from "@/lib/emails/ownerNotification";

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
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    jobCategory: formData.get("jobCategory") ?? "",
    details: formData.get("details") ?? "",
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const flat = z.flattenError(parsed.error);
    return {
      ok: false,
      errors: flat.fieldErrors as ContactFieldErrors,
    };
  }

  const { firstName, lastName, email, jobCategory, details, message } =
    parsed.data;

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

  const resend = new Resend(apiKey);
  const owner = renderOwnerNotificationEmail({
    firstName,
    lastName,
    email,
    jobCategory,
    details,
    message,
  });

  try {
    const { error } = await resend.emails.send({
      from: `${siteConfig.brand} <${from}>`,
      to,
      replyTo: email,
      subject: owner.subject,
      html: owner.html,
      text: owner.text,
    });

    if (error) {
      return {
        ok: false,
        errors: {},
        formError: `Something went wrong sending your message. Please email me directly at ${siteConfig.email}.`,
      };
    }
  } catch {
    return {
      ok: false,
      errors: {},
      formError: `Something went wrong sending your message. Please email me directly at ${siteConfig.email}.`,
    };
  }

  // The lead is already in via the owner notification above, so a failure
  // here shouldn't fail the whole submission — just skip the confirmation.
  try {
    const confirmation = renderCustomerConfirmationEmail({
      firstName,
      jobCategory,
    });
    await resend.emails.send({
      from: `${siteConfig.brand} <${from}>`,
      to: email,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });
  } catch {
    // Best-effort — the owner notification already succeeded.
  }

  return { ok: true };
}
