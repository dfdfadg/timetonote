"use client";

import { useId, useState } from "react";
import { Choice, NumberField, ResultBox, Stat, num, parseNumber } from "./fields";

type Mode = "add" | "decimal" | "toDecimal" | "minutes";

const MODES: { id: Mode; label: string }[] = [
  { id: "add", label: "Add or subtract time" },
  { id: "decimal", label: "Decimal hours to time" },
  { id: "toDecimal", label: "Time to decimal hours" },
  { id: "minutes", label: "Minutes to hours" },
];

const pad = (n: number) => String(n).padStart(2, "0");

/** Seconds → "H hr M min S sec" plus a clock-style h:mm:ss string. */
function split(totalSeconds: number) {
  const sign = totalSeconds < 0 ? "-" : "";
  let s = Math.round(Math.abs(totalSeconds));
  const h = Math.floor(s / 3600);
  s -= h * 3600;
  const m = Math.floor(s / 60);
  const sec = s - m * 60;
  return {
    words: `${sign}${h} hr ${m} min${sec ? ` ${sec} sec` : ""}`,
    clock: `${sign}${h}:${pad(m)}:${pad(sec)}`,
    decimal: (totalSeconds / 3600).toFixed(4).replace(/\.?0+$/, ""),
  };
}

function Duration({ id, label, h, m, s, set }: { id: string; label: string; h: string; m: string; s: string; set: (k: "h" | "m" | "s", v: string) => void }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink">{label}</legend>
      <div className="mt-2 grid grid-cols-3 gap-3">
        <NumberField id={`${id}-h`} label="Hours" value={h} onChange={(v) => set("h", v)} />
        <NumberField id={`${id}-m`} label="Minutes" value={m} onChange={(v) => set("m", v)} />
        <NumberField id={`${id}-s`} label="Seconds" value={s} onChange={(v) => set("s", v)} />
      </div>
    </fieldset>
  );
}

export default function TimeCalculator({ initialMode = "add" }: { initialMode?: Mode }) {
  const id = useId();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [a, setA] = useState({ h: "2", m: "45", s: "" });
  const [b, setB] = useState({ h: "1", m: "30", s: "" });
  const [op, setOp] = useState<"plus" | "minus">("plus");
  const [decimal, setDecimal] = useState("7.75");
  const [minutes, setMinutes] = useState("135");

  const secs = (t: { h: string; m: string; s: string }) =>
    (parseNumber(t.h) ?? 0) * 3600 + (parseNumber(t.m) ?? 0) * 60 + (parseNumber(t.s) ?? 0);

  let result: { title: string; main: string; rows: [string, string][] } | null = null;
  if (mode === "add") {
    const total = op === "plus" ? secs(a) + secs(b) : secs(a) - secs(b);
    const r = split(total);
    result = { title: op === "plus" ? "Total time" : "Difference", main: r.words, rows: [["Clock format", r.clock], ["Decimal hours", r.decimal], ["Total minutes", num(total / 60, 2)]] };
  } else if (mode === "decimal") {
    const d = parseNumber(decimal);
    if (d !== null) {
      const r = split(d * 3600);
      result = { title: `${decimal} hours is`, main: r.words, rows: [["Clock format", r.clock], ["Total minutes", num(d * 60, 2)]] };
    }
  } else if (mode === "toDecimal") {
    const total = secs(a);
    result = { title: "Decimal hours", main: `${split(total).decimal} hours`, rows: [["Total minutes", num(total / 60, 2)], ["Clock format", split(total).clock]] };
  } else {
    const m = parseNumber(minutes);
    if (m !== null) {
      const r = split(m * 60);
      result = { title: `${minutes} minutes is`, main: r.words, rows: [["Decimal hours", r.decimal], ["Clock format", r.clock]] };
    }
  }

  const setter = (fn: typeof setA) => (k: "h" | "m" | "s", v: string) => fn((t) => ({ ...t, [k]: v }));

  return (
    <div>
      <Choice name={`${id}-mode`} legend="What do you want to do?" options={MODES} value={mode} onChange={setMode} />
      <div className="mt-6 space-y-5">
        {(mode === "add" || mode === "toDecimal") && <Duration id={`${id}-a`} label={mode === "add" ? "First time" : "Time"} {...a} set={setter(setA)} />}
        {mode === "add" && (
          <>
            <Choice
              name={`${id}-op`}
              legend="Operation"
              options={[
                { id: "plus", label: "+ Add" },
                { id: "minus", label: "− Subtract" },
              ]}
              value={op}
              onChange={setOp}
            />
            <Duration id={`${id}-b`} label="Second time" {...b} set={setter(setB)} />
          </>
        )}
        {mode === "decimal" && <NumberField id={`${id}-d`} label="Decimal hours" value={decimal} onChange={setDecimal} hint="Example: 7.75 hours from a timesheet." />}
        {mode === "minutes" && <NumberField id={`${id}-min`} label="Minutes" value={minutes} onChange={setMinutes} />}
      </div>
      <ResultBox empty="Enter a number to see the answer.">
        {result ? (
          <>
            <Stat label={result.title} value={result.main} big />
            <dl className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
              {result.rows.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-semibold tabular-nums text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </>
        ) : undefined}
      </ResultBox>
    </div>
  );
}
