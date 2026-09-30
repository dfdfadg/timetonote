import type { MetadataRoute } from "next";
import { absoluteUrl, isProductionDeployment } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Preview and development deployments must never be crawled.
  if (!isProductionDeployment) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Internal search result URLs create near-infinite, thin pages.
        // The /search page itself also sends `noindex`.
        disallow: ["/search?", "/api/"],
      },
      // SEO and data scrapers crawl heavily, use up Vercel request limits and
      // bring no visitors. Search engines and AI assistants stay allowed.
      {
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot", "PetalBot", "Bytespider", "DataForSeoBot", "BLEXBot", "serpstatbot", "barkrowler"],
        disallow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
