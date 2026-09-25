import Script from "next/script";
import { isProductionDeployment } from "@/config/site";

/** Google Analytics 4 measurement ID (public by design). Override with NEXT_PUBLIC_GA_MEASUREMENT_ID. */
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-LX2RYLDHBL";

/**
 * Google Analytics 4. Loaded lazily so it never competes with page content,
 * and only on the production deployment so previews and local builds do not
 * pollute the data.
 */
export function Analytics() {
  if (!isProductionDeployment || !/^G-[A-Z0-9]+$/.test(GA_ID)) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
      <Script id="ga4" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
