import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = pageMetadata({
  title: "Contact TimeToNote",
  absoluteTitle: true,
  description: "How to contact the TimeToNote editorial team with corrections, questions or topic suggestions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <StaticPage
      title="Contact us"
      path="/contact"
      intro="We read every message. The fastest way to reach the editorial team is by email."
    >
      <p className="rounded-2xl border border-line bg-surface p-6 text-center">
        <span className="block text-sm text-muted">Email</span>
        <a href={`mailto:${siteConfig.contactEmail}`} className="mt-1 inline-block text-xl font-semibold">
          {siteConfig.contactEmail}
        </a>
      </p>

      <h2>Corrections</h2>
      <p>
        If a guide contains an error or is out of date, please include the page address and what needs changing.
        We review corrections promptly and update the page’s “Updated” date when we make a change. See our{" "}
        <Link href="/editorial-policy">editorial policy</Link> for how corrections are handled.
      </p>

      <h2>Topic suggestions</h2>
      <p>
        Tell us about a problem you couldn’t find a clear answer to. We can’t reply to every suggestion, but they
        directly shape what we write next.
      </p>

      <h2>What we don’t accept</h2>
      <p>
        TimeToNote does not sell guest posts, sponsored articles or paid links. Messages offering these will not
        receive a reply.
      </p>

      <h2>Personal troubleshooting</h2>
      <p>
        We’re unable to provide one-to-one technical, electrical or medical support. For anything safety-critical,
        please contact a qualified professional or the manufacturer of your product.
      </p>
    </StaticPage>
  );
}
