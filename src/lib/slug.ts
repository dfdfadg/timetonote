/**
 * Slug rules for article URLs (https://timetonote.com/{slug}).
 *
 * - lowercase ASCII letters, digits and single hyphens
 * - no leading/trailing hyphen
 * - no category prefix, no dates, no IDs
 * - must not collide with reserved top-level paths
 */

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Top-level paths that are used by the site and cannot be article slugs. */
export const RESERVED_SLUGS = new Set([
  "about",
  "contact",
  "privacy-policy",
  "terms",
  "disclaimer",
  "editorial-policy",
  "search",
  "tools",
  "authors",
  "author",
  "api",
  "blog",
  "category",
  "tag",
  "page",
  "feed",
  "rss",
  "sitemap",
  "sitemap.xml",
  "robots.txt",
  "home-problems",
  "tech-problems",
  "internet-apps",
  "everyday-solutions",
  "images",
  "_next",
]);

/** Common filler words that rarely belong in a slug. */
const STOP_WORDS = new Set(["a", "an", "the", "and", "or", "of", "for", "to", "in", "on", "your", "you"]);

/**
 * Turn a title into a clean slug. Stop words are only removed when
 * `compact` is true, because some ("how-to", "is-my") carry meaning.
 */
export function slugify(input: string, { compact = false } = {}): string {
  const words = input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const kept = compact ? words.filter((w) => !STOP_WORDS.has(w)) : words;
  return kept.join("-");
}

/** Returns a list of problems with a slug (empty when valid). */
export function validateSlug(slug: string): string[] {
  const problems: string[] = [];
  if (!SLUG_PATTERN.test(slug)) problems.push("must be lowercase words separated by single hyphens");
  if (RESERVED_SLUGS.has(slug)) problems.push("is a reserved top-level path");
  if (/(^|-)(19|20)\d{2}(-|$)/.test(slug)) problems.push("should not contain a year/date");
  if (/(^|-)\d{3,}(-|$)/.test(slug)) problems.push("should not contain IDs or long numbers");
  if (/^(home-problems|tech-problems|internet-apps|everyday-solutions|tools|blog|category)-/.test(slug))
    problems.push("must not start with a category prefix");
  if (slug.length > 75) problems.push("is too long (max 75 characters)");
  return problems;
}
