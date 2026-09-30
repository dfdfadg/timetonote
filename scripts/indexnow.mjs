/**
 * Submit every sitemap URL to IndexNow (Bing, Yandex, Seznam, Naver) after a
 * production build on Vercel. Bing's index also powers ChatGPT search and
 * Copilot. Never fails the build: any error is logged and ignored.
 */
import fs from "node:fs";

const KEY = "80e67b043fb9b6c0f8a9e408634e1dab";
const HOST = "timetonote.com";

if (process.env.VERCEL_ENV !== "production") process.exit(0);

try {
  const xml = fs.readFileSync(".next/server/app/sitemap.xml.body", "utf8");
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
    signal: AbortSignal.timeout(15_000),
  });
  console.log(`IndexNow: submitted ${urlList.length} URLs, status ${res.status}`);
} catch (err) {
  console.warn("IndexNow: skipped,", err instanceof Error ? err.message : err);
}
