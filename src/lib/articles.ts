import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { imageSize } from "image-size";
import { absoluteUrl } from "@/config/site";
import { getAuthor, type Author } from "@/data/authors";
import { getCategory, type Category, type CategorySlug } from "@/data/categories";
import { renderMarkdown, type Heading } from "@/lib/markdown";
import { validateSlug } from "@/lib/slug";

/**
 * Article content lives in /content/articles/{slug}.md as Markdown with YAML
 * front matter. Everything is read at build time; pages are statically
 * generated. See README.md → "Adding an article".
 */

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
const WORDS_PER_MINUTE = 225;

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FeaturedImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  category: CategorySlug;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  featuredImage?: { src: string; alt: string; caption?: string };
  tags: string[];
  relatedArticles?: string[];
  faq?: FaqItem[];
  /** Absolute canonical override. Defaults to https://timetonote.com/{slug}. */
  canonical?: string;
  noindex?: boolean;
  draft?: boolean;
  /** Short label for chips and compact lists; defaults to `title`. */
  shortTitle?: string;
  /** Optional alternative <title>; defaults to `title`. */
  seoTitle?: string;
  /** Editor-curated rank for "Popular Problems" (1 = most prominent). */
  popular?: number;
  /** Show the table of contents (default: auto when 3+ sections). */
  toc?: boolean;
}

export interface Article extends Omit<ArticleFrontmatter, "featuredImage"> {
  path: string;
  url: string;
  canonical: string;
  categoryInfo: Category;
  authorInfo: Author;
  featuredImage?: FeaturedImage;
  html: string;
  headings: Heading[];
  internalLinks: { href: string; text: string }[];
  plainText: string;
  wordCount: number;
  readingMinutes: number;
  showToc: boolean;
}

export type ArticleSummary = Pick<
  Article,
  | "slug"
  | "title"
  | "shortTitle"
  | "description"
  | "path"
  | "category"
  | "categoryInfo"
  | "publishedAt"
  | "updatedAt"
  | "readingMinutes"
  | "featuredImage"
  | "tags"
>;

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function fail(file: string, message: string): never {
  throw new Error(`[content] ${file}: ${message}`);
}

function toDateString(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value;
  return undefined;
}

function readFeaturedImage(
  file: string,
  image: ArticleFrontmatter["featuredImage"],
): FeaturedImage | undefined {
  if (!image) return undefined;
  if (!image.src || !image.alt) fail(file, "featuredImage needs both `src` and `alt`");
  const diskPath = path.join(process.cwd(), "public", image.src);
  if (!fs.existsSync(diskPath)) fail(file, `featured image not found: public${image.src}`);
  const { width, height } = imageSize(fs.readFileSync(diskPath));
  if (!width || !height) fail(file, `could not read size of ${image.src}`);
  return { ...image, width, height };
}

function parseArticle(fileName: string): Article {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<ArticleFrontmatter> & Record<string, unknown>;

  for (const key of ["title", "slug", "category", "description", "author", "publishedAt", "updatedAt"] as const) {
    if (!fm[key]) fail(fileName, `missing required front matter field \`${key}\``);
  }

  const slug = String(fm.slug);
  const slugProblems = validateSlug(slug);
  if (slugProblems.length) fail(fileName, `slug "${slug}" ${slugProblems.join("; ")}`);
  if (fileName !== `${slug}.md`) fail(fileName, `file name must match slug (${slug}.md)`);

  const categoryInfo = getCategory(String(fm.category));
  if (!categoryInfo) fail(fileName, `unknown category "${fm.category}"`);
  const authorInfo = getAuthor(String(fm.author));
  if (!authorInfo) fail(fileName, `unknown author "${fm.author}" (add it to src/data/authors.ts)`);

  const publishedAt = toDateString(fm.publishedAt)!;
  const updatedAt = toDateString(fm.updatedAt)!;
  if (!DATE_PATTERN.test(publishedAt) || !DATE_PATTERN.test(updatedAt))
    fail(fileName, "dates must use YYYY-MM-DD");
  if (updatedAt < publishedAt) fail(fileName, "updatedAt cannot be before publishedAt");

  const rendered = renderMarkdown(content);
  const articlePath = `/${slug}`;
  const faq = Array.isArray(fm.faq) ? (fm.faq as FaqItem[]) : undefined;

  return {
    title: String(fm.title),
    seoTitle: fm.seoTitle ? String(fm.seoTitle) : undefined,
    shortTitle: fm.shortTitle ? String(fm.shortTitle) : undefined,
    slug,
    category: categoryInfo.slug,
    description: String(fm.description),
    author: authorInfo.slug,
    publishedAt,
    updatedAt,
    tags: Array.isArray(fm.tags) ? fm.tags.map(String) : [],
    relatedArticles: Array.isArray(fm.relatedArticles) ? fm.relatedArticles.map(String) : [],
    faq: faq?.length ? faq : undefined,
    noindex: Boolean(fm.noindex),
    draft: Boolean(fm.draft),
    popular: typeof fm.popular === "number" ? fm.popular : undefined,
    path: articlePath,
    url: absoluteUrl(articlePath),
    canonical: fm.canonical ? String(fm.canonical) : absoluteUrl(articlePath),
    categoryInfo,
    authorInfo,
    featuredImage: readFeaturedImage(fileName, fm.featuredImage as ArticleFrontmatter["featuredImage"]),
    html: rendered.html,
    headings: rendered.headings,
    internalLinks: rendered.internalLinks,
    plainText: rendered.plainText,
    wordCount: rendered.wordCount,
    readingMinutes: Math.max(1, Math.ceil(rendered.wordCount / WORDS_PER_MINUTE)),
    showToc:
      typeof fm.toc === "boolean" ? fm.toc : rendered.headings.filter((h) => h.level === 2).length >= 3,
  };
}

