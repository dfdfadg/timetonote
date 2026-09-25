import { categories } from "@/data/categories";
import { tools, toolPath } from "@/data/tools";
import { getIndexableArticles } from "@/lib/articles";

export type SearchResultType = "article" | "tool" | "category";

export interface SearchResult {
  type: SearchResultType;
  title: string;
  description: string;
  path: string;
  label: string;
  score: number;
}

interface IndexEntry extends Omit<SearchResult, "score"> {
  fields: { text: string; weight: number }[];
}

const normalise = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const STOP = new Set(["a", "an", "the", "is", "my", "to", "of", "and", "or", "in", "on", "for", "i", "how", "why", "what", "do", "does", "it"]);

function tokens(query: string): string[] {
  const all = normalise(query).split(" ").filter(Boolean);
  const meaningful = all.filter((t) => !STOP.has(t));
  return meaningful.length ? meaningful : all;
}

function buildIndex(): IndexEntry[] {
  const articleEntries: IndexEntry[] = getIndexableArticles().map((a) => ({
    type: "article",
    title: a.title,
    description: a.description,
    path: a.path,
    label: a.categoryInfo.name,
    fields: [
      { text: normalise(a.title), weight: 6 },
      { text: normalise(a.tags.join(" ")), weight: 4 },
      { text: normalise(a.description), weight: 3 },
      { text: normalise(a.headings.map((h) => h.text).join(" ")), weight: 2 },
      { text: normalise(a.plainText), weight: 0.5 },
    ],
  }));

  const toolEntries: IndexEntry[] = tools.map((t) => ({
    type: "tool",
    title: t.name,
    description: t.summary,
    path: toolPath(t.slug),
    label: "Tool",
    fields: [
      { text: normalise(t.name), weight: 6 },
      { text: normalise(t.keywords.join(" ")), weight: 4 },
      { text: normalise(t.description), weight: 3 },
    ],
  }));

  const categoryEntries: IndexEntry[] = categories.map((c) => ({
    type: "category",
    title: c.name,
    description: c.summary,
    path: c.path,
    label: "Category",
    fields: [
      { text: normalise(c.name), weight: 6 },
      { text: normalise(c.description), weight: 2 },
    ],
  }));

  return [...articleEntries, ...toolEntries, ...categoryEntries];
}

/** Simple weighted keyword search over articles, tools and categories. */
export function search(query: string, limit = 30): SearchResult[] {
  const terms = tokens(query);
  if (!terms.length) return [];
  const phrase = normalise(query);

  return buildIndex()
    .map(({ fields, ...entry }) => {
      let score = 0;
      let matchedTerms = 0;
      for (const term of terms) {
        let termScore = 0;
        const wordMatch = new RegExp(`\\b${term}`);
        for (const f of fields) {
          if (wordMatch.test(f.text)) termScore += f.weight;
        }
        if (termScore > 0) matchedTerms++;
        score += termScore;
      }
      // Require most terms to match so results stay relevant.
      if (matchedTerms < Math.ceil(terms.length * 0.6)) score = 0;
      if (score > 0 && fields[0].text.includes(phrase)) score += 10;
      return { ...entry, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
