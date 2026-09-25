# TimeToNote

**Practical Answers for Everyday Problems** — the source for [timetonote.com](https://timetonote.com).

A fast, statically generated editorial site built with Next.js (App Router), TypeScript and Tailwind CSS. Guides live as Markdown files; pages are rendered on the server at build time and ship almost no JavaScript.

## URL structure

| Page type | URL | Example |
| --- | --- | --- |
| Article | `/{slug}` | `/why-is-my-house-so-dusty` |
| Category | `/{category}` | `/home-problems` |
| Category pagination | `/{category}/page/{n}` (n ≥ 2) | `/home-problems/page/2` |
| Tools hub (Useful Tools category) | `/tools` | `/tools` |
| Tool | `/tools/{tool}` | `/tools/word-counter` |
| Author | `/authors/{author}` | `/authors/agha-ali-abbas` |
| Static pages | `/about`, `/contact`, `/privacy-policy`, `/terms`, `/disclaimer`, `/editorial-policy` | |
| Search (noindex) | `/search?q=…` | |

**Articles never include their category in the URL.** `/home-problems/why-is-my-house-so-dusty` permanently redirects to `/why-is-my-house-so-dusty`. Canonical URLs use `https://timetonote.com` (no `www`, no trailing slash). `www.timetonote.com`, `timetonote.vercel.app` and trailing-slash URLs 308-redirect to the canonical form (see `next.config.ts`).

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — every variable has a sensible default
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Content checks, then a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate route types and run `tsc` |
| `npm run content:check` | Validate slugs, front matter, internal links and anchor-text variety |
| `npm run images` | Regenerate the brand assets and sample illustrations |

Requires Node.js 20.9 or newer.

## Adding an article

1. Copy `content/articles/_template.md` to `content/articles/{slug}.md`.
2. Fill in the front matter (`title`, `slug`, `category`, `description`, `author`, `publishedAt`, `updatedAt`, `featuredImage`, `tags`, and optionally `relatedArticles`, `faq`, `canonical`, `noindex`, `popular`, `seoTitle`, `shortTitle`, `toc`, `draft`).
3. Put the featured image in `public/images/articles/` (WebP, 1600×900 recommended) with meaningful `alt` text.
4. Write the guide in Markdown. Use `##` for main sections and `###` for sub-sections — the page owns the only `<h1>`.
5. Link to other guides with root-relative URLs and natural, varied anchor text, e.g. `[common causes of household dust](/why-is-my-house-so-dusty)`.
6. Run `npm run content:check`, then commit. The homepage, category pages, related guides, search, sitemap and structured data all update automatically.

### Slug rules

Lowercase words separated by single hyphens · descriptive · permanent · **no** category prefix, dates, IDs, random numbers or locations (unless the article is genuinely about that place). Slugs must not collide with reserved paths such as `about`, `tools` or a category slug. These rules are enforced at build time (`src/lib/slug.ts`).

### Changing a slug

Avoid it. If you must, add a redirect from the old URL in `src/data/redirects.ts`.

## Project structure

```
content/articles/        Markdown guides (one file per article)
public/images/           Featured and in-article images
scripts/                 content checker, image generator
src/app/                 Routes (App Router)
  [slug]/                Root-level resolver: articles + category landing pages
  [slug]/page/[page]/    Category pagination
  tools/                 Tools hub and /tools/[tool]
  authors/[author]/      Author pages
  search/                Server-rendered search (noindex)
  sitemap.ts robots.ts   Generated sitemap.xml and robots.txt
src/components/          UI components (layout, article, category, tools, ui, seo)
src/config/site.ts       Site name, URL, contact email, page size
src/data/                Categories, authors, tools, navigation, redirects
src/lib/                 Content loading, Markdown rendering, search, metadata, JSON-LD
```

Content and data (`content/`, `src/data/`) are kept separate from UI components.

## Adding other things

- **Category:** add it to `src/data/categories.ts`, the `CategorySlug` type, `RESERVED_SLUGS` in `src/lib/slug.ts`, `EDITORIAL_CATEGORIES` in `next.config.ts`, the navigation in `src/data/navigation.ts`, an icon in `src/components/ui/Icons.tsx`, and `CATEGORY_PATHS` in `scripts/check-content.ts`.
- **Tool:** add metadata to `src/data/tools.ts`, create a client component in `src/components/tools/`, and register it in `src/components/tools/registry.tsx`. Each tool is code-split.
- **Author:** add a real person to `src/data/authors.ts` (with an optional square photo in `public/images/authors/`). Do not create fictional authors.
- **Legacy redirects:** add old URLs to `src/data/redirects.ts`.

## SEO features

- Unique titles, meta descriptions and self-referencing canonical URLs on every indexable page
- Open Graph and X/Twitter cards, with branded 1200×630 images generated at build time
- JSON-LD: `Organization`, `WebSite` (with `SearchAction`), `Article`, `BreadcrumbList`, `FAQPage` (only when an article has FAQs), `CollectionPage`, `WebApplication` (tools) and `ProfilePage` (authors)
- Dynamic `sitemap.xml` (homepage, categories + pagination, articles, tools, authors, static pages — no search or noindex URLs)
- `robots.txt` referencing the sitemap; internal search result URLs are disallowed and `/search` sends `noindex, follow`
- Preview deployments (`VERCEL_ENV` ≠ `production`) are `noindex` and disallowed in robots.txt to avoid duplicate URLs
- Semantic HTML, a single `<h1>` per page, correct heading hierarchy, breadcrumbs, descriptive links, image `alt` text

## Deployment (Vercel)

1. Import this GitHub repository in Vercel (framework preset: **Next.js**, no build settings to change).
2. Add environment variables from `.env.example` under **Settings → Environment Variables** (all optional).
3. Under **Settings → Domains** add `timetonote.com` and `www.timetonote.com`. Set `timetonote.com` as the primary domain and choose **Redirect to timetonote.com (308)** for `www`.
4. Add the DNS records Vercel shows for each domain at your domain registrar/DNS provider, then wait for verification and SSL.
5. Submit `https://timetonote.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
