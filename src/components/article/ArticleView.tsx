import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import { articleSchema, breadcrumbSchema, faqSchema, type Crumb } from "@/lib/schema";
import { AuthorAvatar } from "@/components/article/AuthorAvatar";
import { AuthorBox } from "@/components/article/AuthorBox";
import { ArticleCard } from "@/components/article/ArticleCard";
import { FaqSection } from "@/components/article/FaqSection";
import { TableOfContents, TableOfContentsMobile } from "@/components/article/TableOfContents";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { ClockIcon } from "@/components/ui/Icons";

export function ArticleView({ article, related }: { article: Article; related: Article[] }) {
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: article.categoryInfo.name, path: article.categoryInfo.path },
    { name: article.title, path: article.path },
  ];
  const wasUpdated = article.updatedAt !== article.publishedAt;
  const schemas: object[] = [articleSchema(article), breadcrumbSchema(crumbs)];
  if (article.faq) schemas.push(faqSchema(article.faq));

  return (
    <article className="pb-4">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto max-w-3xl px-4 pb-10 pt-8 sm:px-6 sm:pt-10">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6">
            <CategoryBadge category={article.categoryInfo} />
          </div>
          <h1 className="mt-4 font-serif text-[2rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[2.6rem]">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{article.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted">
            <span className="flex items-center gap-2.5">
              <AuthorAvatar author={article.authorInfo} size={36} />
              <span>
                By{" "}
                <Link href={`/authors/${article.authorInfo.slug}`} className="font-semibold text-ink hover:underline">
                  {article.authorInfo.name}
                </Link>
              </span>
            </span>
            <span>
              Published <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            </span>
            {wasUpdated && (
              <span>
                Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4" /> {article.readingMinutes} min read
            </span>
          </div>
        </div>
      </header>

      {article.featuredImage && (
        <figure className="mx-auto mt-8 max-w-4xl px-4 sm:px-6">
          <Image
            src={article.featuredImage.src}
            alt={article.featuredImage.alt}
            width={article.featuredImage.width}
            height={article.featuredImage.height}
            sizes="(min-width: 960px) 896px, 100vw"
            priority
            className="h-auto w-full rounded-2xl border border-line"
          />
          {article.featuredImage.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted">{article.featuredImage.caption}</figcaption>
          )}
        </figure>
      )}

      <div
        className={`mx-auto mt-10 px-4 sm:px-6 ${
          article.showToc ? "max-w-6xl lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-14" : "max-w-3xl"
        }`}
      >
        <div className={article.showToc ? "mx-auto w-full max-w-3xl lg:mx-0" : ""}>
          {article.showToc && (
            <div className="mb-8">
              <TableOfContentsMobile headings={article.headings} />
            </div>
          )}
          <div className="prose-article" dangerouslySetInnerHTML={{ __html: article.html }} />

          {article.faq && (
            <div className="mt-14">
              <FaqSection faq={article.faq} />
            </div>
          )}

          {article.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium text-muted">Topics:</span>
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  rel="nofollow"
                  className="rounded-full border border-line px-3 py-1 text-ink-soft hover:border-line-strong hover:text-ink"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-10">
            <AuthorBox author={article.authorInfo} />
          </div>
        </div>

        {article.showToc && (
          <aside className="hidden lg:block">
            <TableOfContents headings={article.headings} />
          </aside>
        )}
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
          <h2 id="related-heading" className="font-serif text-2xl font-semibold tracking-tight text-ink">
            Related guides
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      <JsonLd data={schemas} />
    </article>
  );
}
