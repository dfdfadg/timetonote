export interface NavItem {
  label: string;
  href: string;
}

/** Primary navigation (header). */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Home Problems", href: "/home-problems" },
  { label: "Tech Problems", href: "/tech-problems" },
  { label: "Internet & Apps", href: "/internet-apps" },
  { label: "Everyday Solutions", href: "/everyday-solutions" },
  { label: "Tools", href: "/tools" },
];
