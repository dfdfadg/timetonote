import type { ReactNode } from "react";
import { formatDate } from "@/lib/format";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";

export function StaticPage({
  title,
  path,
  intro,
  updatedAt,
  children,
}: {
  title: string;
  path: string;
  intro?: string;
  updatedAt?: string;
  children: ReactNode;
}) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: title, path },
  ];
  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container size="narrow" className="pb-10 pt-8 sm:pt-10">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-8 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
          {intro && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{intro}</p>}
          {updatedAt && (
            <p className="mt-4 text-sm text-muted">
              Last updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
            </p>
          )}
        </Container>
      </div>
      <Container size="narrow" className="pt-10">
        <div className="prose-page">{children}</div>
      </Container>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
