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
  /** Optional featured image shown below the tool. */
  image?: { src: string; alt: string; width: number; height: number };
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
}

export const tools: Tool[] = [
  {
    slug: "word-counter",
    image: { src: "/images/tools/word-counter.webp", alt: "Laptop running a word counter that shows words, characters, sentences and paragraphs", width: 1536, height: 1024 },
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
    image: { src: "/images/tools/percentage-calculator.webp", alt: "Calculator showing 25 percent next to a notebook with worked percentage examples", width: 1536, height: 1024 },
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
    image: { src: "/images/tools/days-until-christmas.webp", alt: "Desk calendar with December 25 circled next to a Christmas tree, gifts and a snowman", width: 1536, height: 1024 },
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

The countdown is a good reminder to plan early. Many people start holiday shopping in November, and shipping gets busy in December. Check store and carrier shipping deadlines so gifts arrive on time, and set a budget before you start. If you are hosting, a quick deep clean a week or two before guests arrive makes the season less stressful. Our [simple house cleaning routine](/how-to-clean-a-dusty-house) can help you get ready.

Want to count down to other holidays? Try our [Thanksgiving countdown](/tools/days-until-thanksgiving), [Halloween countdown](/tools/days-until-halloween), or [New Year countdown](/tools/days-until-new-year).`,
    keywords: ["christmas countdown", "days until christmas", "how many days until christmas", "sleeps until christmas", "weeks until christmas"],
    publishedAt: "2026-09-25",
    updatedAt: "2026-09-25",
  },
  {
    slug: "days-until-thanksgiving",
    name: "Thanksgiving Countdown",
    h1: "How Many Days Until Thanksgiving?",
    title: "How Many Days Until Thanksgiving? Live Countdown",
    description:
      "See how many days, weeks, and hours are left until Thanksgiving with this free live countdown. It finds the fourth Thursday of November for you.",
    summary: "Live countdown of the days and weeks until US Thanksgiving.",
    howTo: [
      "Open this page. The countdown starts on its own and updates every second.",
      "Read the big number for the days left, or check the weeks, sleeps, and weekends below it.",
      "Bookmark the page. After Thanksgiving it switches to next year's date on its own.",
    ],
    faq: [
      {
        question: "How many days until Thanksgiving?",
        answer:
          "The countdown at the top of this page shows the exact number of days until Thanksgiving in your time zone. It updates on its own every day.",
      },
      {
        question: "When is Thanksgiving 2026?",
        answer: "Thanksgiving 2026 is on Thursday, November 26. In 2027, it is on Thursday, November 25.",
      },
      {
        question: "Why does the date of Thanksgiving change every year?",
        answer:
          "In the United States, Thanksgiving is always on the fourth Thursday of November. That Thursday lands on a different date each year, anywhere from November 22 to November 28.",
      },
      {
        question: "Is this countdown for US or Canadian Thanksgiving?",
        answer:
          "This countdown is for US Thanksgiving. Canadian Thanksgiving is on the second Monday of October.",
      },
    ],
    about: `## Thanksgiving dates for the next five years

US Thanksgiving is always on the fourth Thursday of November.

| Year | Thanksgiving Day |
| --- | --- |
| 2026 | Thursday, November 26 |
| 2027 | Thursday, November 25 |
| 2028 | Thursday, November 23 |
| 2029 | Thursday, November 22 |
| 2030 | Thursday, November 28 |

## How to find the date of Thanksgiving

You can find it on any calendar in two steps:

1. Look at November and find the first Thursday.
2. Count forward three more Thursdays. That fourth Thursday is Thanksgiving.

Because November 1 can fall on any day of the week, Thanksgiving is always between November 22 and November 28.

## A simple Thanksgiving planning timeline

- **3 to 4 weeks before:** Make your guest list and plan the menu.
- **2 weeks before:** Order a fresh turkey or buy a frozen one.
- **4 to 5 days before:** Start thawing a frozen turkey in the fridge. Plan about 1 day for every 4 to 5 pounds.
- **1 to 2 days before:** Make pies, sides, and anything that can be cooked ahead.
- **The day before:** Clean the kitchen and set the table.

A clean house makes hosting much easier. Our [guide to a quick deep clean](/how-to-clean-a-dusty-house) can help you get ready. And if you are splitting the bill for a meal out, our [tip calculator guide](/how-to-calculate-a-tip) makes the math simple.

Christmas comes right after, so you may also like our [Christmas countdown](/tools/days-until-christmas).`,
    keywords: ["thanksgiving countdown", "days until thanksgiving", "how many days until thanksgiving", "when is thanksgiving"],
    publishedAt: "2026-09-28",
    updatedAt: "2026-09-28",
  },
  {
    slug: "days-until-halloween",
    name: "Halloween Countdown",
    h1: "How Many Days Until Halloween?",
    title: "How Many Days Until Halloween? Live Countdown",
    description:
      "See how many days, weeks, and hours are left until Halloween on October 31 with this free live countdown. It updates every second in your time zone.",
    summary: "Live countdown of the days and weeks until Halloween.",
    howTo: [
      "Open this page. The countdown starts on its own and updates every second.",
      "Read the big number for the days left, or check the weeks, sleeps, and weekends below it.",
      "Bookmark the page. After Halloween it starts counting to next year on its own.",
    ],
    faq: [
      {
        question: "How many days until Halloween?",
        answer:
          "The countdown at the top of this page shows the exact number of days until Halloween in your time zone. It updates on its own every day.",
      },
      {
        question: "What day of the week is Halloween 2026?",
        answer: "Halloween 2026 is on a Saturday, October 31. In 2027, it falls on a Sunday.",
      },
      {
        question: "Is Halloween always on October 31?",
        answer:
          "Yes. Halloween is always on October 31. Some towns move trick-or-treating to a nearby day, so check your local news or city website.",
      },
    ],
    about: `## Halloween dates for the next five years

Halloween is always on October 31, but the day of the week changes.

| Year | Halloween |
| --- | --- |
| 2026 | Saturday, October 31 |
| 2027 | Sunday, October 31 |
| 2028 | Tuesday, October 31 |
| 2029 | Wednesday, October 31 |
| 2030 | Thursday, October 31 |

## A simple Halloween planning list

- **4 weeks before:** Pick costumes. Order online early, because popular ones sell out.
- **2 to 3 weeks before:** Buy pumpkins and decorations.
- **1 week before:** Carve pumpkins. Carved pumpkins usually last about a week.
- **A few days before:** Buy candy and check your porch lights and walkway.

## Halloween safety tips

- Add reflective tape or glow sticks to costumes so drivers can see kids.
- Use face paint instead of masks that block vision.
- Walk on sidewalks and cross at corners.
- Check candy before kids eat it, and toss anything that is opened.

Fall is also when fruit flies and gnats show up around pumpkins and candy bowls. If that happens, our [fruit fly guide](/how-to-get-rid-of-fruit-flies) shows easy ways to get rid of them. Planning ahead for the next holiday? Try our [Thanksgiving countdown](/tools/days-until-thanksgiving).`,
    keywords: ["halloween countdown", "days until halloween", "how many days until halloween", "when is halloween"],
    publishedAt: "2026-09-28",
    updatedAt: "2026-09-28",
  },
  {
    slug: "days-until-new-year",
    name: "New Year Countdown",
    h1: "How Many Days Until New Year?",
    title: "How Many Days Until New Year? Live Countdown",
    description:
      "See how many days, hours, minutes, and seconds are left until New Year's Day with this free live countdown. It counts to midnight in your time zone.",
    summary: "Live countdown to midnight on New Year's Day.",
    howTo: [
      "Open this page. The countdown starts on its own and updates every second.",
      "Read the big number for the days left, or watch the hours, minutes, and seconds tick down.",
      "Keep the page open on New Year's Eve to count down to midnight.",
    ],
    faq: [
      {
        question: "How many days until New Year?",
        answer:
          "The countdown at the top of this page shows the exact number of days until January 1 in your time zone. It updates on its own every day.",
      },
      {
        question: "What day of the week is New Year's Day 2027?",
        answer: "New Year's Day 2027 is on a Friday, January 1. In 2028, it falls on a Saturday.",
      },
      {
        question: "Does the countdown reach zero at midnight where I live?",
        answer:
          "Yes. It uses the clock on your phone or computer, so it counts down to midnight on January 1 in your own time zone.",
      },
    ],
    about: `## New Year's Day dates for the next five years

| Year | New Year's Day |
| --- | --- |
| 2027 | Friday, January 1 |
| 2028 | Saturday, January 1 |
| 2029 | Monday, January 1 |
| 2030 | Tuesday, January 1 |
| 2031 | Wednesday, January 1 |

## Why New Year starts at different times around the world

Each time zone reaches midnight at a different time. Islands in the Pacific Ocean, like Kiribati, see the new year first. New York reaches midnight about 5 hours after London. Some US islands, like American Samoa, are among the last places to ring in the new year.

## Easy ways to get ready for the new year

- **Set one or two simple goals.** Small, clear goals are easier to keep than a long list.
- **Clean out your phone.** A new year is a good time to delete old photos and apps. Our [guide to clearing phone storage](/why-is-my-phone-storage-full) shows how.
- **Do a quick home reset.** Clear clutter and dust before the year starts.
- **Plan your budget.** Look back at what you spent during the holidays. Our [percentage change guide](/how-to-calculate-percentage-change) helps you compare this year to last year.

Counting down to an earlier holiday too? See our [Christmas countdown](/tools/days-until-christmas).`,
    keywords: ["new year countdown", "days until new year", "how many days until new year", "new year's day"],
    publishedAt: "2026-09-28",
    updatedAt: "2026-09-28",
  },
  {
    slug: "keyword-cannibalization-checker",
    image: { src: "/images/tools/keyword-cannibalization-checker.webp", alt: "Laptop showing three pages competing for the same keyword, with a notebook of SEO checks", width: 1536, height: 1024 },
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
