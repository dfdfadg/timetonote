"use client";

import { useId, useState } from "react";

type Mode = "percentOf" | "whatPercent" | "change";

const MODES: { id: Mode; label: string }[] = [
  { id: "percentOf", label: "X% of Y" },
  { id: "whatPercent", label: "X is what % of Y" },
  { id: "change", label: "% change from X to Y" },
];

const fmt = (n: number) =>
  Number.isFinite(n) ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(n) : "—";

function parse(value: string): number | null {
  if (value.trim() === "") return null;
  const n = Number(value.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

function compute(mode: Mode, a: number | null, b: number | null): { answer: string; formula: string } | { error: string } | null {
  if (a === null || b === null) return null;
  switch (mode) {
    case "percentOf":
      return { answer: fmt((a / 100) * b), formula: `${fmt(a)} ÷ 100 × ${fmt(b)} = ${fmt((a / 100) * b)}` };
    case "whatPercent":
      if (b === 0) return { error: "Y can’t be zero — a percentage of zero is undefined." };
      return { answer: `${fmt((a / b) * 100)}%`, formula: `${fmt(a)} ÷ ${fmt(b)} × 100 = ${fmt((a / b) * 100)}%` };
    case "change": {
      if (a === 0) return { error: "The starting value (X) can’t be zero — percentage change from zero is undefined." };
      const pct = ((b - a) / Math.abs(a)) * 100;
      const dir = pct > 0 ? "increase" : pct < 0 ? "decrease" : "no change";
      return {
        answer: `${fmt(Math.abs(pct))}% ${dir}`,
        formula: `(${fmt(b)} − ${fmt(a)}) ÷ ${fmt(Math.abs(a))} × 100 = ${fmt(pct)}%`,
      };
    }
  }
}

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("percentOf");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const id = useId();
  const result = compute(mode, parse(x), parse(y));

  const labels: Record<Mode, [string, string]> = {
    percentOf: ["Percentage (X)", "Number (Y)"],
    whatPercent: ["Part (X)", "Whole (Y)"],
    change: ["Original value (X)", "New value (Y)"],
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-lg tabular-nums text-ink focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand-soft";

  return (
    <div>
      <fieldset>
        <legend className="text-sm font-semibold text-ink">Calculation</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {MODES.map((m) => (
            <label
              key={m.id}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--focus)] ${
                mode === m.id ? "border-brand bg-brand-soft text-brand" : "border-line text-ink-soft hover:border-line-strong"
              }`}
            >
              <input
                type="radio"
                name={`${id}-mode`}
                value={m.id}
                checked={mode === m.id}
                onChange={() => setMode(m.id)}
                className="sr-only"
              />
              {m.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-x`} className="text-sm font-medium text-ink-soft">
            {labels[mode][0]}
          </label>
          <input id={`${id}-x`} inputMode="decimal" value={x} onChange={(e) => setX(e.target.value)} className={inputClass} placeholder="e.g. 20" />
        </div>
        <div>
          <label htmlFor={`${id}-y`} className="text-sm font-medium text-ink-soft">
            {labels[mode][1]}
          </label>
          <input id={`${id}-y`} inputMode="decimal" value={y} onChange={(e) => setY(e.target.value)} className={inputClass} placeholder="e.g. 150" />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-bg p-5" aria-live="polite">
        {!result && <p className="text-muted">Enter both numbers to see the answer.</p>}
        {result && "error" in result && <p className="font-medium text-[var(--accent-rose)]">{result.error}</p>}
        {result && "answer" in result && (
          <>
            <p className="text-sm font-medium text-muted">Answer</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums text-ink">{result.answer}</p>
            <p className="mt-3 text-sm text-muted">
              Formula: <span className="font-mono text-ink-soft">{result.formula}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
