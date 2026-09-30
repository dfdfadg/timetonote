"use client";

import { useId, useState } from "react";
import { Choice, NumberField, ResultBox, Stat, num, parseNumber, usd } from "./fields";

type Wood = "pine" | "cedar" | "redwood";
type Height = "4" | "6" | "8";
const PER_FOOT: Record<Wood, [number, number]> = { pine: [20, 35], cedar: [33, 53], redwood: [40, 65] };
const HEIGHT_FACTOR: Record<Height, number> = { "4": 0.75, "6": 1, "8": 1.35 };

export default function FenceCostCalculator() {
  const id = useId();
  const [length, setLength] = useState("150");
  const [wood, setWood] = useState<Wood>("pine");
  const [height, setHeight] = useState<Height>("6");
  const [gates, setGates] = useState("1");
  const [removal, setRemoval] = useState(false);

  const l = parseNumber(length);
  const g = parseNumber(gates) ?? 0;
  const ready = l !== null && l > 0;
  const f = HEIGHT_FACTOR[height];
  const [plo, phi] = PER_FOOT[wood];
  const lo = ready ? l * plo * f + g * 250 + (removal ? l * 3 : 0) : 0;
  const hi = ready ? l * phi * f + g * 600 + (removal ? l * 5 : 0) : 0;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField id={`${id}-l`} label="Fence length (feet)" value={length} onChange={setLength} hint="Measure the full line you want fenced." />
        <NumberField id={`${id}-g`} label="Number of gates" value={gates} onChange={setGates} />
      </div>
      <div className="mt-5">
        <Choice
          name={`${id}-w`}
          legend="Wood type"
          options={[
            { id: "pine", label: "Pressure-treated pine" },
            { id: "cedar", label: "Cedar" },
            { id: "redwood", label: "Redwood" },
          ]}
          value={wood}
          onChange={setWood}
        />
      </div>
      <div className="mt-5">
        <Choice
          name={`${id}-h`}
          legend="Height"
          options={[
            { id: "4", label: "4 ft" },
            { id: "6", label: "6 ft privacy" },
            { id: "8", label: "8 ft" },
          ]}
          value={height}
          onChange={setHeight}
        />
      </div>
      <label className="mt-5 flex items-center gap-3 text-sm font-medium text-ink-soft">
        <input type="checkbox" checked={removal} onChange={(e) => setRemoval(e.target.checked)} className="h-5 w-5 accent-[var(--brand)]" />
        Remove an old fence first
      </label>
      <ResultBox empty="Enter the fence length.">
        {ready ? (
          <>
            <Stat label="Estimated installed cost" value={`${usd(lo, 0)} to ${usd(hi, 0)}`} big />
            <p className="mt-3 text-sm text-muted">
              About {usd(plo * f, 0)} to {usd(phi * f, 0)} per foot for a {height} ft {wood} fence, plus about $250 to $600 per gate
              {removal ? " and $3 to $5 per foot to remove the old fence" : ""}. Based on typical 2026 U.S. installed prices for {num(l ?? 0, 0)} feet.
              Local labor, slopes, and permits can change the price, so get a few quotes.
            </p>
          </>
        ) : undefined}
      </ResultBox>
    </div>
  );
}
