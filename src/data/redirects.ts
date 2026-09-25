/**
 * Permanent redirects (308) applied by next.config.ts.
 *
 * Add legacy URLs from the old site here so existing links and rankings are
 * passed to the most relevant new page. Keep destinations root-relative.
 *
 * Example:
 *   { source: "/old-guest-post-slug", destination: "/why-is-my-house-so-dusty" },
 */
export interface Redirect {
  source: string;
  destination: string;
}

export const legacyRedirects: Redirect[] = [
  // Common legacy / CMS paths → closest new equivalents.
  { source: "/home", destination: "/" },
  { source: "/index.html", destination: "/" },
  { source: "/index.php", destination: "/" },
  { source: "/blog", destination: "/" },
  { source: "/blog/:slug", destination: "/:slug" },
  { source: "/category/:slug", destination: "/" },
  { source: "/tag/:slug", destination: "/search?q=:slug" },
  { source: "/author/:slug", destination: "/about" },
  { source: "/authors", destination: "/about" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/about-us", destination: "/about" },
  { source: "/privacy", destination: "/privacy-policy" },
  { source: "/terms-and-conditions", destination: "/terms" },
  { source: "/tool", destination: "/tools" },
  { source: "/useful-tools", destination: "/tools" },
  { source: "/feed", destination: "/" },
];
