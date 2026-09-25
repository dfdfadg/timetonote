import type { Heading } from "@/lib/markdown";

function TocList({ headings }: { headings: Heading[] }) {
  return (
    <ol className="space-y-1.5 text-sm">
      {headings.map((h) => (
        <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
          <a
            href={`#${h.id}`}
            className={`block rounded-md py-1 leading-snug hover:text-brand ${h.level === 3 ? "text-muted" : "text-ink-soft"}`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Sticky sidebar version for large screens. */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  const items = headings.filter((h) => h.level === 2);
  if (!items.length) return null;
  return (
    <nav aria-labelledby="toc-heading" className="sticky top-24">
      <p id="toc-heading" className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
        On this page
      </p>
      <TocList headings={items} />
    </nav>
  );
}

/** Collapsible version shown above the content on small screens. */
export function TableOfContentsMobile({ headings }: { headings: Heading[] }) {
  const items = headings.filter((h) => h.level === 2);
  if (!items.length) return null;
  return (
    <details className="rounded-xl border border-line bg-surface p-4 lg:hidden">
      <summary className="cursor-pointer text-sm font-semibold text-ink">On this page</summary>
      <nav aria-label="Table of contents" className="mt-3">
        <TocList headings={items} />
      </nav>
    </details>
  );
}
