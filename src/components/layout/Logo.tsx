import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

/** The "TN" monogram from the TimeToNote logo, in the site's teal (light version in dark mode). */
export function LogoMark({ className = "", size = 36 }: { className?: string; size?: number }) {
  return (
    <span className={`relative inline-block shrink-0 ${className}`} style={{ width: size, height: size }}>
      <Image src="/brand/logo-mark.png" alt="" width={size} height={size} className="logo-light h-full w-full" priority />
      <Image src="/brand/logo-mark-dark.png" alt="" width={size} height={size} className="logo-dark h-full w-full" />
    </span>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 rounded-md" aria-label={`${siteConfig.name} home`}>
      <LogoMark size={36} />
      <span className="font-serif text-xl font-semibold tracking-tight text-ink">
        Time<span className="text-brand">To</span>Note
      </span>
    </Link>
  );
}
