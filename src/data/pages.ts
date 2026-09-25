/** Static informational pages that live at root-level URLs. */
export const staticPages = [
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/editorial-policy", label: "Editorial Policy" },
  { path: "/privacy-policy", label: "Privacy Policy" },
  { path: "/terms", label: "Terms of Use" },
  { path: "/disclaimer", label: "Disclaimer" },
] as const;

/** Last meaningful update of the legal/static pages (used in the sitemap). */
export const staticPagesUpdatedAt = "2026-09-25";
