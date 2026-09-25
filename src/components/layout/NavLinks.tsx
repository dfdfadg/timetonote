"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { NavItem } from "@/data/navigation";
import { CloseIcon, MenuIcon, SearchIcon } from "@/components/ui/Icons";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <ul className="hidden items-center gap-1 lg:flex">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-[0.9rem] font-medium transition-colors ${
                active ? "bg-brand-soft text-brand" : "text-ink-soft hover:bg-surface-muted hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Mobile menu based on <details>, so it still opens without JavaScript. */
export function MobileNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && el.open) {
        el.open = false;
        el.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <details ref={ref} className="nav-details group lg:hidden">
      <summary
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line text-ink hover:bg-surface-muted"
        aria-label="Menu"
      >
        <MenuIcon className="group-open:hidden" />
        <CloseIcon className="hidden group-open:block" />
      </summary>
      <div className="absolute inset-x-0 top-full border-b border-line bg-surface shadow-lg">
        <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          {items.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 text-base font-medium ${
                    active ? "bg-brand-soft text-brand" : "text-ink hover:bg-surface-muted"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/search"
              className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-surface-muted"
            >
              <SearchIcon /> Search
            </Link>
          </li>
        </ul>
      </div>
    </details>
  );
}
