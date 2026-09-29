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
