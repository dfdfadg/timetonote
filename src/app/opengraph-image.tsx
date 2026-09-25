import { siteConfig } from "@/config/site";
import { ogSize, renderOgCard } from "@/lib/og";

export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({ title: "Find Practical Answers to Everyday Problems", eyebrow: siteConfig.tagline });
}
