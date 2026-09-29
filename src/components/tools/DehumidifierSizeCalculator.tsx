"use client";

import { useId, useState } from "react";
import { Choice, NumberField, ResultBox, parseNumber } from "./fields";

type Condition = "damp" | "veryDamp" | "wet";

const CONDITIONS: { id: Condition; label: string }[] = [
  { id: "damp", label: "Damp (musty smell in humid weather)" },
  { id: "veryDamp", label: "Very damp (always musty, damp spots)" },
  { id: "wet", label: "Wet (sweating walls, standing water)" },
];

const SIZES = [22, 35, 50];

function recommend(area: number, condition: Condition, basement: boolean) {
  let step = area <= 500 ? 0 : area <= 1000 ? 1 : 2;
  if (condition === "veryDamp") step += 1;
  if (condition === "wet") step += 2;
  if (basement) step += 1;
  if (area > 2500 || step > 3) return { pints: null, whole: true };
  if (step === 3) return { pints: 50, whole: false, note: "Choose a 50-pint unit with a pump or drain hose, or think about a whole-house model." };
  return { pints: SIZES[step], whole: false };
}

export default function DehumidifierSizeCalculator() {
  const id = useId();
  const [area, setArea] = useState("800");
  const [condition, setCondition] = useState<Condition>("damp");
  const [basement, setBasement] = useState(false);
  const a = parseNumber(area);
  const result = a !== null && a > 0 ? recommend(a, condition, basement) : null;

  return (
    <div>
      <NumberField id={`${id}-a`} label="Area to dry (square feet)" value={area} onChange={setArea} hint="Length × width of the room or open space." />
      <div className="mt-5">
        <Choice name={`${id}-c`} legend="How damp is it?" options={CONDITIONS} value={condition} onChange={setCondition} />
      </div>
      <label className="mt-5 flex items-center gap-3 text-sm font-medium text-ink-soft">
        <input type="checkbox" checked={basement} onChange={(e) => setBasement(e.target.checked)} className="h-5 w-5 accent-[var(--brand)]" />
        It is a basement, laundry room, or crawl space
      </label>
      <ResultBox empty="Enter the square footage to see a size.">
        {result ? (
          result.whole ? (
            <>
              <p className="text-sm font-medium text-muted">Recommended</p>
              <p className="mt-1 text-3xl font-semibold text-ink">Whole-house or 2 units</p>
              <p className="mt-3 text-sm text-muted">
                For this much space or moisture, a whole-house dehumidifier (often 70 pints or more, installed by an HVAC pro) or two 50-pint units
                usually works best.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-muted">Recommended size</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-ink">{result.pints}-pint dehumidifier</p>
              <p className="mt-3 text-sm text-muted">
                {result.note ?? "Sizes use the pint ratings on new models, tested under the 2019 U.S. standard."} Aim for indoor humidity between 30 and
                50 percent. When in doubt, pick the next size up. A bigger unit runs less and lasts longer.
              </p>
            </>
          )
        ) : undefined}
      </ResultBox>
    </div>
  );
}
