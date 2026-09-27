"use client";

import { useState, type ReactNode } from "react";

/**
 * Grid that shows `step` items at first and reveals more with a "Load more"
 * button. Every item stays in the server-rendered HTML (hidden ones use the
 * `hidden` attribute), so crawlers still see and follow every link.
 */
export function LoadMoreGrid({ items, step, label = "Load more" }: { items: ReactNode[]; step: number; label?: string }) {
  const [visible, setVisible] = useState(step);
  const remaining = items.length - visible;

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <div key={i} hidden={i >= visible} className="min-w-0">
            {item}
          </div>
        ))}
      </div>
      {remaining > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + step)}
            className="rounded-full border border-line-strong bg-surface px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            {label} ({remaining})
          </button>
        </div>
      )}
    </>
  );
}
