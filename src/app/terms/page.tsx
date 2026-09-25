import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { staticPagesUpdatedAt } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms that apply when you use TimeToNote, its guides and its free tools.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <StaticPage title="Terms of use" path="/terms" updatedAt={staticPagesUpdatedAt}>
      <p>By using {siteConfig.name} you agree to these terms. If you don’t agree, please don’t use the site.</p>

      <h2>Use of content</h2>
      <p>
        Guides, images and tools on this site are owned by {siteConfig.name} unless stated otherwise. You may read,
        share links to and print pages for personal, non-commercial use. Please don’t republish our content in full
        without written permission; short quotations with a link back to the original page are welcome.
      </p>

      <h2>Information only</h2>
      <p>
        Content is provided for general information and is not professional advice. Read our{" "}
        <Link href="/disclaimer">disclaimer</Link> before acting on any guide.
      </p>

      <h2>Tools</h2>
      <p>
        Our tools are provided free and “as is”. We try to make them accurate, but you are responsible for checking
        results before relying on them for important decisions.
      </p>

      <h2>External links</h2>
      <p>
        We link to other websites when they are useful. We don’t control those sites and aren’t responsible for
        their content or policies.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, {siteConfig.name} is not liable for any loss or damage arising from use of
        the site or reliance on its content.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. The date at the top of this page shows when they last changed.
        Questions? <Link href="/contact">Contact us</Link>.
      </p>
    </StaticPage>
  );
}
