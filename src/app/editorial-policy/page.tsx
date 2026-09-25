import type { Metadata } from "next";
import Link from "next/link";
import { staticPagesUpdatedAt } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = pageMetadata({
  title: "Editorial Policy",
  description:
    "How TimeToNote researches, writes, fact-checks, updates and corrects its guides, and what we will never publish.",
  path: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <StaticPage
      title="Editorial policy"
      path="/editorial-policy"
      intro="Our goal is simple: every guide should help a real person understand a problem and fix it safely."
      updatedAt={staticPagesUpdatedAt}
    >
      <h2>Choosing topics</h2>
      <p>
        We cover problems people genuinely search for help with. Before writing, we check whether we can add
        something useful: a clearer explanation, a better order of steps, or safety information that other pages
        miss. If we can’t, we don’t publish.
      </p>

      <h2>Research and sources</h2>
      <ul>
        <li>We prioritize manufacturer documentation, official support pages, government and public-health guidance, and recognized standards bodies.</li>
        <li>Where methods are based on practical experience rather than official guidance, we say so.</li>
        <li>We avoid claims we can’t support, and we don’t invent statistics, tests or reviews.</li>
      </ul>

      <h2>How guides are structured</h2>
      <p>
        Guides start with the most likely causes, then give fixes in a practical order: quick checks first, bigger
        jobs later. We add FAQs only when there are genuinely common follow-up questions, and we link to related
        guides only when they help you solve the problem.
      </p>

      <h2>Safety</h2>
      <p>
        Some problems involve electricity, gas, water damage, mold, batteries or health. In those guides we
        highlight the risks, keep to steps that are safe for a non-specialist, and tell you clearly when to stop and
        call a qualified professional. See our <Link href="/disclaimer">disclaimer</Link>.
      </p>

      <h2>Use of AI tools</h2>
      <p>
        We may use software tools, including AI writing assistants, to help with research, outlining and editing.
        Every guide is reviewed, fact-checked and edited by the editorial team before it is published, and the
        editorial team is responsible for everything we publish.
      </p>

      <h2>Updates and corrections</h2>
      <p>
        We review guides when products, software or guidance change. When we make a meaningful change we update the
        “Updated” date shown on the article. If you find an error, please <Link href="/contact">contact us</Link>.
        substantive corrections are made promptly.
      </p>

      <h2>Independence</h2>
      <p>
        We do not accept payment for coverage, guest posts or links. If we ever include affiliate links or
        advertising, they will be clearly disclosed and will not influence our recommendations.
      </p>
    </StaticPage>
  );
}
