import Image from "next/image";
import type { Author } from "@/data/authors";
import { LogoMark } from "@/components/layout/Logo";

export function AuthorAvatar({ author, size = 40 }: { author: Author; size?: number }) {
  if (author.image) {
    return (
      <Image
        src={author.image}
        alt={`Photo of ${author.name}`}
        width={size}
        height={size}
        className="shrink-0 rounded-full border border-line object-cover"
      />
    );
  }
  if (author.type === "Organization") {
    return <LogoMark size={size} />;
  }
  const initials = author.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand"
    >
      {initials}
    </span>
  );
}
