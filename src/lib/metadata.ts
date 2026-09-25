import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";

interface PageMetaInput {
  title: string;
  description: string;
  /** Root-relative path of the page, used for the canonical URL. */
  path: string;
  /** Use the title as-is instead of appending " | TimeToNote". */
  absoluteTitle?: boolean;
  image?: { src: string; alt: string; width?: number; height?: number };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  noindex?: boolean;
  /** Override canonical (absolute URL). */
  canonical?: string;
}

/** Build consistent page metadata: title, description, canonical, OG and Twitter. */
export function pageMetadata(input: PageMetaInput): Metadata {
  const canonical = input.canonical ?? absoluteUrl(input.path);
  const images = input.image
    ? [
        {
          url: absoluteUrl(input.image.src),
          alt: input.image.alt,
          ...(input.image.width ? { width: input.image.width } : {}),
          ...(input.image.height ? { height: input.image.height } : {}),
        },
      ]
    : undefined;

  const ogBase = {
    title: input.title,
    description: input.description,
    url: canonical,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    ...(images ? { images } : {}),
  };

  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: { canonical },
    openGraph:
      input.type === "article"
        ? {
            ...ogBase,
            type: "article",
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime,
            authors: input.authors,
            section: input.section,
            tags: input.tags,
          }
        : { ...ogBase, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      ...(images ? { images: images.map((i) => ({ url: i.url, alt: i.alt })) } : {}),
    },
    ...(input.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
