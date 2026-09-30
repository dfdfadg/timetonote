"use client";

import { useId, useState } from "react";
import { NumberField, ResultBox, Stat, parseNumber, usd } from "./fields";

const ADD_ONS = [
  { id: "radon", label: "Radon test", range: [100, 200] },
  { id: "termite", label: "Termite (WDO) inspection", range: [75, 150] },
  { id: "sewer", label: "Sewer scope", range: [150, 300] },
  { id: "mold", label: "Mold testing", range: [300, 700] },
] as const;

function base(sqft: number): [number, number] {
  if (sqft < 1000) return [250, 350];
  if (sqft < 1500) return [300, 400];
  if (sqft < 2500) return [325, 450];
  if (sqft < 3500) return [400, 550];
  const extra = Math.ceil((sqft - 3500) / 1000);
  return [400 + extra * 50, 550 + extra * 100];
}

export default function HomeInspectionCostCalculator() {
  const id = useId();
  const [sqft, setSqft] = useState("2000");
  const [picked, setPicked] = useState<string[]>([]);
  const s = parseNumber(sqft);

  let lo = 0;
  let hi = 0;
  if (s !== null && s > 0) {
    [lo, hi] = base(s);
    for (const a of ADD_ONS) if (picked.includes(a.id)) {
      lo += a.range[0];
      hi += a.range[1];
    }
  }

  return (
    <div>
      <NumberField id={`${id}-s`} label="Home size (square feet)" value={sqft} onChange={setSqft} />
      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-ink">Extra tests (optional)</legend>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {ADD_ONS.map((a) => (
            <label key={a.id} className="flex items-center gap-3 text-sm text-ink-soft">
              <input
                type="checkbox"
                checked={picked.includes(a.id)}
                onChange={(e) => setPicked((p) => (e.target.checked ? [...p, a.id] : p.filter((x) => x !== a.id)))}
                className="h-5 w-5 accent-[var(--brand)]"
              />
              {a.label} ({usd(a.range[0], 0)} to {usd(a.range[1], 0)})
            </label>
          ))}
        </div>
      </fieldset>
      <ResultBox empty="Enter the home size.">
        {s !== null && s > 0 ? (
          <>
            <Stat label="Estimated total" value={`${usd(lo, 0)} to ${usd(hi, 0)}`} big />
            <p className="mt-3 text-sm text-muted">
              Based on typical 2026 U.S. prices. The average standard home inspection is about $300 to $450. Older homes, crawl spaces, and big cities
              often cost more. Ask inspectors for a quote before you book.
            </p>
          </>
        ) : undefined}
      </ResultBox>
    </div>
  );
}
