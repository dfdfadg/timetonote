import Image from "next/image";
import Link from "next/link";
import type { ArticleSummary } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import { ClockIcon } from "@/components/ui/Icons";

/**
 * Article card. The whole card is clickable via a stretched link on the
 * title, keeping a single, descriptive link per card for screen readers.
 */
export function ArticleCard({
  article,
  showImage = true,
  showCategory = true,
  headingLevel = "h3",
  priority = false,
}: {
  article: ArticleSummary;
  showImage?: boolean;
  showCategory?: boolean;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
}) {
  const Heading = headingLevel;
  return (
    <article
      data-accent={article.categoryInfo.accent}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,box-shadow] hover:border-line-strong hover:shadow-[0_6px_24px_-12px_rgba(0,0,0,0.18)]"
    >
      {showImage && article.featuredImage && (
        <div className="aspect-[16/9] overflow-hidden border-b border-line bg-surface-muted">
          <Image
            src={article.featuredImage.src}
            alt=""
            width={article.featuredImage.width}
            height={article.featuredImage.height}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            priority={priority}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        {showCategory && (
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
            {article.categoryInfo.name}
          </p>
        )}
        <Heading className="mt-2 font-serif text-lg font-semibold leading-snug text-ink">
          <Link href={article.path} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-focus-within:underline">
            {article.title}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{article.description}</p>
        <p className="mt-auto flex items-center gap-3 pt-4 text-xs text-muted">
          <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5" /> {article.readingMinutes} min read
          </span>
        </p>
      </div>
    </article>
  );
}

/** Compact list-style link used for "Popular problems". */
export function ArticleListItem({ article, index }: { article: ArticleSummary; index: number }) {
  return (
    <li data-accent={article.categoryInfo.accent}>
      <Link
        href={article.path}
        className="group flex items-start gap-4 rounded-xl border border-transparent p-3 transition-colors hover:border-line hover:bg-surface"
      >
        <span className="mt-0.5 font-serif text-2xl font-semibold leading-none text-muted group-hover:text-[var(--accent)]" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>
          <span className="block font-semibold leading-snug text-ink group-hover:underline">{article.title}</span>
          <span className="mt-1 block text-xs font-medium text-[var(--accent)]">{article.categoryInfo.name}</span>
        </span>
      </Link>
    </li>
  );
}
