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
  { source: "/how-many-days-until-thanksgiving", destination: "/tools/days-until-thanksgiving" },
  { source: "/how-to-install-or-update-ios-18-on-iphone", destination: "/how-to-update-to-ios-27-on-iphone" },
  { source: "/how-to-improve-water-pressure-in-your-house", destination: "/how-to-increase-water-pressure-in-house" },
  { source: "/house-smells-musty", destination: "/why-does-my-room-smell-musty" },
  // Short URLs from an earlier version of the site that Google still has indexed.
  { source: "/house-so-dusty", destination: "/why-is-my-house-so-dusty" },
  { source: "/window-condensation", destination: "/why-is-there-condensation-on-my-windows" },
  { source: "/cleaning-is-essential-for-home-maintenance", destination: "/how-to-clean-a-dusty-house" },
  { source: "/tech", destination: "/tech-problems" },
  { source: "/home-improvement", destination: "/home-problems" },
  { source: "/tools/prozent-rechner", destination: "/tools/percentage-calculator" },
  { source: "/de/:path*", destination: "/tools" },

  // Old URLs still getting visits (Search Console, last 16 months) that were
  // returning 404. Each goes to the closest matching page on the new site.
  { source: "/intel-wireless-bluetooth-error-code-54", destination: "/why-does-my-bluetooth-keep-disconnecting" },
  { source: "/cable-internet-vs-fiber-optics", destination: "/why-is-my-internet-so-slow" },
  { source: "/seasonal-home-maintenance-checklist-for-2025-26", destination: "/home-problems" },
  { source: "/home-improvement-renovation-remodeling-diy-tip", destination: "/home-problems" },
  { source: "/home-improvement/:path*", destination: "/home-problems" },
  { source: "/tech/:path*", destination: "/tech-problems" },
  { source: "/write-for-us", destination: "/contact" },
  { source: "/sample-page", destination: "/" },
  // More old URLs from the previous WordPress site (Bing IndexNow history, Sept 2026).
  { source: "/how-many-days-until-halloween", destination: "/tools/days-until-halloween" },
  { source: "/how-many-days-until-black-friday", destination: "/when-is-black-friday" },
  { source: "/cyber-monday-30-tips-from-an-online-shopping", destination: "/when-is-black-friday" },
  { source: "/all-tools", destination: "/tools" },
  { source: "/keyword-cannibalization-checker", destination: "/tools/keyword-cannibalization-checker" },
  { source: "/:tool(mwst-rechner|google-review-calculator)", destination: "/tools" },
  { source: "/mold-no-water-damage", destination: "/why-does-my-room-smell-musty" },
  { source: "/home-problems-worsen", destination: "/home-problems" },
  { source: "/why-is-roof-repair-necessary", destination: "/signs-your-roof-needs-repair-or-replacement" },
  { source: "/how-to-maintain-and-repair-your-metal-roof", destination: "/signs-your-roof-needs-repair-or-replacement" },
  // Old German and SEO tools that no longer exist.
  {
    source:
      "/tools/:tool(google-review-calculator|impressum-generator|brutto-netto-rechner|mwst-rechner|rechnungs-generator|tage-rechner|iban-pruefer|ust-id-pruefung|local-seo-score-checker)",
    destination: "/tools",
  },
  // Old category archives for topics the site no longer covers.
  { source: "/:section(business|entertainment|gaming|security|education|pet|travel|sports)/:path*", destination: "/" },
];
