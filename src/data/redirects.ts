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
  { source: "/page/:n", destination: "/" },

  // Old URLs from the previous site with a close match on the new site
  // (from Search Console data, 2026-09-25).
  { source: "/how-many-days-until-christmas", destination: "/tools/days-until-christmas" },
  { source: "/how-to-improve-water-pressure-in-your-house", destination: "/how-to-increase-water-pressure-in-house" },
  { source: "/house-smells-musty", destination: "/why-does-my-room-smell-musty" },
  { source: "/house-humid-with-ac", destination: "/why-does-my-room-smell-musty" },
  { source: "/cleaning-is-essential-for-home-maintenance", destination: "/how-to-clean-a-dusty-house" },
  { source: "/tech", destination: "/tech-problems" },
  { source: "/home-improvement", destination: "/home-problems" },
  { source: "/tools/prozent-rechner", destination: "/tools/percentage-calculator" },
  { source: "/de/:path*", destination: "/tools" },
];
