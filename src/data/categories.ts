/**
 * Content categories.
 *
 * Categories have their own landing pages (e.g. /home-problems) but they are
 * NEVER part of an article URL. Articles always live at /{article-slug}.
 */

export type CategorySlug =
  | "home-problems"
  | "tech-problems"
  | "internet-apps"
  | "everyday-solutions"
  | "tools";

export interface Category {
  slug: CategorySlug;
  /** Full display name. */
  name: string;
  /** Short label for navigation. */
  navLabel: string;
  /** Landing page path. */
  path: string;
  /** Meta title for the landing page. */
  title: string;
  /** Meta description + intro for the landing page. */
  description: string;
  /** One-line summary used on cards. */
  summary: string;
  /** Accent token used in the UI (see globals.css). */
  accent: "amber" | "blue" | "violet" | "emerald" | "rose";
}

export const categories: Category[] = [
  {
    slug: "home-problems",
    name: "Home Problems",
    navLabel: "Home Problems",
    path: "/home-problems",
    title: "Home Problems: Causes and Practical Fixes",
    description:
      "Clear explanations and step-by-step fixes for common household problems: dust, smells, damp, pests, noises and the small things that make a home harder to live in.",
    summary: "Dust, smells, damp and the everyday issues that come with running a home.",
    accent: "amber",
  },
  {
    slug: "tech-problems",
    name: "Tech Problems",
    navLabel: "Tech Problems",
    path: "/tech-problems",
    title: "Tech Problems: Troubleshooting Guides for Devices",
    description:
      "Plain-English troubleshooting for phones, laptops, chargers and gadgets. Start with the simple checks, then work through the fixes that actually solve the problem.",
    summary: "Phones, laptops and gadgets that stop working the way they should.",
    accent: "blue",
  },
  {
    slug: "internet-apps",
    name: "Internet & Apps",
    navLabel: "Internet & Apps",
    path: "/internet-apps",
    title: "Internet & Apps: Fix Connection and App Problems",
    description:
      "Guides for Wi-Fi drops, slow connections, apps that crash or won't load, and the settings that are usually to blame.",
    summary: "Wi-Fi, connections, browsers and the apps you rely on every day.",
    accent: "violet",
  },
  {
    slug: "everyday-solutions",
    name: "Everyday Solutions",
    navLabel: "Everyday Solutions",
    path: "/everyday-solutions",
    title: "Everyday Solutions: Simple Fixes for Daily Annoyances",
    description:
      "Practical, low-cost solutions to the small problems that come up in daily life, with tested methods explained simply.",
    summary: "Simple, low-cost fixes for the small annoyances of daily life.",
    accent: "emerald",
  },
  {
    slug: "tools",
    name: "Useful Tools",
    navLabel: "Tools",
    path: "/tools",
    title: "Free Useful Tools: Calculators and Text Utilities",
    description:
      "Free, fast, private browser tools: calculators, counters and checkers that run on your device with no sign-up.",
    summary: "Free calculators and utilities that run right in your browser.",
    accent: "rose",
  },
];

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string): Category | undefined {
  return categoryBySlug.get(slug as CategorySlug);
}

/** Categories that are served by the root-level `/[slug]` route. */
export const editorialCategories = categories.filter((c) => c.slug !== "tools");
