import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} - ${siteConfig.tagline}`;
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #EEF6FF 0%, #FFFFFF 45%, #FFF2E7 100%)",
          color: "#182033",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: 72,
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#2563EB",
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 2,
            marginBottom: 32,
            textTransform: "uppercase",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.05,
            maxWidth: 920,
            textAlign: "center",
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            color: "#5B6475",
            fontSize: 30,
            lineHeight: 1.35,
            marginTop: 32,
            maxWidth: 860,
            textAlign: "center",
          }}
        >
          Software, AI, automation, cloud, and digital growth solutions.
        </div>
      </div>
    ),
    size
  );
}
