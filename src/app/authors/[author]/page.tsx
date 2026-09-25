import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { authors, getAuthor } from "@/data/authors";
import { getIndexableArticles, toSummary } from "@/lib/articles";
import { pageMetadata } from "@/lib/metadata";
import { authorPageSchema, breadcrumbSchema, type Crumb } from "@/lib/schema";
import { ArticleCard } from "@/components/article/ArticleCard";
import { AuthorAvatar } from "@/components/article/AuthorAvatar";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";

export const dynamicParams = false;

export function generateStaticParams() {
  return authors.map((a) => ({ author: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/authors/[author]">): Promise<Metadata> {
  const { author: slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return pageMetadata({ title: author.name, description: author.bio, path: `/authors/${author.slug}` });
}

export default async function AuthorPage({ params }: PageProps<"/authors/[author]">) {
  const { author: slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();
  const articles = getIndexableArticles().filter((a) => a.author === author.slug);
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: author.name, path: `/authors/${author.slug}` },
  ];

  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container size="narrow" className="pb-10 pt-8 sm:pt-10">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 flex items-center gap-5">
            <AuthorAvatar author={author} size={72} />
            <div>
              <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink">{author.name}</h1>
              <p className="mt-1 text-muted">{author.role}</p>
            </div>
          </div>
          <div className="prose-page mt-6">
            {author.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {author.links && author.links.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-3 text-sm">
              {author.links.map((l) => (
                <li key={l.url}>
                  <a href={l.url} rel="me noopener" className="font-medium text-brand hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </div>
      <Container className="pt-12">
        <h2 className="mb-6 font-serif text-2xl font-semibold tracking-tight text-ink">Guides by {author.name}</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={toSummary(a)} />
          ))}
        </div>
      </Container>
      <JsonLd data={[authorPageSchema(author), breadcrumbSchema(crumbs)]} />
    </>
  );
}
