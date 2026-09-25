import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/categories";
import { getPopularArticles } from "@/lib/articles";
import { search, type SearchResultType } from "@/lib/search";
import { Container } from "@/components/ui/Container";
import { SearchForm } from "@/components/ui/SearchForm";

/** Search results are never indexed (also sent as an X-Robots-Tag header). */
export const metadata: Metadata = {
  title: "Search",
  description: "Search TimeToNote guides, tools and topics.",
  robots: { index: false, follow: true },
};

const TYPE_LABEL: Record<SearchResultType, string> = { article: "Guide", tool: "Tool", category: "Topic" };

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const params = await searchParams;
  const raw = Array.isArray(params.q) ? params.q[0] : params.q;
  const query = (raw ?? "").trim().slice(0, 120);
  const results = query ? search(query) : [];
  const suggestions = getPopularArticles(5);

  return (
    <Container size="narrow" className="py-10 sm:py-14">
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {query ? (
          <>
            Results for <span className="text-brand">“{query}”</span>
          </>
        ) : (
          "Search TimeToNote"
        )}
      </h1>
      <div className="mt-6">
        <SearchForm defaultValue={query} size="large" id="search-page-input" autoFocus={!query} />
      </div>

      {query && (
        <p className="mt-6 text-sm text-muted" role="status">
          {results.length === 0
            ? "No results found."
            : `${results.length} ${results.length === 1 ? "result" : "results"} found.`}
        </p>
      )}

      {results.length > 0 && (
        <ol className="mt-4 divide-y divide-line rounded-2xl border border-line bg-surface">
          {results.map((r) => (
            <li key={`${r.type}-${r.path}`} className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                {TYPE_LABEL[r.type]}
                {r.type === "article" && <span className="font-medium normal-case tracking-normal"> · {r.label}</span>}
              </p>
              <h2 className="mt-1 text-lg font-semibold leading-snug">
                <Link href={r.path} className="text-ink hover:text-brand hover:underline">
                  {r.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">{r.description}</p>
            </li>
          ))}
        </ol>
      )}

      {(!query || results.length === 0) && (
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
          <section aria-labelledby="try-popular">
            <h2 id="try-popular" className="font-semibold text-ink">
              Popular guides
            </h2>
            <ul className="mt-3 space-y-2">
              {suggestions.map((a) => (
                <li key={a.slug}>
                  <Link href={a.path} className="text-brand hover:underline">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="browse-topics">
            <h2 id="browse-topics" className="font-semibold text-ink">
              Browse by topic
            </h2>
            <ul className="mt-3 space-y-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={c.path} className="text-brand hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </Container>
  );
}
