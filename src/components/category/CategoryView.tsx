import type { ReactNode } from "react";
import type { Category } from "@/data/categories";
import type { ArticleSummary } from "@/lib/articles";
import { breadcrumbSchema, collectionPageSchema, type Crumb } from "@/lib/schema";
import { ArticleCard } from "@/components/article/ArticleCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { categoryIcons } from "@/components/ui/Icons";
import { Pagination } from "@/components/ui/Pagination";

export function CategoryView({
  category,
  articles,
  page,
  totalPages,
  children,
  schemaItems,
}: {
  category: Category;
  articles: ArticleSummary[];
  page: number;
  totalPages: number;
  /** Extra content rendered above the article grid (e.g. tools). */
  children?: ReactNode;
  /** Items listed in CollectionPage schema (defaults to the articles). */
  schemaItems?: { name: string; path: string }[];
}) {
  const pagePath = page === 1 ? category.path : `${category.path}/page/${page}`;
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: category.name, path: category.path },
    ...(page > 1 ? [{ name: `Page ${page}`, path: pagePath }] : []),
  ];
  const Icon = categoryIcons[category.slug];

  return (
    <>
      <div data-accent={category.accent} className="border-b border-line bg-surface">
        <Container className="pb-12 pt-8 sm:pt-10">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {category.name}
                {page > 1 && <span className="text-muted"> — page {page}</span>}
              </h1>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">{category.description}</p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="pt-12">
        {children}
        {articles.length > 0 ? (
          <section aria-labelledby="guides-heading">
            <h2 id="guides-heading" className="mb-6 font-serif text-2xl font-semibold tracking-tight text-ink">
              {page === 1 ? `Latest ${category.name.toLowerCase()} guides` : "More guides"}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a, i) => (
                <ArticleCard key={a.slug} article={a} showCategory={false} priority={page === 1 && i < 3} />
              ))}
            </div>
            <Pagination basePath={category.path} page={page} totalPages={totalPages} />
          </section>
        ) : (
          !children && (
            <p className="rounded-2xl border border-dashed border-line-strong p-10 text-center text-muted">
              New guides for this topic are on the way.
            </p>
          )
        )}
      </Container>

      <JsonLd
        data={[
          collectionPageSchema({
            name: category.name,
            description: category.description,
            path: pagePath,
            items: schemaItems ?? articles.map((a) => ({ name: a.title, path: a.path })),
          }),
          breadcrumbSchema(crumbs),
        ]}
      />
    </>
  );
}
