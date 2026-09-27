import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.tagline,
    start_url: "/",
    display: "browser",
    background_color: "#fbfaf7",
    theme_color: "#0d6b5e",
    icons: [
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/logo.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
