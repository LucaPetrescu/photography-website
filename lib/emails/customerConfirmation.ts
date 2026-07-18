import { siteConfig } from "@/lib/siteConfig";
import {
  emailWrapperOpen,
  emailWrapperClose,
  escapeHtml,
  formatJobCategory,
} from "@/lib/emails/shared";

/** Sent to the customer right after they submit the contact form. */
export function renderCustomerConfirmationEmail(input: {
  firstName: string;
  jobCategory: string;
}) {
  const { firstName, jobCategory } = input;
  const category = formatJobCategory(jobCategory);
  const safeFirstName = escapeHtml(firstName);

  const subject = `Thanks for reaching out, ${firstName}!`;

  const html = `${emailWrapperOpen}
                <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#111111;font-weight:600;">
                  Got your message, ${safeFirstName}.
                </h1>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#111111;">
                  Thanks for getting in touch about ${category ? `a <strong>${escapeHtml(category)}</strong>` : "your project"}.
                  I read every enquiry personally and usually reply within a couple of days.
                </p>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#111111;">
                  If it's urgent, feel free to reach me directly at
                  <a href="mailto:${escapeHtml(siteConfig.email)}" style="color:#111111;">${escapeHtml(siteConfig.email)}</a>
                  or ${escapeHtml(siteConfig.phone)}.
                </p>
                <p style="margin:24px 0 0;font-size:15px;line-height:1.6;color:#111111;">
                  Talk soon,<br />${escapeHtml(siteConfig.name)}
                </p>
${emailWrapperClose}`;

  const text = [
    `Got your message, ${firstName}.`,
    "",
    `Thanks for getting in touch${category ? ` about a ${category}` : ""}. I read every enquiry personally and usually reply within a couple of days.`,
    "",
    `If it's urgent, reach me directly at ${siteConfig.email} or ${siteConfig.phone}.`,
    "",
    `Talk soon,`,
    siteConfig.name,
  ].join("\n");

  return { subject, html, text };
}
