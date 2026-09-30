"use client";

import { useId, useState } from "react";
import { Choice, NumberField, ResultBox, Stat, parseNumber } from "./fields";

type From = "women" | "men";
const round = (n: number) => Math.round(n * 2) / 2;

export default function ShoeSizeConverter() {
  const id = useId();
  const [from, setFrom] = useState<From>("women");
  const [size, setSize] = useState("8");
  const s = parseNumber(size);
  const converted = s !== null && s > 0 ? round(from === "women" ? s - 1.5 : s + 1.5) : null;

  return (
    <div>
      <Choice
        name={`${id}-from`}
        legend="Convert from"
        options={[
          { id: "women", label: "Women's to men's" },
          { id: "men", label: "Men's to women's" },
        ]}
        value={from}
        onChange={setFrom}
      />
      <div className="mt-5">
        <NumberField id={`${id}-s`} label={`US ${from === "women" ? "women's" : "men's"} size`} value={size} onChange={setSize} hint="Half sizes work too, like 8.5." />
      </div>
      <ResultBox empty="Enter a US shoe size.">
        {converted !== null ? (
          converted <= 0 ? (
            <p className="text-muted">That size is too small to convert. Try a kids&apos; size chart.</p>
          ) : (
            <>
              <Stat label={`US ${from === "women" ? "men's" : "women's"} size`} value={String(converted)} big />
              <p className="mt-3 text-sm text-muted">
                Rule used: women&apos;s size = men&apos;s size + 1.5. Some brands use a 1 or 2 size gap, and men&apos;s shoes are often a bit wider, so check
                the brand&apos;s own chart when you can.
              </p>
            </>
          )
        ) : undefined}
      </ResultBox>
    </div>
  );
}
