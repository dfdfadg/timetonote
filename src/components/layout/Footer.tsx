import Link from "next/link";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/categories";
import { staticPages } from "@/data/pages";
import { tools, toolPath } from "@/data/tools";
import { Logo } from "@/components/layout/Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {siteConfig.tagline}. Clear explanations and step-by-step fixes for problems at home, with your
            devices and online.
          </p>
        </div>
        <nav aria-label="Categories">
          <h2 className="text-sm font-semibold text-ink">Topics</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={c.path} className="text-muted hover:text-ink">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Tools">
          <h2 className="text-sm font-semibold text-ink">Free tools</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {tools.map((t) => (
              <li key={t.slug}>
                <Link href={toolPath(t.slug)} className="text-muted hover:text-ink">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="About TimeToNote">
          <h2 className="text-sm font-semibold text-ink">TimeToNote</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {staticPages.map((p) => (
              <li key={p.path}>
                <Link href={p.path} className="text-muted hover:text-ink">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted sm:px-6">
          © {year} {siteConfig.name}. Guides are for general information — always follow your manufacturer’s
          instructions and get professional help for safety-critical problems.
        </p>
      </div>
    </footer>
  );
}
