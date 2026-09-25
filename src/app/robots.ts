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
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
