import type { NextConfig } from "next";

/**
 * Static Content Security Policy suited to a fully static (SSG) site.
 *
 * A nonce-based strict CSP would force dynamic rendering (see the Next.js CSP
 * guide), which defeats SSG here. Instead we ship a static policy:
 * - `'unsafe-inline'` is required for styles because Tailwind and `next/font`
 *   inject inline <style>/style attributes during static rendering.
 * - `img-src` allows data:/blob: for `next/image` blur placeholders.
 * - `connect-src 'self'` is enough; the Resend call happens server-side.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.s3.eu-central-003.backblazeb2.com",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.s3.eu-central-003.backblazeb2.com",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
