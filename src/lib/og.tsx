import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };

const logoMark = `data:image/png;base64,${fs
  .readFileSync(path.join(process.cwd(), "public", "brand", "logo-mark.png"))
  .toString("base64")}`;

const ACCENTS: Record<string, string> = {
  amber: "#9a5b00",
  blue: "#1d4ed8",
  violet: "#6d28d9",
  emerald: "#047857",
  rose: "#be123c",
  brand: "#0d6b5e",
};

/** Branded 1200×630 social card used for Open Graph and X/Twitter. */
export function renderOgCard({ title, eyebrow, accent = "brand" }: { title: string; eyebrow?: string; accent?: string }) {
  const color = ACCENTS[accent] ?? ACCENTS.brand;
  const fontSize = title.length > 70 ? 56 : title.length > 45 ? 66 : 76;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfaf7",
          padding: "72px 80px",
          borderTop: `18px solid ${color}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoMark} width={64} height={64} alt="" />
          <div style={{ fontSize: 34, fontWeight: 700, color: "#16181d" }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow && (
            <div style={{ fontSize: 28, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: 2 }}>
              {eyebrow}
            </div>
          )}
          <div style={{ marginTop: 18, fontSize, fontWeight: 700, lineHeight: 1.1, color: "#16181d", letterSpacing: -1 }}>
            {title}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#5d6370" }}>{`${siteConfig.tagline} · timetonote.com`}</div>
      </div>
    ),
    ogSize,
  );
}
