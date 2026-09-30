import type { NextConfig } from "next";
import { legacyRedirects } from "./src/data/redirects";

const CANONICAL_HOST = "timetonote.com";
/** Other hosts that serve production and must 308 to the canonical host. */
const ALIAS_HOSTS = [`www.${CANONICAL_HOST}`, "timetonote.vercel.app"];

const EDITORIAL_CATEGORIES = "home-problems|tech-problems|internet-apps|everyday-solutions";

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
  // sharp is only used by build scripts; Vercel optimizes images itself.
  // Keeping it (and its ~47 MB of native binaries) out of every function
  // bundle cuts Vercel Functions storage per deployment by about 80%.
  outputFileTracingExcludes: {
    "/**": ["node_modules/sharp/**", "node_modules/@img/**"],
  },
  images: {
    // Source images are already WebP, so skip AVIF: each extra format doubles
    // Vercel image transformations. Fewer widths and a long cache TTL keep
    // transformations and cache writes low.
    formats: ["image/webp"],
    deviceSizes: [640, 828, 1200, 1600],
    imageSizes: [96, 256, 384],
    qualities: [75],
    minimumCacheTTL: 2678400, // 31 days
  },

  async redirects() {
    return [
      // www and the default *.vercel.app domain → https://timetonote.com (one canonical host).
      ...ALIAS_HOSTS.map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      })),
      // Categories use "Load more" instead of numbered pages: /tech-problems/page/2 → /tech-problems
      {
        source: `/:category(${EDITORIAL_CATEGORIES})/page/:n`,
        destination: "/:category",
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
