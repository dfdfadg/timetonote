import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { siteConfig } from "@/config/site";
import { editorialCategories, getCategory } from "@/data/categories";
import { getArticlesByCategory, paginate, toSummary } from "@/lib/articles";
import { pageMetadata } from "@/lib/metadata";
import { CategoryView } from "@/components/category/CategoryView";

/**
 * Paginated category listings: /{category}/page/{n} (n ≥ 2).
 * Each page is self-canonical and indexable; page 1 lives at /{category}.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return editorialCategories.flatMap((c) => {
    const { totalPages } = paginate(getArticlesByCategory(c.slug), 1, siteConfig.pageSize);
    return Array.from({ length: totalPages }, (_, i) => ({ slug: c.slug, page: String(i + 1) }));
  });
}

function resolve(slug: string, pageParam: string) {
  const category = getCategory(slug);
  const page = Number(pageParam);
  if (!category || !Number.isInteger(page) || page < 1 || String(page) !== pageParam) return null;
  const result = paginate(getArticlesByCategory(category.slug), page, siteConfig.pageSize);
  if (page > result.totalPages) return null;
  return { category, ...result };
}

export async function generateMetadata({ params }: PageProps<"/[slug]/page/[page]">): Promise<Metadata> {
  const { slug, page } = await params;
  const data = resolve(slug, page);
  if (!data) return {};
  return pageMetadata({
    title: `${data.category.name} — Page ${data.page}`,
    description: `${data.category.description} Page ${data.page} of ${data.totalPages}.`,
    path: `${data.category.path}/page/${data.page}`,
  });
}

export default async function CategoryPaginated({ params }: PageProps<"/[slug]/page/[page]">) {
  const { slug, page } = await params;
  const data = resolve(slug, page);
  if (!data) notFound();
  if (data.page === 1) permanentRedirect(data.category.path);
  return (
    <CategoryView
      category={data.category}
      articles={data.items.map(toSummary)}
      page={data.page}
      totalPages={data.totalPages}
    />
  );
}
