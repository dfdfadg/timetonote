import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { Marked, type Tokens } from "marked";
import { siteConfig } from "@/config/site";
import { slugify } from "@/lib/slug";

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface RenderedMarkdown {
  html: string;
  headings: Heading[];
  /** Internal (root-relative) link targets found in the content. */
  internalLinks: { href: string; text: string }[];
  plainText: string;
  wordCount: number;
}

const PUBLIC_DIR = path.join(process.cwd(), "public");

const escapeAttr = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const stripTags = (html: string) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const siteHost = new URL(siteConfig.url).host;

function isInternal(href: string): boolean {
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  try {
    const u = new URL(href);
    return u.host === siteHost || u.host === `www.${siteHost}`;
  } catch {
    return false;
  }
}

/** Normalise an internal href to a root-relative path without trailing slash. */
function toRootRelative(href: string): string {
  let pathPart = href;
  try {
    const u = new URL(href, siteConfig.url);
    pathPart = u.pathname + u.search + u.hash;
  } catch {
    /* keep as-is */
  }
  return pathPart.replace(/(.)\/+(?=$|[?#])/, "$1");
}

function localImageSize(src: string): { width: number; height: number } | undefined {
  if (!src.startsWith("/")) return undefined;
  try {
    const buffer = fs.readFileSync(path.join(PUBLIC_DIR, decodeURI(src)));
    const size = imageSize(buffer);
    if (size.width && size.height) return { width: size.width, height: size.height };
  } catch {
    /* fall through */
  }
  return undefined;
}

const CALLOUTS: Record<string, string> = {
  TIP: "Tip",
  NOTE: "Note",
  WARNING: "Safety note",
  IMPORTANT: "Important",
};

/**
 * Render article Markdown (GitHub-flavoured) to HTML on the server.
 *
 * - `#` headings inside content are demoted to `h2` (the page owns the only h1)
 * - `h2`/`h3` get stable ids and are collected for the table of contents
 * - local images get intrinsic width/height to avoid layout shift
 * - `> [!TIP]` style blockquotes become callouts
 * - wide tables are wrapped so they scroll on small screens
 */
export function renderMarkdown(markdown: string): RenderedMarkdown {
  const headings: Heading[] = [];
  const internalLinks: { href: string; text: string }[] = [];
  const usedIds = new Map<string, number>();

  const uniqueId = (text: string) => {
    const base = slugify(text) || "section";
    const count = usedIds.get(base) ?? 0;
    usedIds.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };

  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Heading) {
        const inner = this.parser.parseInline(token.tokens);
        const level = Math.min(Math.max(token.depth, 2), 6);
        const text = stripTags(inner).trim();
        const id = uniqueId(text);
        if (level === 2 || level === 3) headings.push({ id, text, level });
        return `<h${level} id="${id}">${inner}</h${level}>\n`;
      },
      link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Link) {
        const inner = this.parser.parseInline(token.tokens);
        const title = token.title ? ` title="${escapeAttr(token.title)}"` : "";
        if (token.href.startsWith("#")) return `<a href="${escapeAttr(token.href)}"${title}>${inner}</a>`;
        if (isInternal(token.href)) {
          const href = toRootRelative(token.href);
          internalLinks.push({ href, text: stripTags(inner).trim() });
          return `<a href="${escapeAttr(href)}"${title}>${inner}</a>`;
        }
        return `<a href="${escapeAttr(token.href)}"${title} rel="noopener" class="external">${inner}</a>`;
      },
      image(token: Tokens.Image) {
        const size = localImageSize(token.href);
        const dims = size ? ` width="${size.width}" height="${size.height}"` : "";
        const img = `<img src="${escapeAttr(token.href)}" alt="${escapeAttr(token.text)}"${dims} loading="lazy" decoding="async" />`;
        return token.title
          ? `<figure>${img}<figcaption>${escapeAttr(token.title)}</figcaption></figure>`
          : `<figure>${img}</figure>`;
      },
      table(this: unknown, token: Tokens.Table) {
        // Re-use the default table renderer, then wrap it.
        const defaultHtml = new Marked({ gfm: true }).parser([token as unknown as Tokens.Generic]);
        return `<div class="table-wrap">${defaultHtml}</div>\n`;
      },
      blockquote(this: { parser: { parse: (t: Tokens.Generic[]) => string } }, token: Tokens.Blockquote) {
        const body = this.parser.parse(token.tokens);
        const match = body.match(/^<p>\[!(TIP|NOTE|WARNING|IMPORTANT)\]\s*/);
        if (match) {
          const kind = match[1];
          const content = body.replace(match[0], "<p>").replace(/^<p><\/p>\s*/, "");
          return `<aside class="callout callout-${kind.toLowerCase()}" role="note"><p class="callout-title">${CALLOUTS[kind]}</p>${content}</aside>\n`;
        }
        return `<blockquote>${body}</blockquote>\n`;
      },
    },
  });

  const html = marked.parse(markdown, { async: false }) as string;
  const plainText = stripTags(html).replace(/\s+/g, " ").trim();
  const wordCount = plainText ? plainText.split(" ").length : 0;

  return { html, headings, internalLinks, plainText, wordCount };
}
