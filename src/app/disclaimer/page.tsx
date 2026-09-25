import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { staticPagesUpdatedAt } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer",
  description: "Important information about using TimeToNote guides safely and the limits of general advice.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <StaticPage title="Disclaimer" path="/disclaimer" updatedAt={staticPagesUpdatedAt}>
      <p>
        The guides on {siteConfig.name} are written to help you understand and fix common problems. They are general
        information, not professional advice for your specific situation.
      </p>

      <h2>Safety first</h2>
      <ul>
        <li>Always follow the manufacturer’s instructions and warnings for your product.</li>
        <li>Switch off and unplug appliances before inspecting or cleaning them.</li>
        <li>
          Do not attempt electrical, gas, structural or roofing work unless you are qualified. Call a licensed
          professional.
        </li>
        <li>If you smell gas, see smoke, or suspect a serious hazard, leave the area and contact emergency services.</li>
        <li>For health concerns — including reactions to dust, mould or chemicals — speak to a medical professional.</li>
      </ul>

      <h2>Accuracy</h2>
      <p>
        We work hard to keep guides accurate and up to date (see our <Link href="/editorial-policy">editorial
        policy</Link>), but products, software and guidance change. We can’t guarantee that every guide is complete
        or current for your device, model or location.
      </p>

      <h2>Warranty</h2>
      <p>
        Opening a device or attempting a repair yourself may void its warranty. Check your warranty terms or contact
        the manufacturer before making changes.
      </p>

      <h2>Links and products</h2>
      <p>
        Mentions of products, brands or services are for illustration and are not endorsements unless clearly
        stated. {siteConfig.name} does not accept payment for coverage.
      </p>
    </StaticPage>
  );
}
