import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/categories";
import { pageMetadata } from "@/lib/metadata";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = pageMetadata({
  title: "About TimeToNote",
  absoluteTitle: true,
  description:
    "TimeToNote publishes practical, plain-English guides to everyday problems at home, with devices and online. Learn who we are and how we work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <StaticPage
      title="About TimeToNote"
      path="/about"
      intro="TimeToNote exists to answer one kind of question well: “Why is this happening, and how do I fix it?”"
    >
      <h2>What we do</h2>
      <p>
        We write practical guides to the everyday problems that send people to a search engine: a house that gets
        dusty too quickly, a phone that won’t charge, Wi-Fi that keeps dropping, or a small annoyance that has a
        simple fix once you know it. Each guide explains the likely causes first, then walks through solutions in a
        sensible order: the quick checks, then the fixes that take more effort.
      </p>

      <h2>What you’ll find here</h2>
      <ul>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link href={c.path}>{c.name}</Link>: {c.summary}
          </li>
        ))}
      </ul>

      <h2>How we write</h2>
      <p>
        Guides are researched against manufacturer documentation, official support pages and reputable sources, and
        written to be read quickly on a phone. We don’t pad articles to hit a word count, and we don’t publish
        “fixes” we wouldn’t try ourselves. Where a problem could be a safety risk, like gas, electrical work, mold, or batteries,
        we say so clearly and recommend a professional. Read the full <Link href="/editorial-policy">editorial
        policy</Link> for details.
      </p>

      <h2>Independent and reader-first</h2>
      <p>
        TimeToNote was relaunched in 2026 as an independent editorial site with a single focus: practical problems
        and useful solutions. We don’t sell guest posts or paid links, and advertising, if we ever carry it, will
        never decide what we recommend.
      </p>

      <h2>Contact</h2>
      <p>
        Spotted a mistake, or have a problem you’d like us to cover? Email{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> or visit the{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </StaticPage>
  );
}
