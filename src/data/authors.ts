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
    slug: "agha-ali-abbas",
    name: "Agha Ali Abbas",
    type: "Person",
    role: "Founder & Editor",
    bio: "Agha Ali Abbas is the founder and editor of TimeToNote. He researches and writes practical guides to everyday problems, checking each fix against manufacturer documentation and reputable sources before publishing.",
    about: [
      "Agha Ali Abbas founded TimeToNote to give people clear, practical answers to the everyday problems that send them to a search engine — at home, with their devices and online.",
      "He researches, writes and updates the guides on this site. Before a guide is published, the advice is checked against manufacturer documentation, official support pages and other reputable sources. When something changes — a new software version, updated safety guidance or a better method — the guide and its “Updated” date are revised.",
      "If you spot an error or have a suggestion, please get in touch through the contact page. Read the editorial policy to learn more about how guides are researched and maintained.",
    ],
  },
];

const authorMap = new Map(authors.map((a) => [a.slug, a]));

export function getAuthor(slug: string): Author | undefined {
  return authorMap.get(slug);
}
