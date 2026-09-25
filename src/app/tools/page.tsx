import type { Metadata } from "next";
import Link from "next/link";
import { getCategory } from "@/data/categories";
import { tools, toolPath } from "@/data/tools";
import { getArticlesByCategory, toSummary } from "@/lib/articles";
import { pageMetadata } from "@/lib/metadata";
import { CategoryView } from "@/components/category/CategoryView";
import { ArrowRightIcon } from "@/components/ui/Icons";

const category = getCategory("tools")!;

export const metadata: Metadata = pageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
});

export default function ToolsPage() {
  const articles = getArticlesByCategory("tools").map(toSummary);
  return (
      <CategoryView
        category={category}
        articles={articles}
        page={1}
        totalPages={1}
        schemaItems={[
          ...tools.map((t) => ({ name: t.name, path: toolPath(t.slug) })),
          ...articles.map((a) => ({ name: a.title, path: a.path })),
        ]}
      >
        <section aria-labelledby="all-tools" className="mb-16" data-accent={category.accent}>
          <h2 id="all-tools" className="mb-6 font-serif text-2xl font-semibold tracking-tight text-ink">
            All tools
          </h2>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => (
              <li key={t.slug}>
                <Link
                  href={toolPath(t.slug)}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong"
                >
                  <span className="text-lg font-semibold text-ink group-hover:underline">{t.name}</span>
                  <span className="mt-2 text-sm leading-relaxed text-muted">{t.description}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-[var(--accent)]">
                    Open tool <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </CategoryView>
  );
}
