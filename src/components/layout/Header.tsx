import Link from "next/link";
import { mainNav } from "@/data/navigation";
import { Logo } from "@/components/layout/Logo";
import { DesktopNav, MobileNav } from "@/components/layout/NavLinks";
import { SearchIcon } from "@/components/ui/Icons";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/80">
      <nav aria-label="Main" className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <div className="flex items-center gap-2">
          <DesktopNav items={mainNav} />
          <Link
            href="/search"
            className="flex h-10 items-center gap-2 rounded-full border border-line px-3 text-sm font-medium text-ink-soft hover:border-line-strong hover:text-ink"
          >
            <SearchIcon className="h-[18px] w-[18px]" />
            <span className="hidden sm:inline">Search</span>
            <span className="sr-only sm:hidden">Search</span>
          </Link>
          <MobileNav items={mainNav} />
        </div>
      </nav>
    </header>
  );
}
