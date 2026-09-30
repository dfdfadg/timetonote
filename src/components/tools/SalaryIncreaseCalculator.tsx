"use client";

import { useId, useState } from "react";
import { Choice, NumberField, ResultBox, Stat, num, parseNumber, usd } from "./fields";

type Mode = "percent" | "newPay";
const HOURS_PER_YEAR = 2080;

export default function SalaryIncreaseCalculator() {
  const id = useId();
  const [mode, setMode] = useState<Mode>("percent");
  const [oldPay, setOldPay] = useState("55000");
  const [newPay, setNewPay] = useState("58500");
  const [pct, setPct] = useState("4");

  const o = parseNumber(oldPay);
  const n = mode === "percent" ? parseNumber(newPay) : o !== null && parseNumber(pct) !== null ? o * (1 + (parseNumber(pct) ?? 0) / 100) : null;
  const ready = o !== null && o > 0 && n !== null;
  const raise = ready ? n - o : 0;
  const percent = ready ? (raise / o) * 100 : 0;

  return (
    <div>
      <Choice
        name={`${id}-mode`}
        legend="I know"
        options={[
          { id: "percent", label: "Old and new pay" },
          { id: "newPay", label: "Old pay and raise %" },
        ]}
        value={mode}
        onChange={setMode}
      />
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField id={`${id}-o`} label="Current yearly pay ($)" value={oldPay} onChange={setOldPay} />
        {mode === "percent" ? (
          <NumberField id={`${id}-n`} label="New yearly pay ($)" value={newPay} onChange={setNewPay} />
        ) : (
          <NumberField id={`${id}-p`} label="Raise (%)" value={pct} onChange={setPct} />
        )}
      </div>
      <ResultBox empty="Enter your pay details.">
        {ready ? (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="Raise" value={`${num(percent, 2)}%`} big />
              <Stat label="New yearly pay" value={usd(n, 0)} />
              <Stat label="Extra per year" value={usd(raise, 0)} />
              <Stat label="Extra per month" value={usd(raise / 12, 0)} />
            </div>
            <p className="mt-3 text-sm text-muted">
              New hourly rate: {usd(n / HOURS_PER_YEAR)} (based on 2,080 work hours a year). Amounts are before taxes.
            </p>
          </>
        ) : undefined}
      </ResultBox>
    </div>
  );
}
