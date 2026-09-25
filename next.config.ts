import type { NextConfig } from "next";
import { legacyRedirects } from "./src/data/redirects";

const EDITORIAL_CATEGORIES = "home-problems|tech-problems|internet-apps|everyday-solutions";
const CANONICAL_HOST = "timetonote.com";

/** Preview deployments on Vercel must never be indexed (avoids duplicate URLs). */
const isPreview = process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== "production";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Canonical URLs have no trailing slash: /about/ → 308 → /about
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      // www → apex (Vercel's domain redirect should also be configured; this is a safety net).
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${CANONICAL_HOST}` }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
      // Articles are never nested under categories:
      // /home-problems/why-is-my-house-so-dusty → /why-is-my-house-so-dusty
      {
        source: `/:category(${EDITORIAL_CATEGORIES})/:slug((?!page$)[a-z0-9-]+)`,
        destination: "/:slug",
        permanent: true,
      },
      ...legacyRedirects.map((r) => ({ ...r, permanent: true })),
    ];
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Internal search results must not be indexed.
      { source: "/search", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
      ...(isPreview ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }] : []),
    ];
  },
};

export default nextConfig;
