import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";

export function SectionHeading({
  id,
  title,
  description,
  href,
  linkLabel,
}: {
  id: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 id={id} className="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-[1.7rem]">
          {title}
        </h2>
        {description && <p className="mt-1.5 max-w-2xl text-muted">{description}</p>}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-strong"
        >
          {linkLabel}
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
