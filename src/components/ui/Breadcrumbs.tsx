import Link from "next/link";
import type { Crumb } from "@/lib/schema";
import { ChevronRightIcon } from "@/components/ui/Icons";

/** Visual breadcrumbs. Pair with `breadcrumbSchema()` for structured data. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="line-clamp-1 text-ink-soft">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="hover:text-ink hover:underline">
                    {item.name}
                  </Link>
                  <ChevronRightIcon className="h-3.5 w-3.5 opacity-60" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
