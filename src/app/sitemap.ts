import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { authors } from "@/data/authors";
import { categories } from "@/data/categories";
import { staticPages, staticPagesUpdatedAt } from "@/data/pages";
import { tools, toolPath } from "@/data/tools";
import { getArticlesByCategory, getIndexableArticles, paginate } from "@/lib/articles";

/**
 * XML sitemap: homepage, categories (+ pagination), articles, tools, authors
 * and static pages. Search pages and noindex articles are excluded. Only
 * canonical URLs are listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getIndexableArticles().filter((a) => a.canonical === absoluteUrl(a.path));
  const latest = (dates: string[]) => dates.reduce((max, d) => (d > max ? d : max), staticPagesUpdatedAt);

  const home: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: latest(articles.map((a) => a.updatedAt)), changeFrequency: "daily", priority: 1 },
  ];

  const categoryEntries: MetadataRoute.Sitemap = categories.flatMap((c) => {
    const items = getArticlesByCategory(c.slug);
    const lastModified = latest(items.map((a) => a.updatedAt));
    const { totalPages } = paginate(items, 1, siteConfig.pageSize);
    return [
      { url: absoluteUrl(c.path), lastModified, changeFrequency: "weekly" as const, priority: 0.8 },
      ...Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
        url: absoluteUrl(`${c.path}/page/${i + 2}`),
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.4,
      })),
    ];
  });

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: a.url,
    lastModified: a.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
    ...(a.featuredImage ? { images: [absoluteUrl(a.featuredImage.src)] } : {}),
  }));

  const toolEntries: MetadataRoute.Sitemap = tools.map((t) => ({
    url: absoluteUrl(toolPath(t.slug)),
    lastModified: t.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const authorEntries: MetadataRoute.Sitemap = authors.map((a) => ({
    url: absoluteUrl(`/authors/${a.slug}`),
    lastModified: latest(articles.filter((x) => x.author === a.slug).map((x) => x.updatedAt)),
    changeFrequency: "monthly",
    priority: 0.3,
  }));

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: absoluteUrl(p.path),
    lastModified: staticPagesUpdatedAt,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [...home, ...categoryEntries, ...articleEntries, ...toolEntries, ...authorEntries, ...staticEntries];
}
