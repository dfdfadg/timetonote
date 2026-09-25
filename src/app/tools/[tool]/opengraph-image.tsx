import { siteConfig } from "@/config/site";
import { getTool, tools } from "@/data/tools";
import { ogSize, renderOgCard } from "@/lib/og";

export const alt = `Free tool from ${siteConfig.name}`;
export const size = ogSize;
export const contentType = "image/png";
export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((t) => ({ tool: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  return renderOgCard({ title: getTool(tool)?.name ?? "Free tools", eyebrow: "Free tool", accent: "rose" });
}
