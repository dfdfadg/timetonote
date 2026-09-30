"use client";

import { useId, useState } from "react";
import { NumberField, ResultBox, Stat, num, parseNumber, usd } from "./fields";

export default function MpgCalculator() {
  const id = useId();
  const [miles, setMiles] = useState("320");
  const [gallons, setGallons] = useState("11.5");
  const [price, setPrice] = useState("3.25");
  const [trip, setTrip] = useState("500");

  const m = parseNumber(miles);
  const g = parseNumber(gallons);
  const p = parseNumber(price);
  const t = parseNumber(trip);
  const mpg = m !== null && g !== null && g > 0 ? m / g : null;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField id={`${id}-m`} label="Miles driven" value={miles} onChange={setMiles} hint="Reset your trip meter when you fill up." />
        <NumberField id={`${id}-g`} label="Gallons used to refill" value={gallons} onChange={setGallons} />
        <NumberField id={`${id}-p`} label="Gas price per gallon ($)" value={price} onChange={setPrice} />
        <NumberField id={`${id}-t`} label="Trip distance (miles, optional)" value={trip} onChange={setTrip} />
      </div>
      <ResultBox empty="Enter miles driven and gallons used.">
        {mpg !== null ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Miles per gallon" value={num(mpg, 1)} big />
            <Stat label="Cost per mile" value={p !== null ? usd(p / mpg) : "-"} />
            <Stat label="Gallons for trip" value={t !== null ? num(t / mpg, 1) : "-"} />
            <Stat label="Trip fuel cost" value={t !== null && p !== null ? usd((t / mpg) * p) : "-"} />
          </div>
        ) : undefined}
      </ResultBox>
    </div>
  );
}
