import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/siteConfig";

export const alt = `${siteConfig.brand} — Landscape & Portrait Photographer`;
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
        background: "linear-gradient(135deg, #3a3733 0%, #4a6fa5 100%)",
        padding: "80px",
        color: "#ffffff",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          fontSize: 28,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          opacity: 0.85,
          marginBottom: 24,
        }}
      >
        Landscape &amp; Portrait — Pacific Northwest
      </div>
      <div style={{ fontSize: 84, fontWeight: 600, lineHeight: 1.05 }}>
        {siteConfig.name}
      </div>
      <div style={{ fontSize: 32, opacity: 0.9, marginTop: 20 }}>
        Photography
      </div>
    </div>,
    { ...size },
  );
}
