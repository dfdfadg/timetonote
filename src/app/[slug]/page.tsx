import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { editorialCategories, getCategory } from "@/data/categories";
import {
  getAllArticles,
  getArticle,
  getArticlesByCategory,
  getRelatedArticles,
  toSummary,
} from "@/lib/articles";
import { pageMetadata } from "@/lib/metadata";
import { ArticleView } from "@/components/article/ArticleView";
import { CategoryView } from "@/components/category/CategoryView";

/**
 * Root-level resolver.
 *
 *   /{article-slug}   → article   (e.g. /why-is-my-house-so-dusty)
 *   /{category-slug}  → category landing page (e.g. /home-problems)
 *
 * Articles are never nested under their category. Every valid path is
 * generated at build time; anything else is a 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...editorialCategories.map((c) => ({ slug: c.slug })),
    ...getAllArticles().map((a) => ({ slug: a.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;

  const category = getCategory(slug);
  if (category) {
    return pageMetadata({ title: category.title, description: category.description, path: category.path });
  }

  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.seoTitle ?? article.title,
    description: article.description,
    path: article.path,
    canonical: article.canonical,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: [article.authorInfo.name],
    section: article.categoryInfo.name,
    tags: article.tags,
    noindex: article.noindex,
  });
}

export default async function SlugPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;

  const category = getCategory(slug);
  if (category) {
    return <CategoryView category={category} articles={getArticlesByCategory(category.slug).map(toSummary)} />;
  }

  const article = getArticle(slug);
  if (!article) notFound();
  return <ArticleView article={article} related={getRelatedArticles(article)} />;
}