let cache: Article[] | undefined;

/** All published articles, newest first. Drafts are only included in development. */
export function getAllArticles(): Article[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = fs.existsSync(ARTICLES_DIR)
    ? fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    : [];
  const includeDrafts = process.env.NODE_ENV === "development";
  const articles = files
    .map(parseArticle)
    .filter((a) => includeDrafts || !a.draft)
    .sort((a, b) =>
      b.publishedAt === a.publishedAt ? a.title.localeCompare(b.title) : b.publishedAt.localeCompare(a.publishedAt),
    );

  const seen = new Set<string>();
  for (const a of articles) {
    if (seen.has(a.slug)) throw new Error(`[content] duplicate slug "${a.slug}"`);
    seen.add(a.slug);
  }
  cache = articles;
  return articles;
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

/** Articles that should appear in listings, search and the sitemap. */
export function getIndexableArticles(): Article[] {
  return getAllArticles().filter((a) => !a.noindex);
}

export function getArticlesByCategory(category: CategorySlug): Article[] {
  return getIndexableArticles().filter((a) => a.category === category);
}

export function getLatestArticles(limit = 6): Article[] {
  return getIndexableArticles().slice(0, limit);
}

/** Editor-curated popular articles; falls back to latest when none are marked. */
export function getPopularArticles(limit = 6): Article[] {
  const ranked = getIndexableArticles()
    .filter((a) => a.popular !== undefined)
    .sort((a, b) => (a.popular ?? 0) - (b.popular ?? 0));
  return (ranked.length ? ranked : getIndexableArticles()).slice(0, limit);
}

/**
 * Related articles: explicitly listed ones first, then the closest matches by
 * shared tags and category.
 */
export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const all = getIndexableArticles().filter((a) => a.slug !== article.slug);
  const explicit = (article.relatedArticles ?? [])
    .map((slug) => all.find((a) => a.slug === slug))
    .filter((a): a is Article => Boolean(a));

  const scored = all
    .filter((a) => !explicit.includes(a))
    .map((a) => {
      const sharedTags = a.tags.filter((t) => article.tags.includes(t)).length;
      const score = sharedTags * 2 + (a.category === article.category ? 3 : 0);
      return { a, score };
    })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score || y.a.publishedAt.localeCompare(x.a.publishedAt))
    .map((x) => x.a);

  return [...explicit, ...scored].slice(0, limit);
}

export function toSummary(a: Article): ArticleSummary {
  return {
    slug: a.slug,
    title: a.title,
    shortTitle: a.shortTitle,
    description: a.description,
    path: a.path,
    category: a.category,
    categoryInfo: a.categoryInfo,
    publishedAt: a.publishedAt,
    updatedAt: a.updatedAt,
    readingMinutes: a.readingMinutes,
    featuredImage: a.featuredImage,
    tags: a.tags,
  };
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  return {
    items: items.slice((page - 1) * pageSize, page * pageSize),
    page,
    totalPages,
  };
}
