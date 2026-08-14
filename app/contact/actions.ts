"use server";

import { z } from "zod";
import { siteConfig } from "@/lib/siteConfig";
import {
  contactSchema,
  type ContactState,
  type ContactFieldErrors,
} from "@/lib/validation";
import { renderCustomerConfirmationEmail } from "@/lib/emails/customerConfirmation";
import { renderOwnerNotificationEmail } from "@/lib/emails/ownerNotification";
import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from "@getbrevo/brevo";
import { BrevoClient } from "@getbrevo/brevo";

/**
 * Contact form Server Action. Signature matches useActionState:
 * (prevState, formData) => nextState.
 *
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

  const {
    firstName,
    lastName,
    email: clientEmail,
    jobCategory,
    details,
    message,
  } = parsed.data;

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      errors: {},
      formError: `Email isn't configured yet. Please reach me directly at ${siteConfig.email}.`,
    };
  }

  const photographerEmail = process.env.PHOTOGRAPHER_EMAIL ?? siteConfig.email;
  const senderEmail = process.env.SENDER_EMAIL ?? siteConfig.email;

  const brevoClient = new BrevoClient({ apiKey: apiKey });

  const owner = renderOwnerNotificationEmail({
    firstName,
    lastName,
    email: clientEmail,
    jobCategory,
    details,
    message,
  });

  try {
    await brevoClient.transactionalEmails.sendTransacEmail({
      sender: { name: siteConfig.brand, email: senderEmail },
      to: [{ email: photographerEmail }],
      replyTo: { email: clientEmail },
      subject: owner.subject,
      htmlContent: owner.html,
      textContent: owner.text,
    });
  } catch {
    return {
      ok: false,
      errors: {},
      formError: `Something went wrong sending your message. Please email me directly at ${siteConfig.email}.`,
    };
  }
}
