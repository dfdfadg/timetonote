import Link from "next/link";
import type { Category } from "@/data/categories";

export function CategoryBadge({ category, link = true }: { category: Category; link?: boolean }) {
  const className =
    "inline-flex items-center rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)]";
  return link ? (
    <Link href={category.path} data-accent={category.accent} className={`${className} hover:underline`}>
      {category.name}
    </Link>
  ) : (
    <span data-accent={category.accent} className={className}>
      {category.name}
    </span>
  );
}
