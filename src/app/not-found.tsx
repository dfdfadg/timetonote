import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { SearchForm } from "@/components/ui/SearchForm";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Container size="narrow" className="py-16 sm:py-24">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand">404 error</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink">We couldn’t find that page</h1>
      <p className="mt-4 text-lg text-ink-soft">
        The page may have moved or no longer exists. Try searching for the problem you’re trying to solve:
      </p>
      <div className="mt-8">
        <SearchForm id="not-found-search" />
      </div>
      <h2 className="mt-12 font-semibold text-ink">Or browse a topic</h2>
      <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link href={c.path} className="font-medium text-brand hover:underline">
              {c.name}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/" className="font-medium text-brand hover:underline">
            Back to the homepage
          </Link>
        </li>
      </ul>
    </Container>
  );
}
