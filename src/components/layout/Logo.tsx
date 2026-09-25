import Link from "next/link";
import { siteConfig } from "@/config/site";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="8" fill="var(--brand)" />
      <path d="M9 10.5h14M16 10.5V23" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="22.5" cy="21.5" r="2.2" fill="#fff" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 rounded-md" aria-label={`${siteConfig.name} home`}>
      <LogoMark className="h-8 w-8 shrink-0" />
      <span className="font-serif text-xl font-semibold tracking-tight text-ink">
        Time<span className="text-brand">To</span>Note
      </span>
    </Link>
  );
}
