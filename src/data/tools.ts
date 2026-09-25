/**
 * Tool metadata. Tools live at /tools/{slug}.
 *
 * The interactive UI for each tool is registered separately in
 * `src/components/tools/registry.ts` so this file stays data-only.
 */

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface Tool {
  slug: string;
  name: string;
  /** Meta title. */
  title: string;
  description: string;
  /** One-line summary for cards. */
  summary: string;
  /** Short "how to use" steps shown under the tool. */
  howTo: string[];
  faq?: ToolFaq[];
  /** Article slugs that explain the topic in more depth. */
  relatedArticles?: string[];
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
}

export const tools: Tool[] = [
  {
    slug: "word-counter",
    name: "Word Counter",
    title: "Word Counter: Count Words, Characters and Reading Time",
    description:
      "Free word counter that shows words, characters, sentences, paragraphs and estimated reading time as you type. Runs privately in your browser.",
    summary: "Count words, characters, sentences and reading time instantly.",
    howTo: [
      "Type or paste your text into the box.",
      "The counts update as you type — nothing is sent to a server.",
      "Use “Clear” to start again.",
    ],
    faq: [
      {
        question: "How is reading time calculated?",
        answer:
          "Reading time assumes an average adult silent reading speed of about 225 words per minute, rounded up to the nearest minute. Speaking time uses about 140 words per minute.",
      },
      {
        question: "Is my text stored anywhere?",
        answer:
          "No. The counting happens in your browser and the text is never uploaded or saved by TimeToNote.",
      },
    ],
    keywords: ["word count", "character count", "reading time", "text length"],
    publishedAt: "2026-09-25",
    updatedAt: "2026-09-25",
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    title: "Percentage Calculator: Percent Of, Change and Difference",
    description:
      "Work out a percentage of a number, what percent one number is of another, and percentage increase or decrease — with the formula shown for every answer.",
    summary: "Percent of a number, percentage change and more — formulas included.",
    howTo: [
      "Choose the calculation you need.",
      "Enter your numbers — the answer and the formula appear straight away.",
      "Use the result to check discounts, price rises, marks or budgets.",
    ],
    faq: [
      {
        question: "How do I calculate a percentage increase?",
        answer:
          "Subtract the old value from the new value, divide the result by the old value, then multiply by 100. A change from 50 to 65 is (65 − 50) ÷ 50 × 100 = 30% increase.",
      },
      {
        question: "Why is a 50% increase followed by a 50% decrease not the original number?",
        answer:
          "Because each percentage is taken from a different starting value. 100 increased by 50% is 150; 150 decreased by 50% is 75.",
      },
    ],
    relatedArticles: ["how-to-calculate-percentage-change"],
    keywords: ["percentage", "percent change", "percent increase", "percent decrease", "calculator"],
    publishedAt: "2026-09-25",
    updatedAt: "2026-09-25",
  },
  {
    slug: "keyword-cannibalization-checker",
    name: "Keyword Cannibalization Checker",
    title: "Free Keyword Cannibalization Checker",
    description:
      "Paste a Google Search Console export of queries and pages to find keywords where several of your URLs compete for the same search. Runs in your browser.",
    summary: "Find queries where several of your pages compete in search.",
    howTo: [
      "In Google Search Console open Performance → Search results and export the data with both Query and Page (or use the API/Looker Studio to get query + page rows).",
      "Paste the rows as CSV or tab-separated text: query, page, and optionally clicks, impressions and position.",
      "Review queries where more than one URL gets impressions, then decide whether to merge, re-target or link between the pages.",
    ],
    faq: [
      {
        question: "What is keyword cannibalization?",
        answer:
          "It is when two or more pages on the same site target the same search intent, so search engines alternate between them or rank neither well. It is only a problem when the pages genuinely compete — different intents on the same query can be fine.",
      },
      {
        question: "Is my data uploaded?",
        answer: "No. The file is parsed in your browser and never leaves your device.",
      },
    ],
    keywords: ["keyword cannibalization", "seo", "search console", "duplicate rankings"],
    publishedAt: "2026-09-25",
    updatedAt: "2026-09-25",
  },
];

const toolMap = new Map(tools.map((t) => [t.slug, t]));

export function getTool(slug: string): Tool | undefined {
  return toolMap.get(slug);
}

export const toolPath = (slug: string) => `/tools/${slug}`;
