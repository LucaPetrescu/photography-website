import { siteConfig } from "@/lib/siteConfig";

/** Shared helpers for the contact-form email templates. */

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function formatJobCategory(jobCategory: string): string {
  if (!jobCategory) return "";
  return jobCategory.charAt(0).toUpperCase() + jobCategory.slice(1);
}

export const emailWrapperOpen = `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:520px;background:#ffffff;border:1px solid #e8e8e8;">
            <tr>
              <td style="padding:32px 32px 24px;border-bottom:1px solid #e8e8e8;">
                <p style="margin:0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#888888;">
                  ${escapeHtml(siteConfig.brand)}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
`;

export const emailWrapperClose = `
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px;border-top:1px solid #e8e8e8;">
                <p style="margin:0;font-size:13px;color:#888888;">
                  ${escapeHtml(siteConfig.name)} &middot; ${escapeHtml(siteConfig.location)}<br />
                  <a href="mailto:${escapeHtml(siteConfig.email)}" style="color:#888888;">${escapeHtml(siteConfig.email)}</a>
                  &middot; ${escapeHtml(siteConfig.phone)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
