import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { categories, editorialCategories } from "@/data/categories";
import { tools, toolPath } from "@/data/tools";
import { getArticlesByCategory, getLatestArticles, getPopularArticles, toSummary } from "@/lib/articles";
import { pageMetadata } from "@/lib/metadata";
import { ArticleCard, ArticleListItem } from "@/components/article/ArticleCard";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, categoryIcons } from "@/components/ui/Icons";
import { SearchForm } from "@/components/ui/SearchForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  absoluteTitle: true,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  const popular = getPopularArticles(6).map(toSummary);
  const latest = getLatestArticles(6).map(toSummary);
  const quickSearches = popular.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-surface">
        <Container className="grid grid-cols-1 gap-12 py-14 sm:py-20 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">{siteConfig.tagline}</p>
            <h1 className="mt-4 font-serif text-[2.4rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              Find Practical Answers to Everyday Problems
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Simple, useful guides that help you understand problems, troubleshoot issues, and find practical
              solutions.
            </p>
            <div className="mt-8 max-w-xl">
              <SearchForm size="large" id="hero-search" />
            </div>
            {quickSearches.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-muted">Popular:</span>
                {quickSearches.map((a) => (
                  <Link
                    key={a.slug}
                    href={a.path}
                    className="max-w-full rounded-full border border-line bg-bg px-3 py-1 text-ink-soft hover:border-line-strong hover:text-ink"
                  >
                    {a.shortTitle ?? a.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <nav aria-label="Browse by topic" className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {categories.map((c) => {
              const Icon = categoryIcons[c.slug];
              return (
                <Link
                  key={c.slug}
                  href={c.path}
                  data-accent={c.accent}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-bg p-4 transition-colors hover:border-line-strong hover:bg-surface"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink">{c.name}</span>
                    <span className="block truncate text-sm text-muted">{c.summary}</span>
                  </span>
                  <ArrowRightIcon className="ml-auto h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </nav>
        </Container>
      </section>

      {/* Popular problems */}
      {popular.length > 0 && (
        <section aria-labelledby="popular-heading" className="py-16">
          <Container>
            <SectionHeading
              id="popular-heading"
              title="Popular Problems"
              description="The questions readers ask us about most, answered step by step."
            />
            <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {popular.map((a, i) => (
                <ArticleListItem key={a.slug} article={a} index={i} />
              ))}
            </ol>
          </Container>
        </section>
      )}

      {/* Latest guides */}
      {latest.length > 0 && (
        <section aria-labelledby="latest-heading" className="border-y border-line bg-surface py-16">
          <Container>
            <SectionHeading id="latest-heading" title="Latest Guides" description="Newly published and recently updated." />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* One section per editorial category — updates automatically as content is added. */}
      {editorialCategories.map((c) => {
        const items = getArticlesByCategory(c.slug).slice(0, 3).map(toSummary);
        if (!items.length) return null;
        return (
          <section key={c.slug} aria-labelledby={`${c.slug}-heading`} className="pt-16" data-accent={c.accent}>
            <Container>
              <SectionHeading
                id={`${c.slug}-heading`}
                title={c.name}
                description={c.summary}
                href={c.path}
                linkLabel={`All ${c.name.toLowerCase()}`}
              />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((a) => (
                  <ArticleCard key={a.slug} article={a} showCategory={false} />
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      {/* Tools */}
      <section aria-labelledby="tools-heading" className="pt-16" data-accent="rose">
        <Container>
          <SectionHeading
            id="tools-heading"
            title="Useful Tools"
            description="Free calculators and utilities that run privately in your browser."
            href="/tools"
            linkLabel="All tools"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={toolPath(t.slug)}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
              >
                <span className="text-lg font-semibold text-ink group-hover:underline">{t.name}</span>
                <span className="mt-2 text-sm leading-relaxed text-muted">{t.summary}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-[var(--accent)]">
                  Open tool <ArrowRightIcon className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
