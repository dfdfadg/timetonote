"use client";

import { useId, useState } from "react";
import { NumberField, ResultBox, Stat, num, parseNumber } from "./fields";

export default function WaterIntakeCalculator() {
  const id = useId();
  const [weight, setWeight] = useState("160");
  const [exercise, setExercise] = useState("30");
  const [hot, setHot] = useState(false);

  const w = parseNumber(weight);
  const e = parseNumber(exercise) ?? 0;
  const ounces = w !== null && w > 0 ? w * 0.5 + (e / 30) * 12 + (hot ? 16 : 0) : null;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField id={`${id}-w`} label="Your weight (pounds)" value={weight} onChange={setWeight} />
        <NumberField id={`${id}-e`} label="Exercise per day (minutes)" value={exercise} onChange={setExercise} />
      </div>
      <label className="mt-5 flex items-center gap-3 text-sm font-medium text-ink-soft">
        <input type="checkbox" checked={hot} onChange={(ev) => setHot(ev.target.checked)} className="h-5 w-5 accent-[var(--brand)]" />
        I live in a hot or humid place, or sweat a lot
      </label>
      <ResultBox empty="Enter your weight.">
        {ounces !== null ? (
          <>
            <div className="grid grid-cols-3 gap-4">
              <Stat label="Ounces per day" value={num(ounces, 0)} big />
              <Stat label="Cups (8 oz)" value={num(ounces / 8, 1)} />
              <Stat label="Liters" value={num(ounces * 0.0295735, 1)} />
            </div>
            <p className="mt-3 text-sm text-muted">
              Rule of thumb used: half your body weight in ounces, plus 12 oz for every 30 minutes of exercise
              {hot ? ", plus 16 oz for heat" : ""}. This is a general estimate, not medical advice. If you have heart or kidney problems or are
              pregnant, ask your doctor how much to drink.
            </p>
          </>
        ) : undefined}
      </ResultBox>
    </div>
  );
}
