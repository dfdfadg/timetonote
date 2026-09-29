"use client";

import { useId, useState } from "react";
import { NumberField, ResultBox, Stat, num, parseNumber, usd } from "./fields";

const WINTER_DAYS = 151; // November through March

export default function SpaceHeaterCostCalculator() {
  const id = useId();
  const [watts, setWatts] = useState("1500");
  const [hours, setHours] = useState("8");
  const [rate, setRate] = useState("17");

  const w = parseNumber(watts);
  const h = parseNumber(hours);
  const r = parseNumber(rate);
  const ready = w !== null && h !== null && r !== null && w > 0 && h <= 24;

  const kwhPerHour = ready ? w / 1000 : 0;
  const perHour = ready ? kwhPerHour * (r / 100) : 0;
  const perDay = perHour * (h ?? 0);

  return (
    <div>
      <div className="flex flex-wrap gap-2" aria-label="Common heater sizes">
        {["750", "1000", "1500"].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setWatts(preset)}
            className={`rounded-full border px-4 py-2 text-sm font-medium ${
              watts === preset ? "border-brand bg-brand-soft text-brand" : "border-line text-ink-soft hover:border-line-strong"
            }`}
          >
            {preset} W
          </button>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <NumberField id={`${id}-w`} label="Heater wattage (W)" value={watts} onChange={setWatts} hint="Check the label. Most are 1,500 W on high." />
        <NumberField id={`${id}-h`} label="Hours per day" value={hours} onChange={setHours} />
        <NumberField id={`${id}-r`} label="Electricity rate (cents/kWh)" value={rate} onChange={setRate} hint="Find it on your electric bill." />
      </div>
      <ResultBox empty="Enter the wattage, hours, and your electricity rate.">
        {ready ? (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="Per hour" value={usd(perHour)} />
              <Stat label="Per day" value={usd(perDay)} />
              <Stat label="Per month (30 days)" value={usd(perDay * 30)} big />
              <Stat label="Whole winter (Nov to Mar)" value={usd(perDay * WINTER_DAYS, 0)} />
            </div>
            <p className="mt-4 text-sm text-muted">
              Uses {num(kwhPerHour, 2)} kWh per hour and {num(kwhPerHour * (h ?? 0))} kWh per day. Formula: watts ÷ 1,000 × hours × rate. This assumes the
              heater runs at full power the whole time. Heaters with a thermostat cycle on and off, so real costs are often lower.
            </p>
          </>
        ) : undefined}
      </ResultBox>
    </div>
  );
}
