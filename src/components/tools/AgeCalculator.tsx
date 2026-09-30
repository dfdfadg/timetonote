"use client";

import { useId, useState } from "react";
import { ResultBox, Stat, inputClass, num } from "./fields";

const DAY = 86_400_000;

function parseDate(v: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

function diff(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

const utc = (d: Date) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());

export default function AgeCalculator() {
  const id = useId();
  const [birth, setBirth] = useState("");
  const [asOf, setAsOf] = useState("");

  const b = parseDate(birth);
  const now = new Date();
  const t = parseDate(asOf) ?? new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const valid = b !== null && b <= t;

  let content = null;
  if (b && !valid) content = <p className="font-medium text-[var(--accent-rose)]">The birth date must be on or before the “age on” date.</p>;
  if (b && valid) {
    const { years, months, days } = diff(b, t);
    const totalDays = Math.round((utc(t) - utc(b)) / DAY);
    let next = new Date(t.getFullYear(), b.getMonth(), b.getDate());
    if (utc(next) < utc(t)) next = new Date(t.getFullYear() + 1, b.getMonth(), b.getDate());
    const untilBirthday = Math.round((utc(next) - utc(t)) / DAY);
    content = (
      <>
        <Stat label="Age" value={`${years} years, ${months} months, ${days} days`} big />
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Total months" value={num(years * 12 + months, 0)} />
          <Stat label="Total weeks" value={num(Math.floor(totalDays / 7), 0)} />
          <Stat label="Total days" value={num(totalDays, 0)} />
          <Stat label="Next birthday" value={untilBirthday === 0 ? "Today! 🎂" : `in ${untilBirthday} days`} />
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-b`} className="text-sm font-medium text-ink-soft">
            Date of birth
          </label>
          <input id={`${id}-b`} type="date" value={birth} onChange={(e) => setBirth(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${id}-t`} className="text-sm font-medium text-ink-soft">
            Age on this date (optional)
          </label>
          <input id={`${id}-t`} type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)} className={inputClass} />
          <p className="mt-1 text-xs text-muted">Leave empty to use today.</p>
        </div>
      </div>
      <ResultBox empty="Pick a date of birth to see the exact age.">{content ?? undefined}</ResultBox>
    </div>
  );
}
