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
  /** Optional page heading; defaults to `name`. */
  h1?: string;
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
  /** Optional extra content below the tool (Markdown). */
  about?: string;
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
      "The counts update as you type. Nothing is sent to a server.",
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
      "Work out a percentage of a number, what percent one number is of another, and percentage increase or decrease, with the formula shown for every answer.",
    summary: "Percent of a number, percentage change, and more, with formulas included.",
    howTo: [
      "Choose the calculation you need.",
      "Enter your numbers. The answer and the formula appear straight away.",
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
    slug: "days-until-christmas",
    name: "Christmas Countdown",
    h1: "How Many Days Until Christmas?",
    title: "How Many Days Until Christmas? Live Countdown",
    description:
      "See exactly how many days, weeks, hours, and sleeps are left until Christmas with this free live countdown. It updates every second in your time zone.",
    summary: "Live countdown of the days, weeks, and sleeps until Christmas.",
    howTo: [
      "Open this page. The countdown starts on its own and updates every second.",
      "Read the big number for the days left, or check the weeks, sleeps, and Fridays below it.",
      "Bookmark the page and come back any time. It always counts to the next Christmas Day.",
    ],
    faq: [
      {
        question: "How many days until Christmas?",
        answer:
          "The countdown at the top of this page shows the exact number of days until Christmas in your time zone. It updates on its own every day.",
      },
      {
        question: "What day of the week is Christmas in 2026?",
        answer: "Christmas Day 2026 is on a Friday, December 25. In 2027, it falls on a Saturday.",
      },
      {
        question: "How many sleeps until Christmas?",
        answer:
          "The number of sleeps is the same as the number of days left. If there are 10 days until Christmas, there are 10 sleeps, counting tonight.",
      },
      {
        question: "Does the countdown use my time zone?",
        answer:
          "Yes. The countdown uses the clock on your phone or computer, so it counts down to midnight on December 25 where you are.",
      },
    ],
    about: `## Christmas dates for the next five years

Christmas is always on December 25, but the day of the week changes each year.

| Year | Christmas Day |
| --- | --- |
| 2026 | Friday, December 25 |
| 2027 | Saturday, December 25 |
| 2028 | Monday, December 25 |
| 2029 | Tuesday, December 25 |
| 2030 | Wednesday, December 25 |

## How to count the days until Christmas yourself

You can work it out with a calendar in a few steps:

1. Count the days left in the current month, not counting today.
2. Add the number of days in each full month before December.
3. Add 25 for the days in December up to Christmas Day.

For example, from November 1 there are 29 days left in November (not counting November 1), plus 25 days in December, for a total of **54 days**.

To turn days into weeks, divide by 7. For 54 days, that is 7 weeks and 5 days. If you want to work with other date math or percentages, try our [free percentage calculator](/tools/percentage-calculator).

## Fun ways to count down to Christmas

- **Advent calendars.** Open one small door each day from December 1 to December 24.
- **A paper chain.** Make one loop for each day left, and tear off one loop every night.
- **A sleeps chart.** Kids can color in one box every night before bed.
- **A daily act of kindness.** Do one small, kind thing for someone each day in December.

## Plan ahead for the holidays

The countdown is a good reminder to plan early. Many people start holiday shopping in November, and shipping gets busy in December. Check store and carrier shipping deadlines so gifts arrive on time, and set a budget before you start. If you are hosting, a quick deep clean a week or two before guests arrive makes the season less stressful. Our [simple house cleaning routine](/how-to-clean-a-dusty-house) can help you get ready.`,
    keywords: ["christmas countdown", "days until christmas", "how many days until christmas", "sleeps until christmas", "weeks until christmas"],
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
          "It is when two or more pages on the same site target the same search intent, so search engines alternate between them or rank neither well. It is only a problem when the pages genuinely compete. Different intents on the same query can be fine.",
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
