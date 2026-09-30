"use client";

import { useId, useState } from "react";
import { Choice, NumberField, ResultBox, Stat, parseNumber, usd } from "./fields";

type Height = "small" | "medium" | "large";
const RANGES: Record<Height, [number, number]> = { small: [80, 450], medium: [150, 900], large: [200, 1850] };

export default function TreeTrimmingCostCalculator() {
  const id = useId();
  const [height, setHeight] = useState<Height>("medium");
  const [count, setCount] = useState("1");
  const [hard, setHard] = useState(false);
  const [urgent, setUrgent] = useState(false);

  const c = parseNumber(count);
  const factor = (hard ? 1.25 : 1) * (urgent ? 1.5 : 1);
  const [lo, hi] = RANGES[height];
  const ready = c !== null && c >= 1;

  return (
    <div>
      <Choice
        name={`${id}-h`}
        legend="Tree height"
        options={[
          { id: "small", label: "Small (under 30 ft)" },
          { id: "medium", label: "Medium (30 to 60 ft)" },
          { id: "large", label: "Large (over 60 ft)" },
        ]}
        value={height}
        onChange={setHeight}
      />
      <div className="mt-5">
        <NumberField id={`${id}-c`} label="Number of trees" value={count} onChange={setCount} />
      </div>
      <div className="mt-5 space-y-3 text-sm font-medium text-ink-soft">
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={hard} onChange={(e) => setHard(e.target.checked)} className="h-5 w-5 accent-[var(--brand)]" />
          Hard to reach (close to the house, fences, or in a backyard with no truck access)
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} className="h-5 w-5 accent-[var(--brand)]" />
          Emergency or storm damage
        </label>
      </div>
      <ResultBox empty="Enter the number of trees.">
        {ready ? (
          <>
            <Stat label="Estimated cost" value={`${usd(lo * c * factor, 0)} to ${usd(hi * c * factor, 0)}`} big />
            <p className="mt-3 text-sm text-muted">
              Based on typical 2026 U.S. prices of about {usd(lo, 0)} to {usd(hi, 0)} per {height} tree. The national average is around $475 per tree.
              Prices vary by city, tree type, and company, so get at least three quotes. Branches near power lines should be trimmed by your utility or
              a licensed pro.
            </p>
          </>
        ) : undefined}
      </ResultBox>
    </div>
  );
}
