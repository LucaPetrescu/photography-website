import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/siteConfig";

export const alt = `${siteConfig.brand} — Private Sessions, Events & Personalized Photography`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        background: "#0a0a0a",
        padding: "80px",
        color: "#ffffff",
        fontFamily: "Space Grotesk, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 22,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#888888",
          marginBottom: 24,
        }}
      >
        Private Sessions &middot; Events &middot; Personalized Shoots
      </div>
      <div style={{ fontSize: 84, fontWeight: 400, lineHeight: 1.05 }}>
        {siteConfig.name}
      </div>
      <div style={{ fontSize: 28, color: "#888888", marginTop: 20 }}>
        Photography &mdash; Bucharest, Romania
      </div>
    </div>,
    { ...size },
  );
}
