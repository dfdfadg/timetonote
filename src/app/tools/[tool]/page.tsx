import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory } from "@/data/categories";
import { getTool, tools, toolPath } from "@/data/tools";
import { getArticle, toSummary } from "@/lib/articles";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, toolSchema, type Crumb } from "@/lib/schema";
import { ArticleCard } from "@/components/article/ArticleCard";
import { FaqSection } from "@/components/article/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { toolComponents } from "@/components/tools/registry";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.filter((t) => toolComponents[t.slug]).map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tools/[tool]">): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return pageMetadata({ title: tool.title, description: tool.description, path: toolPath(tool.slug) });
}

export default async function ToolPage({ params }: PageProps<"/tools/[tool]">) {
  const { tool: slug } = await params;
  const tool = getTool(slug);
  const ToolUI = toolComponents[slug];
  if (!tool || !ToolUI) notFound();

  const category = getCategory("tools")!;
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: category.name, path: category.path },
    { name: tool.name, path: toolPath(tool.slug) },
  ];
  const related = (tool.relatedArticles ?? []).map(getArticle).filter((a) => a !== undefined);
  const otherTools = tools.filter((t) => t.slug !== tool.slug);

  return (
    <div data-accent={category.accent}>
      <div className="border-b border-line bg-surface">
        <Container size="narrow" className="pb-10 pt-8 sm:pt-10">
          <Breadcrumbs items={crumbs} />
          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">Free tool</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{tool.name}</h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">{tool.description}</p>
        </Container>
      </div>

      <Container size="narrow" className="pt-10">
        <section aria-label={tool.name} className="rounded-2xl border border-line bg-surface p-5 sm:p-7">
          <ToolUI />
        </section>

        <section aria-labelledby="how-to-use" className="mt-12">
          <h2 id="how-to-use" className="font-serif text-2xl font-semibold tracking-tight text-ink">
            How to use the {tool.name.toLowerCase()}
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-relaxed text-ink-soft marker:font-semibold marker:text-brand">
            {tool.howTo.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        {tool.faq && (
          <div className="mt-12">
            <FaqSection faq={tool.faq} />
          </div>
        )}

        {related.length > 0 && (
          <section aria-labelledby="learn-more" className="mt-12">
            <h2 id="learn-more" className="font-serif text-2xl font-semibold tracking-tight text-ink">
              Learn more
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={toSummary(a)} />
              ))}
            </div>
          </section>
        )}

        <nav aria-labelledby="more-tools" className="mt-12">
          <h2 id="more-tools" className="font-serif text-2xl font-semibold tracking-tight text-ink">
            More free tools
          </h2>
          <ul className="mt-4 space-y-2">
            {otherTools.map((t) => (
              <li key={t.slug}>
                <Link href={toolPath(t.slug)} className="font-medium text-brand hover:underline">
                  {t.name}
                </Link>
                <span className="text-muted"> — {t.summary}</span>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <JsonLd data={[toolSchema(tool), breadcrumbSchema(crumbs), ...(tool.faq ? [faqSchema(tool.faq)] : [])]} />
    </div>
  );
}
