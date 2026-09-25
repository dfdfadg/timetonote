import Link from "next/link";

/** Numbered pagination. Page 1 is always the clean base path (no /page/1). */
export function Pagination({ basePath, page, totalPages }: { basePath: string; page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const href = (p: number) => (p === 1 ? basePath : `${basePath}/page/${p}`);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const linkClass = "flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium";

  return (
    <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link href={href(page - 1)} rel="prev" className={`${linkClass} border-line hover:bg-surface-muted`}>
          Previous
        </Link>
      )}
      {pages.map((p) =>
        p === page ? (
          <span key={p} aria-current="page" className={`${linkClass} border-brand bg-brand text-on-brand`}>
            {p}
          </span>
        ) : (
          <Link key={p} href={href(p)} className={`${linkClass} border-line hover:bg-surface-muted`} aria-label={`Page ${p}`}>
            {p}
          </Link>
        ),
      )}
      {page < totalPages && (
        <Link href={href(page + 1)} rel="next" className={`${linkClass} border-line hover:bg-surface-muted`}>
          Next
        </Link>
      )}
    </nav>
  );
}
