import { siteConfig } from "@/config/site";
import { editorialCategories, getCategory } from "@/data/categories";
import { getAllArticles, getArticle } from "@/lib/articles";
import { ogSize, renderOgCard } from "@/lib/og";

export const alt = siteConfig.name;
export const size = ogSize;
export const contentType = "image/png";
export const dynamicParams = false;

export function generateStaticParams() {
  return [...editorialCategories.map((c) => ({ slug: c.slug })), ...getAllArticles().map((a) => ({ slug: a.slug }))];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (category) return renderOgCard({ title: category.name, eyebrow: "Guides", accent: category.accent });
  const article = getArticle(slug);
  return renderOgCard({
    title: article?.title ?? siteConfig.name,
    eyebrow: article?.categoryInfo.name,
    accent: article?.categoryInfo.accent,
  });
}
