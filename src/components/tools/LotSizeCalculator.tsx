"use client";

import { useId, useState } from "react";
import { Choice, NumberField, ResultBox, Stat, num, parseNumber } from "./fields";

type Mode = "sqft" | "dims" | "acres";
const SQFT_PER_ACRE = 43_560;
const SQM_PER_ACRE = 4046.856;
const ACRES_PER_HECTARE = 2.471054;

export default function LotSizeCalculator() {
  const id = useId();
  const [mode, setMode] = useState<Mode>("sqft");
  const [sqft, setSqft] = useState("10890");
  const [len, setLen] = useState("100");
  const [wid, setWid] = useState("150");
  const [acres, setAcres] = useState("0.5");

  let a: number | null = null;
  if (mode === "sqft") {
    const s = parseNumber(sqft);
    a = s !== null ? s / SQFT_PER_ACRE : null;
  } else if (mode === "dims") {
    const l = parseNumber(len);
    const w = parseNumber(wid);
    a = l !== null && w !== null ? (l * w) / SQFT_PER_ACRE : null;
  } else {
    a = parseNumber(acres);
  }

  return (
    <div>
      <Choice
        name={`${id}-mode`}
        legend="I have"
        options={[
          { id: "sqft", label: "Square feet" },
          { id: "dims", label: "Length × width" },
          { id: "acres", label: "Acres" },
        ]}
        value={mode}
        onChange={setMode}
      />
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {mode === "sqft" && <NumberField id={`${id}-s`} label="Lot size (square feet)" value={sqft} onChange={setSqft} />}
        {mode === "dims" && (
          <>
            <NumberField id={`${id}-l`} label="Length (feet)" value={len} onChange={setLen} />
            <NumberField id={`${id}-w`} label="Width (feet)" value={wid} onChange={setWid} />
          </>
        )}
        {mode === "acres" && <NumberField id={`${id}-a`} label="Acres" value={acres} onChange={setAcres} />}
      </div>
      <ResultBox empty="Enter your lot size.">
        {a !== null ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Acres" value={num(a, 4)} big />
            <Stat label="Square feet" value={num(a * SQFT_PER_ACRE, 0)} />
            <Stat label="Square meters" value={num(a * SQM_PER_ACRE, 0)} />
            <Stat label="Hectares" value={num(a / ACRES_PER_HECTARE, 4)} />
          </div>
        ) : undefined}
      </ResultBox>
    </div>
  );
}
