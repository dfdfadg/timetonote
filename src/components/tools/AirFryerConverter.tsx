"use client";

import { useId, useState } from "react";
import { Choice, NumberField, ResultBox, Stat, parseNumber } from "./fields";

type Unit = "F" | "C";

export default function AirFryerConverter() {
  const id = useId();
  const [unit, setUnit] = useState<Unit>("F");
  const [temp, setTemp] = useState("400");
  const [time, setTime] = useState("25");

  const t = parseNumber(temp);
  const m = parseNumber(time);
  const ready = t !== null && m !== null && t > 0 && m > 0;
  const drop = unit === "F" ? 25 : 15;
  const airTemp = ready ? Math.round((t - drop) / 5) * 5 : 0;
  const airTime = ready ? Math.max(1, Math.round(m * 0.8)) : 0;
  const checkAt = Math.max(1, airTime - 3);

  return (
    <div>
      <Choice
        name={`${id}-unit`}
        legend="Temperature unit"
        options={[
          { id: "F", label: "°F" },
          { id: "C", label: "°C" },
        ]}
        value={unit}
        onChange={(u) => {
          setUnit(u);
          setTemp(u === "F" ? "400" : "200");
        }}
      />
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField id={`${id}-t`} label={`Oven temperature (°${unit})`} value={temp} onChange={setTemp} />
        <NumberField id={`${id}-m`} label="Oven cook time (minutes)" value={time} onChange={setTime} />
      </div>
      <ResultBox empty="Enter the oven temperature and time from your recipe.">
        {ready ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Stat label="Air fryer temperature" value={`${airTemp}°${unit}`} big />
              <Stat label="Air fryer time" value={`${airTime} min`} big />
            </div>
            <p className="mt-4 text-sm text-muted">
              Rule used: lower the temperature by {drop}°{unit} and cut the time by about 20%. Start checking at {checkAt} minutes, and shake the basket or
              flip food halfway through. Air fryers vary, so always check that meat reaches a safe internal temperature.
            </p>
          </>
        ) : undefined}
      </ResultBox>
    </div>
  );
}
