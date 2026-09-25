/**
 * Authors.
 *
 * Only add real people (or the real editorial team). Do not invent personas.
 * To add a person: add an entry here, put a square photo in
 * /public/images/authors/, and reference the `slug` from article front matter.
 */

export interface Author {
  slug: string;
  name: string;
  /** "Person" for an individual, "Organization" for a team byline. */
  type: "Person" | "Organization";
  role: string;
  /** Short bio shown under articles. */
  bio: string;
  /** Longer bio shown on the author page (plain paragraphs). */
  about: string[];
  /** Optional square image in /public. When omitted, initials are shown. */
  image?: string;
  /** Optional public profile links (used in schema `sameAs`). */
  links?: { label: string; url: string }[];
}

export const authors: Author[] = [
  {
    slug: "editorial-team",
    name: "TimeToNote Editorial Team",
    type: "Organization",
    role: "Editors",
    bio: "The TimeToNote editorial team researches, writes and updates our guides, checking each fix against manufacturer documentation and reputable sources before publishing.",
    about: [
      "The TimeToNote editorial team writes and maintains the guides on this site. Our job is to turn common, frustrating problems into clear explanations and steps you can follow.",
      "Before a guide is published we check the advice against manufacturer documentation, official support pages and other reputable sources. When something changes — a new software version, updated safety guidance or a better method — we update the guide and its “Updated” date.",
      "If you spot an error or have a suggestion, please get in touch through the contact page. Read our editorial policy to learn more about how guides are researched and maintained.",
    ],
  },
];

const authorMap = new Map(authors.map((a) => [a.slug, a]));

export function getAuthor(slug: string): Author | undefined {
  return authorMap.get(slug);
}
