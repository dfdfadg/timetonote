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
    role: "Founder & Editor, SEO and Content Specialist",
    image: "/images/authors/agha-ali-abbas.webp",
    bio: "Agha Ali Abbas is the founder and editor of TimeToNote. He has worked in SEO and content writing for 18 years, and he checks every guide against manufacturer documentation and official sources before it goes live.",
    about: [
      "Agha Ali Abbas founded TimeToNote to give people clear, practical answers to the everyday problems that send them to a search engine, at home, with their devices, and online.",
      "He has worked in SEO and content writing for 18 years. Over that time he has seen what people really search for when something goes wrong, and how often the answers they find are long, confusing, or written to sell a product. TimeToNote is his answer to that: short explanations, steps in a sensible order, and honest advice about when to call a professional.",
      "Every guide is researched and checked against manufacturer support pages and official sources, such as the EPA, FDA, USDA, CDC, Apple, Microsoft, and Google. Those sources are listed at the end of each guide so you can check them yourself. When software, products, or safety guidance change, the guide is reviewed and its Updated date is changed.",
      "Spotted a mistake or have a problem you would like covered? Get in touch through the contact page. You can read more about how guides are made in the editorial policy.",
    ],
  },
];

const authorMap = new Map(authors.map((a) => [a.slug, a]));

export function getAuthor(slug: string): Author | undefined {
  return authorMap.get(slug);
}
