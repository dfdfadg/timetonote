import { NextResponse } from "next/server";

/**
 * Old posts from the previous site that have no match on the new site.
 * They answer 410 Gone instead of 404, so search engines drop them faster.
 * The proxy only runs on these exact paths (see `matcher`), so it adds no
 * cost to normal page views. List built from Search Console data (2026-09-25).
 */
const GONE_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page removed | TimeToNote</title></head><body style="font-family:system-ui,sans-serif;max-width:560px;margin:15vh auto;padding:0 16px;line-height:1.6;color:#1f2937"><h1>This page has been removed</h1><p>This old article is no longer available. Browse our latest practical guides and free tools instead.</p><p><a href="/">Go to the homepage</a> or <a href="/tools">see free tools</a>.</p></body></html>`;

export function proxy() {
  return new NextResponse(GONE_HTML, {
    status: 410,
    headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" },
  });
}

export const config = {
  matcher: [
    "/10-highest-paying-jobs-in-the-us",
    "/20-highest-paying-jobs-in-india",
    "/30-rhyming-words-list",
    "/5-powerful-real-estate-crm-features",
    "/a-comprehensive-guide-to-ps4-error-codes",
    "/apply-for-a-birth-certificate-in-the-usa-online",
    "/basement-renovation-vs-finishing",
    "/bathroom-remodeling-ideas-to-increase-home-value",
    "/best-bra-for-saggy-breasts-after-weight-loss",
    "/best-ps4-controller-charging-cable-buying-guide",
    "/best-xbox-cloud-games-for-phone",
    "/choosing-the-wrong-employee-for-your-business",
    "/common-gaming-hardware-issues",
    "/corporate-giveaways-in-pakistan-with-custom",
    "/crafting-a-green-presence-seo-strategies-for-landscapers",
    "/does-an-ultrasound-cost-for-a-pregnant-dog",
    "/downloading-google-play-store-on-iphone",
    "/dressing-with-confidence-flattering-your-body",
    "/explore-the-cheapest-property-in-dubai",
    "/financial-plan-for-your-short-long-term-goals",
    "/home-and-office-cleaning-companies-in-usa",
    "/how-do-you-download-apps-on-android-without-google-play-store",
    "/how-do-you-master-map-fiskerhus-on-pubg-mobile",
    "/how-to-download-or-run-an-apk-file-on-ios",
    "/how-to-download-the-fifa-mobile-23-limited-beta-test-on-android",
    "/how-to-fix-amazon-prime-video-error-codes",
    "/how-to-fix-ps5-update-errors-step-by-step-guide",
    "/how-to-get-in-a-car-in-pubg-mobile",
    "/how-to-get-rg-gaming-redeeming-codes",
    "/how-to-hide-the-emperors-child",
    "/how-to-install-set-tv-on-firestick",
    "/how-to-organize-ideas-effectively-using-timetonote",
    "/how-to-play-deadpool-pc-game-on-mobile",
    "/how-to-style-oversized-clothing",
    "/how-to-use-an-apk-installer",
    "/how-to-watch-iowa-womens-basketball",
    "/ideas-for-gifting-indian-art-purchased-online",
    "/improve-your-basketball-shooting-technique",
    "/introducing-pubg-mobile-c2s5-new-redemption-shop",
    "/job-interview-tips-to-help-you-succeed",
    "/kitchen-renovation-costs-in-2025-26",
    "/mastering-note-organization-in-less-time",
    "/mastering-the-art-of-tilework-a-guide-to-hiring-our-skilled-tilework-contractors",
    "/measure-your-bra-size-without-a-measuring-tape",
    "/process-of-buying-and-selling-stocks",
    "/real-estate-companies-in-the-usa",
    "/reasons-why-pubg-is-better-than-free-fire",
    "/release-date-of-iphone-16",
    "/select-the-right-property-for-investment",
    "/solo-travel-guide-tips-for-exploring-the-world",
    "/start-a-garden-from-scratch-for-beginners",
    "/the-hispanic-community-in-america",
    "/the-power-of-multiplication",
    "/the-secret-to-staying-productive-with-notes",
    "/top-10-hollywood-movies",
    "/top-10-security-companies-in-usa",
    "/top-10-video-games-of-all-time",
    "/top-10-windows-error-codes-how-to-fix",
    "/top-home-remodeling-mistakes-to-avoid",
    "/using-the-try-hard-guides-wordle-solver-tool",
    "/what-are-the-trending-kitchen-colors-in-2023",
    "/what-lies-ahead-for-broken-planet-market-in-sustainable-fashion",
    "/whatsapp-channels-vs-telegram-channels",
    "/why-airport-ads-are-key-to-international-brand-success",
    "/why-coffee-boxes-matter-to-the-success-of-any-brand",
    "/why-hiring-professional-interior-painters",
  ],
};
