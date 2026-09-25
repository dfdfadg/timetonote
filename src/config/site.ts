/**
 * Central site configuration.
 *
 * Values that differ between environments (or that you may want to change
 * without touching code) are read from environment variables. See
 * `.env.example` for the full list.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://timetonote.com";

export const siteConfig = {
  name: "TimeToNote",
  /** Canonical origin, no trailing slash. */
  url: rawSiteUrl.replace(/\/+$/, ""),
  tagline: "Practical Answers for Everyday Problems",
  description:
    "Simple, useful guides that help you understand everyday problems, troubleshoot issues at home and with your tech, and find practical solutions.",
  locale: "en_US",
  language: "en",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "timetonoteoffical@gmail.com",
  /** Social profile URLs used in Organization schema `sameAs`. Leave empty until real profiles exist. */
  socialProfiles: [] as string[],
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || undefined,
  logoPath: "/logo.png",
  defaultOgImage: "/opengraph-image",
  /** Number of articles per page on category listings. */
  pageSize: 12,
} as const;

/** Build an absolute URL on the canonical host. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? siteConfig.url : `${siteConfig.url}${clean}`;
}

/**
 * True only on the real production deployment. Preview/development
 * deployments are kept out of search engines to avoid duplicate URLs.
 */
export const isProductionDeployment =
  process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";
