import { absoluteUrl, siteConfig } from "@/config/site";
import type { Author } from "@/data/authors";
import type { Tool } from "@/data/tools";
import type { Article, FaqItem } from "@/lib/articles";

/** JSON-LD builders. Rendered with <JsonLd />. */

const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

export type Crumb = { name: string; path: string };

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.logoPath),
      width: 512,
      height: 512,
    },
    description: siteConfig.description,
    email: siteConfig.contactEmail,
    ...(siteConfig.socialProfiles.length ? { sameAs: siteConfig.socialProfiles } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${siteConfig.url}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function authorRef(author: Author) {
  return {
    "@type": author.type,
    name: author.name,
    url: absoluteUrl(`/authors/${author.slug}`),
  };
}

export function articleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${article.canonical}#article`,
    headline: article.title,
    description: article.description,
    url: article.canonical,
    mainEntityOfPage: { "@type": "WebPage", "@id": article.canonical },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: siteConfig.language,
    articleSection: article.categoryInfo.name,
    keywords: article.tags.join(", "),
    wordCount: article.wordCount,
    author: authorRef(article.authorInfo),
    publisher: { "@id": ORG_ID, "@type": "Organization", name: siteConfig.name, logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logoPath) } },
    isPartOf: { "@id": WEBSITE_ID },
    ...(article.featuredImage
      ? {
          image: {
            "@type": "ImageObject",
            url: absoluteUrl(article.featuredImage.src),
            width: article.featuredImage.width,
            height: article.featuredImage.height,
          },
        }
      : {}),
  };
}

export function faqSchema(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function collectionPageSchema(opts: { name: string; description: string; path: string; items: { name: string; path: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: opts.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(item.path),
        name: item.name,
      })),
    },
  };
}

export function toolSchema(tool: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.description,
    url: absoluteUrl(`/tools/${tool.slug}`),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (runs in the browser)",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": ORG_ID },
  };
}

export function authorPageSchema(author: Author) {
  const url = absoluteUrl(`/authors/${author.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url,
    mainEntity: {
      "@type": author.type,
      name: author.name,
      description: author.bio,
      url,
      ...(author.image ? { image: absoluteUrl(author.image) } : {}),
      ...(author.links?.length ? { sameAs: author.links.map((l) => l.url) } : {}),
      ...(author.type === "Person" ? { worksFor: { "@id": ORG_ID } } : {}),
    },
  };
}
