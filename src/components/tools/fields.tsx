import type { ReactNode } from "react";

/** Shared form bits for the calculator tools. */

export const inputClass =
  "mt-1.5 w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-lg tabular-nums text-ink focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand-soft";

export function parseNumber(value: string): number | null {
  if (value.trim() === "") return null;
  const n = Number(value.replace(/[,$]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export const usd = (n: number, digits = 2) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n);

export const num = (n: number, digits = 1) => new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(n);

export function NumberField({
  id,
  label,
  value,
  onChange,
  hint,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink-soft">
        {label}
      </label>
      <input id={id} inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} placeholder={placeholder} />
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function Choice<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.id}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--focus)] ${
              value === o.id ? "border-brand bg-brand-soft text-brand" : "border-line text-ink-soft hover:border-line-strong"
            }`}
          >
            <input type="radio" name={name} value={o.id} checked={value === o.id} onChange={() => onChange(o.id)} className="sr-only" />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ResultBox({ children, empty }: { children?: ReactNode; empty: string }) {
  return (
    <div className="mt-6 rounded-2xl border border-line bg-bg p-5" aria-live="polite">
      {children ?? <p className="text-muted">{empty}</p>}
    </div>
  );
}

export function Stat({ label, value, big = false }: { label: string; value: string; big?: boolean }) {
  return (
    <div>
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className={`mt-1 font-semibold tabular-nums text-ink ${big ? "text-3xl" : "text-xl"}`}>{value}</p>
    </div>
  );
}
