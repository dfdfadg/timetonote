/**
 * Content quality checks — run with `npm run content:check`.
 *
 * - slugs follow the URL rules (lowercase, hyphens, no category/date/IDs)
 * - no duplicate slugs or collisions with reserved paths
 * - required front matter present, dates valid, category/author exist
 * - relatedArticles point to real articles
 * - every internal link resolves to a real page
 * - anchor-text variety: warns when the same anchor text is reused for the
 *   same target across articles, and when an article links too often
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.resolve(import.meta.dirname, "..");
const dir = path.join(root, "content", "articles");

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CATEGORY_PATHS = ["home-problems", "tech-problems", "internet-apps", "everyday-solutions"];
const CATEGORIES = [...CATEGORY_PATHS, "tools"];
const STATIC = ["/", "/about", "/contact", "/privacy-policy", "/terms", "/disclaimer", "/editorial-policy", "/search", "/tools"];
const RESERVED = new Set([...CATEGORY_PATHS, ...STATIC.map((s) => s.slice(1)), "authors", "author", "blog", "category", "tag", "page", "api", "images"]);
const MAX_INTERNAL_LINKS_PER_1000_WORDS = 12;

const read = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const toolSlugs = [...read("src/data/tools.ts").matchAll(/slug: "([a-z0-9-]+)"/g)].map((m) => m[1]);
const authorSlugs = [...read("src/data/authors.ts").matchAll(/slug: "([a-z0-9-]+)"/g)].map((m) => m[1]);

const errors: string[] = [];
const warnings: string[] = [];

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
const articles = files.map((file) => {
  const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
  return { file, data, content };
});
const slugs = new Set(articles.map((a) => String(a.data.slug)));

const validPaths = new Set<string>([
  ...STATIC,
  ...CATEGORY_PATHS.map((c) => `/${c}`),
  ...[...slugs].map((s) => `/${s}`),
  ...toolSlugs.map((t) => `/tools/${t}`),
  ...authorSlugs.map((a) => `/authors/${a}`),
]);

const anchorUse = new Map<string, string[]>(); // "target|anchor" → files

for (const { file, data, content } of articles) {
  const where = `content/articles/${file}`;
  for (const key of ["title", "slug", "category", "description", "author", "publishedAt", "updatedAt"]) {
    if (!data[key]) errors.push(`${where}: missing \`${key}\``);
  }
  const slug = String(data.slug ?? "");
  if (!SLUG.test(slug)) errors.push(`${where}: slug "${slug}" must be lowercase words separated by hyphens`);
  if (RESERVED.has(slug)) errors.push(`${where}: slug "${slug}" is reserved`);
  if (CATEGORIES.some((c) => slug.startsWith(`${c}-`))) errors.push(`${where}: slug must not start with a category`);
  if (/(^|-)(19|20)\d{2}(-|$)/.test(slug)) errors.push(`${where}: slug should not contain a year`);
  if (/(^|-)\d{3,}(-|$)/.test(slug)) errors.push(`${where}: slug should not contain IDs`);
  if (file !== `${slug}.md`) errors.push(`${where}: file name must be ${slug}.md`);
  if (!CATEGORIES.includes(String(data.category))) errors.push(`${where}: unknown category "${data.category}"`);
  if (!authorSlugs.includes(String(data.author))) errors.push(`${where}: unknown author "${data.author}"`);
  if (String(data.description ?? "").length > 170) warnings.push(`${where}: description is ${String(data.description).length} chars (aim for ≤ 160)`);
  const title = String(data.seoTitle ?? data.title ?? "");
  if (title.length + " | TimeToNote".length > 70) warnings.push(`${where}: <title> will be ${title.length + 13} chars — consider a shorter seoTitle`);
  if (data.featuredImage && !data.featuredImage.alt) errors.push(`${where}: featuredImage.alt is required`);
  if (data.featuredImage?.src && !fs.existsSync(path.join(root, "public", data.featuredImage.src)))
    errors.push(`${where}: featured image not found: public${data.featuredImage.src}`);
  for (const rel of data.relatedArticles ?? []) {
    if (!slugs.has(rel)) errors.push(`${where}: relatedArticles → unknown slug "${rel}"`);
    if (rel === slug) errors.push(`${where}: an article cannot be related to itself`);
  }

  // Links (Markdown syntax), excluding images.
  const links = [...content.matchAll(/(?<!!)\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)];
  let internal = 0;
  for (const [, text, href] of links) {
    if (href.startsWith("#")) continue;
    if (/^https?:\/\/(www\.)?timetonote\.com/.test(href)) warnings.push(`${where}: use a root-relative link instead of ${href}`);
    if (!href.startsWith("/")) continue;
    internal++;
    const target = href.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
    if (!validPaths.has(target)) errors.push(`${where}: broken internal link → ${href}`);
    if (target === `/${slug}`) warnings.push(`${where}: links to itself`);
    if (/^\/(home-problems|tech-problems|internet-apps|everyday-solutions)\/.+/.test(target))
      errors.push(`${where}: article links must not include a category (${href})`);
    const key = `${target}|${text.toLowerCase().trim()}`;
    anchorUse.set(key, [...(anchorUse.get(key) ?? []), file]);
  }
  const words = content.split(/\s+/).length;
  if (internal > (words / 1000) * MAX_INTERNAL_LINKS_PER_1000_WORDS + 2)
    warnings.push(`${where}: ${internal} internal links in ~${words} words — avoid over-linking`);
}

for (const [key, usedIn] of anchorUse) {
  if (usedIn.length > 1) {
    const [target, anchor] = key.split("|");
    warnings.push(`anchor "${anchor}" → ${target} is used ${usedIn.length}× (${[...new Set(usedIn)].join(", ")}) — vary the wording`);
  }
}

for (const w of warnings) console.warn(`⚠ ${w}`);
for (const e of errors) console.error(`✗ ${e}`);
console.log(`\nChecked ${articles.length} articles: ${errors.length} error(s), ${warnings.length} warning(s).`);
process.exit(errors.length ? 1 : 0);
