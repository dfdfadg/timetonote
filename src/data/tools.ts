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
    slug: "space-heater-cost-calculator",
    name: "Space Heater Cost Calculator",
    h1: "Space Heater Cost Calculator",
    title: "Space Heater Cost Calculator: Cost Per Hour, Day and Month",
    description:
      "See how much your space heater costs to run per hour, day, month, and winter. Enter the wattage, hours, and your electricity rate for an instant answer.",
    summary: "Find out what your space heater costs to run each hour, day, and month.",
    howTo: [
      "Pick a common heater size or type the wattage from your heater's label.",
      "Enter how many hours a day you run it.",
      "Enter your electricity rate in cents per kWh from your electric bill. The costs update right away.",
    ],
    faq: [
      {
        question: "How much does it cost to run a 1500-watt space heater?",
        answer:
          "A 1500-watt heater uses 1.5 kWh each hour on high. At 17 cents per kWh, that is about 26 cents an hour, $2.04 for 8 hours, or about $61 a month if you run it 8 hours a day.",
      },
      {
        question: "Is it cheaper to use a space heater or central heat?",
        answer:
          "Heating one small room with a space heater and turning the thermostat down for the rest of the house can save money. Heating the whole home with several space heaters is usually more expensive than a furnace or heat pump.",
      },
      {
        question: "Where do I find my electricity rate?",
        answer:
          "Look on your electric bill for the price per kWh. If your bill has several charges, add the supply and delivery rates together. Many U.S. homes pay somewhere around 15 to 20 cents per kWh.",
      },
      {
        question: "Does the eco or low setting save money?",
        answer:
          "Yes. Most heaters use about 750 watts on low, which is half the cost of high. A heater with a thermostat also turns off when the room is warm, which lowers the real cost.",
      },
    ],
    about: `## How the space heater cost is calculated

The math is simple:

**Cost per hour = watts ÷ 1,000 × electricity rate**

For example, a 1,500-watt heater at 17 cents per kWh costs 1.5 × $0.17 = **about $0.26 an hour**.

| Heater setting | Watts | Cost per hour at 17¢ | 8 hours a day for 30 days |
| --- | --- | --- | --- |
| Low | 750 | about $0.13 | about $31 |
| Medium | 1,000 | about $0.17 | about $41 |
| High | 1,500 | about $0.26 | about $61 |

## Ways to spend less on space heating

- **Heat the room you are in,** and lower the main thermostat a few degrees.
- **Use the thermostat or eco mode** so the heater cycles off when the room is warm.
- **Close doors** to keep warm air in one room.
- **Seal drafts** around windows and doors.

## Stay safe with space heaters

- Keep heaters at least 3 feet from anything that can burn, like curtains, bedding, and furniture.
- Plug heaters straight into a wall outlet, not an extension cord or power strip.
- Turn heaters off when you leave the room or go to sleep.
- Choose a model with tip-over and overheat shutoff.
- Make sure your [smoke alarms are working and not chirping](/why-is-my-smoke-detector-chirping).

If your main heat is not keeping up, check our guide on [a furnace blowing cold air](/why-is-my-furnace-blowing-cold-air) before you rely on space heaters.`,
    relatedArticles: ["why-is-my-furnace-blowing-cold-air", "why-is-there-condensation-on-my-windows"],
    keywords: ["space heater cost", "space heater electricity cost", "cost to run space heater", "1500 watt heater cost"],
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "costco-membership-calculator",
    name: "Costco Membership Calculator",
    h1: "Costco Membership Calculator: Is Executive Worth It?",
    title: "Costco Membership Calculator: Is Executive Worth It?",
    description:
      "Enter what you spend at Costco each month to see if the Executive membership pays off, how big your 2% reward would be, and your break-even point.",
    summary: "See if Costco Executive pays for itself based on your spending.",
    howTo: [
      "Enter how much you spend at Costco in a typical month.",
      "Read the answer at the top. It tells you if Executive or Gold Star is the better deal.",
      "Check your yearly 2% reward and the break-even amount below it.",
    ],
    faq: [
      {
        question: "How much do I need to spend at Costco for Executive to be worth it?",
        answer:
          "About $3,250 a year, or roughly $271 a month. At that point, the 2% reward equals the extra $65 you pay for Executive.",
      },
      {
        question: "Can I lose money by upgrading to Executive?",
        answer:
          "Costco lets you downgrade back to Gold Star and refunds the upgrade fee, minus any 2% reward you already earned. This makes it low risk to try.",
      },
      {
        question: "What purchases do not earn the 2% reward?",
        answer:
          "Some purchases, such as gas and tobacco, and certain services do not count. Check Costco's current list before you decide.",
      },
    ],
    about: `## How the Costco calculator works

- **Gold Star** costs $65 a year. **Executive** costs $130 a year, which is $65 more.
- Executive members get a **2% reward** on most purchases, capped at $1,250 a year.
- The break-even point is **$65 ÷ 2% = $3,250 a year**.

| Monthly spending | Yearly 2% reward | Executive vs Gold Star |
| --- | --- | --- |
| $150 | $36 | Gold Star is better |
| $271 | $65 | Break even |
| $400 | $96 | Executive saves about $31 |
| $600 | $144 | Executive saves about $79 |

For the full picture, read our guide on [whether a Costco membership is worth it](/is-costco-membership-worth-it). If it is not for you, here is [how to cancel Costco and get your fee back](/how-to-cancel-costco-membership).`,
    relatedArticles: ["is-costco-membership-worth-it", "how-to-cancel-costco-membership"],
    keywords: ["costco executive membership calculator", "is costco executive worth it", "costco 2% reward calculator", "costco membership calculator"],
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "dehumidifier-size-calculator",
    name: "Dehumidifier Size Calculator",
    h1: "What Size Dehumidifier Do I Need?",
    title: "Dehumidifier Size Calculator: What Size Do I Need?",
    description:
      "Find the right dehumidifier size in pints for your room, basement, or home. Enter the square footage and how damp it is to get a quick recommendation.",
    summary: "Find the right dehumidifier size in pints for your space.",
    howTo: [
      "Measure the room and enter the area in square feet.",
      "Choose how damp the space feels.",
      "Check the box if it is a basement, laundry room, or crawl space, then read your recommended size.",
    ],
    faq: [
      {
        question: "What size dehumidifier do I need for a basement?",
        answer:
          "Most basements need a 35-pint or 50-pint unit. Basements are usually damper than living spaces, so pick one size larger than you would for a bedroom of the same size.",
      },
      {
        question: "Is a bigger dehumidifier better?",
        answer:
          "Usually, a little bigger is better. A larger unit removes moisture faster, runs fewer hours, and often lasts longer. Just make sure it fits your space and budget.",
      },
      {
        question: "Why do new dehumidifiers have smaller pint numbers?",
        answer:
          "In 2019, the U.S. changed how dehumidifiers are tested. A unit that used to be labeled 70 pints is often labeled about 50 pints now, even though it removes the same amount of water.",
      },
      {
        question: "What humidity should I set my dehumidifier to?",
        answer: "The EPA suggests keeping indoor humidity between 30 and 50 percent. Setting a dehumidifier to about 45 to 50 percent works well in most homes.",
      },
    ],
    about: `## Dehumidifier size chart

This chart uses the pint ratings on new models.

| Area | Damp | Very damp | Wet |
| --- | --- | --- | --- |
| Up to 500 sq ft | 22 pints | 35 pints | 50 pints |
| 500 to 1,000 sq ft | 35 pints | 50 pints | 50 pints or larger |
| 1,000 to 2,500 sq ft | 50 pints | 50 pints or larger | Whole-house |

For basements, laundry rooms, and crawl spaces, go up one size.

## Signs you need a dehumidifier

- A musty smell that will not go away
- Water on the inside of your windows
- Damp spots, mold, or mildew
- Air that feels sticky even with the AC on

Our guides on [a house that stays humid with the AC on](/house-humid-with-ac), [condensation on windows](/why-is-there-condensation-on-my-windows), and [getting rid of a musty room smell](/why-does-my-room-smell-musty) explain the causes and other fixes.`,
    relatedArticles: ["house-humid-with-ac", "why-does-my-room-smell-musty"],
    keywords: ["dehumidifier size calculator", "what size dehumidifier do i need", "dehumidifier pints square feet", "basement dehumidifier size"],
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "walmart-plus-calculator",
    name: "Walmart+ Savings Calculator",
    h1: "Walmart+ Savings Calculator: Is It Worth It for You?",
    title: "Walmart+ Savings Calculator: Is Walmart Plus Worth It?",
    description:
      "Find out if Walmart+ pays for itself. Enter your deliveries, online orders, gas, and streaming use to see your yearly savings after the membership fee.",
    summary: "Add up what Walmart+ would really save you in a year.",
    howTo: [
      "Choose the yearly or monthly plan.",
      "Enter how often you get grocery delivery, place small online orders, and buy gas at member stations.",
      "Add the value of the included streaming service if you would use it. Your net savings show below.",
    ],
    faq: [
      {
        question: "How many orders do I need for Walmart+ to be worth it?",
        answer:
          "If you would otherwise pay about $10 per delivery, around 10 grocery deliveries a year cover the $98 yearly fee. Gas savings and streaming add even more value.",
      },
      {
        question: "Are the numbers in this calculator exact?",
        answer:
          "No. Delivery fees, gas prices, and streaming prices change and vary by area. The fields are set to typical values, and you can change them to match what you pay.",
      },
    ],
    about: `## How the Walmart+ calculator works

The calculator adds up four kinds of savings and subtracts the membership fee:

- **Delivery fees** you skip on grocery orders of $35 or more
- **Shipping fees** you skip on smaller online orders
- **Gas savings** of up to 10 cents per gallon at member stations
- **Streaming value** from the included Paramount+ Essential or Peacock Premium plan

At the time of writing, Walmart+ costs $98 a year or $12.95 a month. Prices and perks can change, so check Walmart's website.

To learn how to join, what you get, and how to cancel, read our [Walmart+ sign-up guide](/how-to-sign-up-for-walmart-plus). Comparing memberships? Try our [Costco membership calculator](/tools/costco-membership-calculator) too.`,
    relatedArticles: ["how-to-sign-up-for-walmart-plus", "is-costco-membership-worth-it"],
    keywords: ["walmart plus calculator", "is walmart plus worth it", "walmart+ savings", "walmart plus membership value"],
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "air-fryer-conversion-calculator",
    name: "Air Fryer Conversion Calculator",
    h1: "Air Fryer Conversion Calculator: Oven to Air Fryer",
    title: "Air Fryer Conversion Calculator: Oven to Air Fryer Time and Temp",
    description:
      "Convert any oven recipe to the air fryer in seconds. Enter the oven temperature and time to get the right air fryer temperature and cook time.",
    summary: "Turn oven times and temperatures into air fryer settings.",
    howTo: [
      "Choose °F or °C.",
      "Enter the oven temperature and cook time from your recipe.",
      "Use the air fryer temperature and time shown, and start checking your food a few minutes early.",
    ],
    faq: [
      {
        question: "How do you convert oven time to air fryer time?",
        answer:
          "Lower the temperature by 25°F (about 15°C) and cut the cooking time by about 20 percent. A recipe that bakes at 400°F for 25 minutes usually takes about 20 minutes at 375°F in an air fryer.",
      },
      {
        question: "Do I need to preheat my air fryer?",
        answer:
          "Many recipes turn out crispier if you preheat for 3 to 5 minutes. Some air fryers heat so fast that preheating is not needed. Check your manual.",
      },
      {
        question: "Can I put foil or parchment in an air fryer?",
        answer:
          "Often yes, but keep it weighed down by food so it does not blow into the heating element, and do not cover the whole basket, because air needs to flow.",
      },
    ],
    about: `## Air fryer conversion chart

| Oven | Air fryer |
| --- | --- |
| 350°F for 20 min | 325°F for 16 min |
| 375°F for 25 min | 350°F for 20 min |
| 400°F for 25 min | 375°F for 20 min |
| 425°F for 20 min | 400°F for 16 min |
| 450°F for 15 min | 425°F for 12 min |

## Tips for better air fryer results

- **Do not overcrowd the basket.** Cook in batches so hot air can reach every side.
- **Shake or flip halfway** for even browning.
- **Use a little oil** on foods like vegetables and frozen fries for extra crunch.
- **Check early.** Air fryers vary a lot by size and brand.
- **Use a food thermometer** for meat. Chicken should reach 165°F inside.

Cooking for a holiday crowd? Count down the days with our [Thanksgiving countdown tool](/tools/days-until-thanksgiving).`,
    relatedArticles: [],
    keywords: ["air fryer conversion calculator", "oven to air fryer", "air fryer time conversion", "air fryer temperature conversion"],
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "hours-and-minutes-calculator",
    name: "Hours and Minutes Calculator",
    h1: "Hours and Minutes Calculator",
    title: "Hours and Minutes Calculator: Add, Subtract and Convert Time",
    description:
      "Add or subtract hours and minutes, convert minutes to hours, and turn time into decimal hours for timesheets. Free, fast, and easy to use.",
    summary: "Add, subtract, and convert hours, minutes, and seconds.",
    howTo: [
      "Choose what you want to do: add or subtract time, or convert minutes or decimal hours.",
      "Enter the hours, minutes, and seconds.",
      "Read the answer in hours and minutes, clock format, and decimal hours.",
    ],
    faq: [
      {
        question: "How do I convert minutes to hours?",
        answer: "Divide the minutes by 60. For example, 135 minutes ÷ 60 = 2.25 hours, which is 2 hours and 15 minutes.",
      },
      {
        question: "How do I add hours and minutes together?",
        answer:
          "Add the hours and the minutes separately. If the minutes add up to 60 or more, subtract 60 and add 1 to the hours. For example, 2:45 + 1:30 = 3 hours 75 minutes, which is 4 hours 15 minutes.",
      },
      {
        question: "What is 7.75 hours in hours and minutes?",
        answer: "7.75 hours is 7 hours and 45 minutes, because 0.75 × 60 = 45 minutes.",
      },
    ],
    about: `## Minutes to hours chart

| Minutes | Hours and minutes | Decimal hours |
| --- | --- | --- |
| 15 | 0 hr 15 min | 0.25 |
| 30 | 0 hr 30 min | 0.5 |
| 45 | 0 hr 45 min | 0.75 |
| 90 | 1 hr 30 min | 1.5 |
| 120 | 2 hr 0 min | 2 |
| 150 | 2 hr 30 min | 2.5 |

## Where this helps

- Adding up work hours for a timesheet
- Working out how long a trip or project took
- Adding cooking or workout times

Need to turn payroll hours like 7.8 into hours and minutes? Use our [decimal to time calculator](/tools/decimal-to-time-calculator).`,
    keywords: ["hours and minutes calculator", "time calculator", "minutes to hours", "add hours and minutes"],
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
  },
  {
    slug: "decimal-to-time-calculator",
    name: "Decimal to Time Calculator",
    h1: "Decimal to Time Calculator",
    title: "Decimal to Time Calculator: Decimal Hours to Hours and Minutes",
    description:
      "Convert decimal hours like 7.8 into hours, minutes, and seconds, or turn a time into decimal hours for payroll and timesheets.",
    summary: "Turn decimal hours into hours and minutes, and back.",
    howTo: [
      "Enter the decimal hours, such as 7.8.",
      "Read the answer in hours and minutes and in clock format.",
      "Switch to Time to decimal hours if you need to go the other way.",
    ],
    faq: [
      {
        question: "How do I convert decimal hours to minutes?",
        answer: "Multiply the decimal part by 60. For 7.8 hours, 0.8 × 60 = 48, so 7.8 hours is 7 hours and 48 minutes.",
      },
      {
        question: "How do I convert hours and minutes to decimal?",
        answer: "Divide the minutes by 60 and add it to the hours. For 6 hours and 20 minutes, 20 ÷ 60 = 0.33, so it is about 6.33 hours.",
      },
    ],
    about: `## Decimal to minutes chart

| Decimal | Minutes |
| --- | --- |
| 0.1 | 6 min |
| 0.2 | 12 min |
| 0.25 | 15 min |
| 0.3 | 18 min |
| 0.4 | 24 min |
| 0.5 | 30 min |
| 0.6 | 36 min |
| 0.7 | 42 min |
| 0.75 | 45 min |
| 0.8 | 48 min |
| 0.9 | 54 min |

Payroll systems often show hours as decimals, so 8.5 hours means 8 hours and 30 minutes, not 8 hours and 50 minutes. To add or subtract times, use our [hours and minutes calculator](/tools/hours-and-minutes-calculator).`,
    keywords: ["decimal to time calculator", "decimal hours to minutes", "decimal to hours and minutes", "convert decimal hours"],
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    h1: "Age Calculator: How Old Am I?",
    title: "Age Calculator: Exact Age in Years, Months and Days",
    description:
      "Find the exact age of anyone, including a child or baby, in years, months, and days. See total weeks and days and how long until the next birthday.",
    summary: "Exact age in years, months, and days, plus the next birthday.",
    howTo: [
      "Pick the date of birth.",
      "Leave the second date empty to use today, or pick another date to find the age on that day.",
      "Read the age in years, months, and days, plus totals and the days until the next birthday.",
    ],
    faq: [
      {
        question: "How do I calculate my exact age?",
        answer:
          "Subtract your birth year from the current year. If your birthday has not happened yet this year, subtract 1. Then count the months and days since your last birthday. This calculator does all of it for you.",
      },
      {
        question: "How do I work out a baby's age in months?",
        answer: "Enter the baby's birth date. The calculator shows the age in years, months, and days, and the total months, which is how doctors usually track young children.",
      },
      {
        question: "Does the calculator count leap years?",
        answer: "Yes. It uses real calendar dates, so leap years and months with different numbers of days are counted correctly.",
      },
    ],
    about: `## Why exact age matters

Exact age is handy for school sign-ups, sports leagues, forms, and tracking a baby's growth. Many forms ask for age in years and months, not just years.

## Fun ways to use it

- Find out how many days old you are
- Count down to your next birthday
- Work out someone's age on a past or future date

Planning a celebration? See how many days are left with our [Christmas countdown](/tools/days-until-christmas).`,
    keywords: ["age calculator", "how old am i", "age calculator of child", "exact age calculator"],
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
  },
  {
    slug: "shoe-size-converter",
    name: "Women's to Men's Shoe Size Converter",
    h1: "Women's to Men's Shoe Size Converter",
    title: "Women's to Men's Shoe Size Conversion Calculator (US)",
    description:
      "Convert US women's shoe sizes to men's sizes and back in one click. Includes a full conversion chart and tips for getting the right fit.",
    summary: "Switch between US women's and men's shoe sizes.",
    howTo: [
      "Choose women's to men's or men's to women's.",
      "Enter your US shoe size. Half sizes are fine.",
      "Use the result as a starting point and check the brand's own chart.",
    ],
    faq: [
      {
        question: "What is a women's 8 in men's shoes?",
        answer: "A women's 8 is about a men's 6.5 in US sizes. Women's sizes are usually 1.5 sizes larger than men's for the same foot length.",
      },
      {
        question: "Are men's shoes wider than women's?",
        answer: "Usually, yes. Men's shoes are often made a bit wider. If you have narrow feet, a men's shoe may feel loose even in the right length.",
      },
    ],
    about: `## US women's to men's shoe size chart

| Women's | Men's |
| --- | --- |
| 6 | 4.5 |
| 7 | 5.5 |
| 8 | 6.5 |
| 9 | 7.5 |
| 10 | 8.5 |
| 11 | 9.5 |
| 12 | 10.5 |

This chart uses the common 1.5 size difference. Some brands, especially sneaker brands, use a 1 or 2 size difference, so always check the size chart on the product page.

## Tips for a good fit

- Measure your feet in the afternoon, when they are slightly larger.
- Leave about a thumb's width of space in front of your longest toe.
- Try shoes on with the socks you plan to wear.`,
    keywords: ["women's to men's shoe size", "shoe size conversion", "men's to women's shoe size", "unisex shoe size"],
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
  },
  {
    slug: "engagement-rate-calculator",
    name: "Engagement Rate Calculator",
    h1: "Engagement Rate Calculator for Instagram and TikTok",
    title: "Engagement Rate Calculator for Instagram and TikTok",
    description:
      "Calculate your Instagram or TikTok engagement rate by followers or by views. Enter likes, comments, shares, and saves to get your rate instantly.",
    summary: "Work out your Instagram or TikTok engagement rate.",
    howTo: [
      "Choose to calculate by followers or by views.",
      "Enter the likes, comments, shares, and saves for a post.",
      "Enter your followers or the post's views to see the engagement rate.",
    ],
    faq: [
      {
        question: "How do you calculate Instagram engagement rate?",
        answer:
          "Add up the likes, comments, shares, and saves on a post, divide by your number of followers, and multiply by 100. For example, 487 interactions ÷ 15,000 followers × 100 = 3.25%.",
      },
      {
        question: "How is TikTok engagement rate calculated?",
        answer: "TikTok is often measured by views instead of followers, because many views come from people who do not follow you. Divide total interactions by views and multiply by 100.",
      },
      {
        question: "What is a good engagement rate?",
        answer:
          "It depends on the platform and your account size. Smaller accounts often have higher rates than big ones. The most useful comparison is your own posts over time, using the same method each time.",
      },
    ],
    about: `## Engagement rate formulas

- **By followers:** (likes + comments + shares + saves) ÷ followers × 100
- **By views:** (likes + comments + shares + saves) ÷ views × 100

Rates by views are usually lower when a post goes viral, and rates by followers can look high when a post reaches many non-followers. Pick one method and stick with it.

## How to raise engagement

- Post when your followers are most active.
- Ask a simple question to get comments.
- Use short, clear captions and strong first seconds in videos.
- Reply to comments quickly.`,
    keywords: ["engagement rate calculator", "instagram engagement rate calculator", "tiktok engagement rate calculator"],
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
  },
  {
    slug: "dog-years-calculator",
    name: "Dog Years Calculator",
    h1: "Dog Years to Human Years Calculator",
    title: "Dog Years Calculator: Dog Age to Human Years by Size",
    description:
      "Convert your dog's age to human years, or human years to dog years, based on your dog's size. Includes a dog age chart for small, medium, and large dogs.",
    summary: "Convert dog years to human years by size, and back.",
    howTo: [
      "Choose dog years to human years or the other way around.",
      "Pick your dog's adult size.",
      "Enter the age to see the result.",
    ],
    faq: [
      {
        question: "Is one dog year really seven human years?",
        answer:
          "No. That is an old myth. Dogs grow up much faster early in life. The first year is about 15 human years, the second adds about 9, and after that each year adds about 4 to 7 depending on size.",
      },
      {
        question: "Why do big dogs age faster?",
        answer: "Large and giant breeds tend to have shorter lives and reach their senior years sooner than small dogs, so each year after age 2 counts for more human years.",
      },
      {
        question: "When is a dog a senior?",
        answer: "Small dogs are often considered seniors around age 7, while large breeds may be seniors at 5 or 6. Ask your vet about senior checkups.",
      },
    ],
    about: `## Dog age chart

| Dog age | Small | Medium | Large | Giant |
| --- | --- | --- | --- | --- |
| 1 | 15 | 15 | 15 | 15 |
| 2 | 24 | 24 | 24 | 24 |
| 5 | 36 | 39 | 42 | 45 |
| 8 | 48 | 54 | 60 | 66 |
| 10 | 56 | 64 | 72 | 80 |
| 12 | 64 | 74 | 84 | 94 |
| 15 | 76 | 89 | 102 | 115 |

These are estimates. Breed, health, and care all affect how a dog ages. Regular vet visits matter more than any chart.`,
    keywords: ["dog years calculator", "human years to dog years", "dog age calculator", "dog years to human years"],
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
  },
  {
    slug: "water-intake-calculator",
    name: "Water Intake Calculator",
    h1: "How Much Water Should I Drink a Day?",
    title: "Water Intake Calculator: How Much Water Should I Drink a Day?",
    description:
      "Estimate how much water to drink each day based on your weight, exercise, and climate. See the answer in ounces, cups, and liters.",
    summary: "Estimate your daily water needs in ounces, cups, and liters.",
    howTo: [
      "Enter your weight in pounds.",
      "Enter how many minutes you exercise each day.",
      "Check the box if it is hot where you live, then read your daily goal.",
    ],
    faq: [
      {
        question: "How much water should I drink a day?",
        answer:
          "A common rule of thumb is half your body weight in ounces, plus more when you exercise or it is hot. The National Academies suggest about 15.5 cups of total fluids a day for men and 11.5 cups for women, including water from food and other drinks.",
      },
      {
        question: "Do coffee, tea, and food count?",
        answer: "Yes. All drinks count toward your fluids, and about 20 percent of daily water usually comes from food like fruits, vegetables, and soup.",
      },
      {
        question: "How do I know if I am drinking enough?",
        answer: "Pale yellow urine and rarely feeling thirsty are good signs. Dark urine, headaches, and tiredness can mean you need more water.",
      },
    ],
    about: `## Water intake by weight

| Weight | Daily water (no exercise) |
| --- | --- |
| 120 lb | 60 oz (7.5 cups) |
| 150 lb | 75 oz (about 9.5 cups) |
| 180 lb | 90 oz (about 11 cups) |
| 210 lb | 105 oz (about 13 cups) |

## Easy ways to drink more water

- Keep a refillable bottle with you.
- Drink a glass with every meal.
- Add lemon or fruit for flavor.
- Eat water-rich foods like watermelon, cucumbers, and oranges.

If your tap water tastes off, see [why tap water tastes like chlorine](/why-does-my-water-taste-like-chlorine). This tool gives a general estimate and is not medical advice.`,
    relatedArticles: ["why-does-my-water-taste-like-chlorine", "how-to-install-a-water-filtration-system"],
    keywords: ["how much water should i drink a day calculator", "water intake calculator", "daily water intake"],
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
  },
  {
    slug: "mpg-calculator",
    name: "MPG Calculator",
    h1: "Miles Per Gallon (MPG) Calculator",
    title: "MPG Calculator: Miles Per Gallon and Trip Fuel Cost",
    description:
      "Work out your car's miles per gallon, cost per mile, and the fuel cost of any trip. Enter miles driven, gallons used, and the price of gas.",
    summary: "Find your MPG, cost per mile, and trip fuel cost.",
    howTo: [
      "Fill your tank and reset the trip meter.",
      "At the next fill-up, enter the miles driven and the gallons it took to refill.",
      "Add the gas price and a trip distance to see cost per mile and trip cost.",
    ],
    faq: [
      {
        question: "How do I calculate miles per gallon?",
        answer: "Divide the miles you drove by the gallons you used. For example, 320 miles ÷ 11.5 gallons = about 27.8 MPG.",
      },
      {
        question: "Why is my real MPG lower than the sticker?",
        answer: "City driving, cold weather, short trips, heavy loads, low tire pressure, and fast highway speeds can all lower real-world MPG.",
      },
    ],
    about: `## How to get better gas mileage

- Keep tires filled to the pressure on the sticker inside the driver's door.
- Drive smoothly. Hard starts and stops waste gas.
- Slow down on the highway.
- Remove roof racks and heavy items you do not need.
- Keep up with oil changes and air filters.

Walmart+ members can save up to 10 cents a gallon at some stations. See if it pays off with our [Walmart+ savings calculator](/tools/walmart-plus-calculator).`,
    keywords: ["mpg calculator", "miles per gallon calculator", "fuel cost calculator", "gas mileage calculator"],
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
  },
  {
    slug: "salary-increase-calculator",
    name: "Salary Increase Calculator",
    h1: "Salary Increase Percentage Calculator",
    title: "Salary Increase Calculator: Raise Percentage and New Pay",
    description:
      "Find your raise percentage from your old and new pay, or see your new salary after a raise. Shows yearly, monthly, and hourly amounts.",
    summary: "Work out your raise percentage or your new pay.",
    howTo: [
      "Choose if you know your new pay or your raise percentage.",
      "Enter your current yearly pay and the other number.",
      "Read your raise, new pay, and extra money per year and per month.",
    ],
    faq: [
      {
        question: "How do I calculate my raise percentage?",
        answer: "Subtract your old pay from your new pay, divide by your old pay, and multiply by 100. From $55,000 to $58,500 is a 6.36% raise.",
      },
      {
        question: "What is a normal raise?",
        answer: "Many U.S. employers give yearly raises of about 3 to 5 percent, but it varies by company, job, and the economy. A promotion or new job often brings a bigger jump.",
      },
    ],
    about: `## Raise examples

| Current pay | Raise | New pay | Extra per month |
| --- | --- | --- | --- |
| $40,000 | 3% | $41,200 | $100 |
| $55,000 | 4% | $57,200 | $183 |
| $70,000 | 5% | $73,500 | $292 |
| $90,000 | 10% | $99,000 | $750 |

Amounts are before taxes. For other percentage math, use our [free percentage calculator](/tools/percentage-calculator) or read [how to calculate percentage change](/how-to-calculate-percentage-change).`,
    relatedArticles: ["how-to-calculate-percentage-change"],
    keywords: ["salary increase percentage calculator", "raise calculator", "pay raise calculator", "salary increase calculator"],
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
  },
  {
    slug: "tree-trimming-cost-calculator",
    name: "Tree Trimming Cost Calculator",
    h1: "Tree Trimming Cost Calculator",
    title: "Tree Trimming Cost Calculator: 2026 Prices by Tree Size",
    description:
      "Estimate what tree trimming will cost based on tree height, number of trees, access, and urgency. Uses typical 2026 U.S. prices.",
    summary: "Estimate tree trimming costs by tree size and number.",
    howTo: [
      "Pick the height of the tree.",
      "Enter how many trees need trimming.",
      "Check the boxes for hard access or emergency work to see your estimated range.",
    ],
    faq: [
      {
        question: "How much does it cost to trim a tree?",
        answer: "Most homeowners pay around $475 per tree on average. Small trees can cost as little as $80, while trees over 60 feet can cost $1,800 or more.",
      },
      {
        question: "When is the best time to trim trees?",
        answer: "Late winter, when trees are dormant, is often best for most trees. Companies may also be less busy then. Remove dead or dangerous branches any time.",
      },
      {
        question: "Will the power company trim trees near lines?",
        answer: "Many utilities trim branches near their power lines for free. Call your utility before hiring anyone, and never trim near lines yourself.",
      },
    ],
    about: `## Typical tree trimming prices (2026)

| Tree height | Typical cost per tree |
| --- | --- |
| Small (under 30 ft) | $80 to $450 |
| Medium (30 to 60 ft) | $150 to $900 |
| Large (over 60 ft) | $200 to $1,850 |

## What changes the price

- **Height and spread.** Taller trees need climbers, bucket trucks, or cranes.
- **Access.** Trees near the house or in fenced backyards take longer.
- **Tree health.** Dead or diseased trees can be riskier to work on.
- **Cleanup.** Hauling away branches may cost extra.

Get at least three written quotes, and ask if the company is insured. Large branches over your roof can also cause damage. If you see new cracks in walls or ceilings after a storm, see [when wall cracks are serious](/wall-cracks-worry).`,
    keywords: ["tree trimming cost calculator", "tree trimming cost", "tree pruning cost", "cost to trim a tree"],
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
  },
  {
    slug: "home-inspection-cost-calculator",
    name: "Home Inspection Cost Calculator",
    h1: "Home Inspection Cost Calculator",
    title: "Home Inspection Cost Calculator: 2026 Prices and Add-Ons",
    description:
      "Estimate the cost of a home inspection by square footage, plus radon, termite, sewer scope, and mold testing. Based on typical 2026 U.S. prices.",
    summary: "Estimate a home inspection's cost, with optional add-on tests.",
    howTo: [
      "Enter the home's size in square feet.",
      "Check any extra tests you want, like radon or a sewer scope.",
      "Read the estimated total range.",
    ],
    faq: [
      {
        question: "How much does a home inspection cost?",
        answer: "A standard inspection for a single-family home usually costs about $300 to $450. Bigger and older homes cost more, and add-on tests like radon or a sewer scope add $75 to $700 each.",
      },
      {
        question: "Who pays for the home inspection?",
        answer: "In most U.S. home sales, the buyer pays for the inspection. It is usually paid at the time of the inspection, not at closing.",
      },
      {
        question: "Is a sewer scope worth it?",
        answer: "It is often worth it for older homes or homes with big trees nearby, because roots and broken pipes can be very costly to fix.",
      },
    ],
    about: `## Typical home inspection prices (2026)

| Home size | Typical cost |
| --- | --- |
| Under 1,000 sq ft | $250 to $350 |
| 1,000 to 1,500 sq ft | $300 to $400 |
| 1,500 to 2,500 sq ft | $325 to $450 |
| 2,500 to 3,500 sq ft | $400 to $550 |

## Common add-on tests

| Test | Typical cost |
| --- | --- |
| Radon | $100 to $200 |
| Termite (WDO) | $75 to $150 |
| Sewer scope | $150 to $300 |
| Mold testing | $300 to $700 |

A good inspector looks for things like [hidden water leaks](/hidden-water-leaks), [serious wall cracks](/wall-cracks-worry), and signs of moisture. Ask for a sample report before you hire one.`,
    relatedArticles: ["hidden-water-leaks", "wall-cracks-worry"],
    keywords: ["home inspection cost calculator", "home inspection cost", "how much is a home inspection"],
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
  },
  {
    slug: "fence-cost-calculator",
    name: "Wood Fence Cost Calculator",
    h1: "Wood Fence Cost Calculator",
    title: "Wood Fence Cost Calculator: Price Per Foot (2026)",
    description:
      "Estimate the installed cost of a pine, cedar, or redwood fence by length, height, and gates. Uses typical 2026 U.S. prices per linear foot.",
    summary: "Estimate a new wood fence by length, wood type, and height.",
    howTo: [
      "Measure and enter the total length of fence in feet.",
      "Pick the wood type and height, and enter the number of gates.",
      "Check the box if an old fence must be removed, then read your estimate.",
    ],
    faq: [
      {
        question: "How much does a wood fence cost per foot?",
        answer: "Most installed wood fences cost about $20 to $35 per foot for pressure-treated pine, $33 to $53 for cedar, and $40 to $65 for redwood, for a standard 6-foot privacy fence.",
      },
      {
        question: "How much does a 150-foot wood fence cost?",
        answer: "A 150-foot, 6-foot pine privacy fence usually costs about $3,000 to $5,250, plus gates. Cedar would be about $4,950 to $7,950.",
      },
      {
        question: "Do I need a permit for a fence?",
        answer: "Many towns require a permit, and HOAs often have their own rules on height and style. Call 811 before digging so buried utility lines can be marked for free.",
      },
    ],
    about: `## Wood fence cost per foot (installed, 6 ft)

| Wood | Cost per linear foot |
| --- | --- |
| Pressure-treated pine | $20 to $35 |
| Cedar | $33 to $53 |
| Redwood | $40 to $65 |

A 4-foot fence usually costs about a quarter less, and an 8-foot fence about a third more. Gates often add $250 to $600 each.

## Tips to save

- Get quotes in late fall or winter, when installers are less busy.
- Split the cost with neighbors on shared fence lines.
- Pick a simple style. Decorative tops and lattice cost more.

Want to know your property size? Try our [lot size to acres calculator](/tools/lot-size-to-acres-calculator).`,
    keywords: ["wood fence cost calculator", "fence cost calculator", "fence cost per foot", "cedar fence cost"],
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
  },
  {
    slug: "lot-size-to-acres-calculator",
    name: "Lot Size to Acres Calculator",
    h1: "Lot Size to Acres Calculator",
    title: "Lot Size to Acres Calculator: Square Feet to Acres",
    description:
      "Convert lot size in square feet or length and width to acres, square meters, and hectares, or convert acres to square feet.",
    summary: "Convert square feet or lot dimensions to acres and more.",
    howTo: [
      "Choose square feet, length × width, or acres.",
      "Enter your numbers.",
      "Read the size in acres, square feet, square meters, and hectares.",
    ],
    faq: [
      {
        question: "How many square feet are in an acre?",
        answer: "One acre is 43,560 square feet. That is about the size of a U.S. football field without the end zones.",
      },
      {
        question: "How do I convert square feet to acres?",
        answer: "Divide the square feet by 43,560. For example, a 10,890 square foot lot is 10,890 ÷ 43,560 = 0.25 acres.",
      },
    ],
    about: `## Common lot sizes

| Acres | Square feet | Example size |
| --- | --- | --- |
| 0.1 | 4,356 | About 66 × 66 ft |
| 0.25 | 10,890 | About 104 × 104 ft |
| 0.5 | 21,780 | About 148 × 148 ft |
| 1 | 43,560 | About 209 × 209 ft |

Your lot size is usually on your property tax bill, deed, or county website. Planning a fence around it? Use our [wood fence cost calculator](/tools/fence-cost-calculator).`,
    keywords: ["lot size to acres calculator", "square feet to acres", "acres calculator", "lot size calculator"],
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
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
