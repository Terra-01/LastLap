import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = "LastLap — Sim Racing Lounge & Cafe in Bengaluru";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social card. Text-only and default font (no asset fetch) so it can't
// fail at build. Feeds og:image and the Twitter large-image card.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          color: "#FFFFFF",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            color: "#B81D1D",
          }}
        >
          SIM RACING LOUNGE & CAFE
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 150, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", width: 104, height: 8, background: "#B81D1D", margin: "30px 0" }} />
          <div style={{ display: "flex", fontSize: 46, color: "rgba(255,255,255,0.82)" }}>
            {"Drive the cars you've always wanted."}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.6)" }}>
          {`${site.openingLine}, Bengaluru`}
        </div>
      </div>
    ),
    { ...size },
  );
}
