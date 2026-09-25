import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { staticPagesUpdatedAt } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "What information TimeToNote collects, how it is used, and the choices you have.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <StaticPage title="Privacy policy" path="/privacy-policy" updatedAt={staticPagesUpdatedAt}>
      <p>
        This policy explains what information {siteConfig.name} ({siteConfig.url.replace("https://", "")}) collects
        when you use the site and how it is used. We aim to collect as little as possible.
      </p>

      <h2>Information we collect</h2>
      <h3>Server and hosting logs</h3>
      <p>
        Like most websites, our hosting provider automatically processes technical information such as your IP
        address, browser type, the pages requested and the time of the request. This is used to deliver the site,
        keep it secure and diagnose problems.
      </p>
      <h3>Analytics</h3>
      <p>
        We use Google Analytics to understand which pages are useful (for example, page views, the device type,
        and approximate location at the country or city level). Google Analytics uses cookies and similar
        technology. We do not use analytics data to identify individual visitors. You can learn how Google uses
        this data at{" "}
        <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">
          policies.google.com/technologies/partner-sites
        </a>
        , and you can opt out with the{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener">
          Google Analytics opt-out browser add-on
        </a>
        .
      </p>
      <h3>Email</h3>
      <p>
        If you email us, we receive your email address and the contents of your message. We use these only to
        reply and to improve the site, and we don’t add you to any mailing list.
      </p>
      <h3>Tools</h3>
      <p>
        Our browser tools (such as the word counter and keyword cannibalization checker) process the text or files
        you enter on your own device. That content is not uploaded to or stored by {siteConfig.name}.
      </p>

      <h2>Cookies</h2>
      <p>
        The site itself does not require cookies to work. Google Analytics sets cookies or similar identifiers to
        measure visits. You can block or delete cookies in your browser settings.
      </p>

      <h2>Sharing</h2>
      <p>
        We don’t sell your personal information. We share data only with service providers that help us run the
        site (such as hosting and, if enabled, analytics), or when required by law.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct or delete personal information we
        hold about you. To make a request, email{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>

      <h2>Changes</h2>
      <p>If we change this policy, we will update the date at the top of this page.</p>
    </StaticPage>
  );
}
