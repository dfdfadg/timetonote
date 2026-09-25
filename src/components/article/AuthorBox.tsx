import Link from "next/link";
import type { Author } from "@/data/authors";
import { AuthorAvatar } from "@/components/article/AuthorAvatar";

export function AuthorBox({ author }: { author: Author }) {
  return (
    <section aria-labelledby="about-author" className="rounded-2xl border border-line bg-surface p-6">
      <div className="flex items-start gap-4">
        <AuthorAvatar author={author} size={56} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Written by</p>
          <h2 id="about-author" className="mt-1 text-lg font-semibold text-ink">
            <Link href={`/authors/${author.slug}`} className="hover:underline">
              {author.name}
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{author.bio}</p>
          <p className="mt-3 text-sm">
            <Link href="/editorial-policy" className="font-medium text-brand hover:underline">
              How we research and update our guides
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
