import type { FaqItem } from "@/lib/articles";

/** FAQ rendered as native disclosure widgets (accessible, zero JavaScript). */
export function FaqSection({ faq, title = "Frequently asked questions" }: { faq: FaqItem[]; title?: string }) {
  if (!faq.length) return null;
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="font-serif text-2xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <div className="mt-5 divide-y divide-line rounded-2xl border border-line bg-surface">
        {faq.map((item) => (
          <details key={item.question} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
              <h3 className="text-base leading-snug">{item.question}</h3>
              <span aria-hidden="true" className="mt-0.5 text-xl leading-none text-muted transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 leading-relaxed text-ink-soft">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
