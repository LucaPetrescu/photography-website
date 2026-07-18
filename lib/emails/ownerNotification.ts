import {
  emailWrapperOpen,
  emailWrapperClose,
  escapeHtml,
  formatJobCategory,
} from "@/lib/emails/shared";

/** Sent to the site owner when a customer submits a job request. */
export function renderOwnerNotificationEmail(input: {
  firstName: string;
  lastName: string;
  email: string;
  jobCategory: string;
  details?: string;
  message: string;
}) {
  const { firstName, lastName, email, jobCategory, details, message } = input;
  const category = formatJobCategory(jobCategory);
  const fullName = `${firstName} ${lastName}`;

  const subject = `New enquiry: ${category || "General"} — ${fullName}`;

  const rows = [
    { label: "Name", value: fullName },
    { label: "Email", value: email },
    { label: "Service", value: category },
    details ? { label: "Details", value: details } : null,
  ].filter((row): row is { label: string; value: string } => row !== null);

  const rowsHtml = rows
    .map(
      (row) => `
                  <tr>
                    <td style="padding:8px 0;font-size:13px;color:#888888;width:96px;vertical-align:top;">${escapeHtml(row.label)}</td>
                    <td style="padding:8px 0;font-size:14px;color:#111111;">${escapeHtml(row.value)}</td>
                  </tr>`,
    )
    .join("");

  const html = `${emailWrapperOpen}
                <h1 style="margin:0 0 20px;font-size:22px;line-height:1.3;color:#111111;font-weight:600;">
                  New job request
                </h1>
                <table role="presentation" width="100%" style="border-bottom:1px solid #e8e8e8;margin-bottom:20px;">
                  ${rowsHtml}
                </table>
                <p style="margin:0 0 4px;font-size:13px;color:#888888;">Message</p>
                <p style="margin:0;font-size:15px;line-height:1.6;color:#111111;white-space:pre-wrap;">${escapeHtml(message)}</p>
                <p style="margin:24px 0 0;">
                  <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:#111111;color:#ffffff;text-decoration:none;font-size:13px;padding:10px 20px;">
                    Reply to ${escapeHtml(firstName)}
                  </a>
                </p>
${emailWrapperClose}`;

  const text = [
    `New job request`,
    "",
    `Name: ${fullName}`,
    `Email: ${email}`,
    category ? `Service: ${category}` : null,
    details ? `Details: ${details}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return { subject, html, text };
}
