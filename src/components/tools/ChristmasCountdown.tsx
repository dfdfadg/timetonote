"use client";

import { useSyncExternalStore } from "react";

const DAY = 24 * 60 * 60 * 1000;

function nextChristmas(now: Date): Date {
  const thisYear = new Date(now.getFullYear(), 11, 25);
  const endOfChristmas = new Date(now.getFullYear(), 11, 26);
  return now < endOfChristmas ? thisYear : new Date(now.getFullYear() + 1, 11, 25);
}

/** Whole calendar days between two local dates (ignores time of day and DST shifts). */
function calendarDaysBetween(a: Date, b: Date): number {
  const ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((ub - ua) / DAY);
}

function countFridaysBefore(now: Date, target: Date): number {
  let count = 0;
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  while (d < target) {
    if (d.getDay() === 5) count++;
    d.setDate(d.getDate() + 1);
  }
  return count;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** A one-second clock. The server snapshot is null so nothing time-based is prerendered. */
function subscribeClock(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}
const getSecond = () => Math.floor(Date.now() / 1000);
const getServerSecond = () => null;

export default function ChristmasCountdown() {
  const second = useSyncExternalStore(subscribeClock, getSecond, getServerSecond);

  if (second === null) {
    return <div className="h-72 animate-pulse rounded-2xl bg-surface-muted" aria-hidden="true" />;
  }

  const now = new Date(second * 1000);
  const christmas = nextChristmas(now);
  const days = calendarDaysBetween(now, christmas);
  const isToday = days === 0;
  const msLeft = Math.max(0, christmas.getTime() - now.getTime());
  const d = Math.floor(msLeft / DAY);
  const h = Math.floor((msLeft % DAY) / 3_600_000);
  const m = Math.floor((msLeft % 3_600_000) / 60_000);
  const s = Math.floor((msLeft % 60_000) / 1000);
  const weeks = Math.floor(days / 7);
  const extraDays = days % 7;
  const dateLabel = christmas.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  if (isToday) {
    return (
      <div className="py-8 text-center">
        <p className="text-5xl" aria-hidden="true">🎄</p>
        <p className="mt-4 font-serif text-3xl font-semibold text-ink">Merry Christmas! It is today.</p>
        <p className="mt-2 text-muted">Come back tomorrow to start the countdown to next Christmas.</p>
      </div>
    );
  }

  const units = [
    { label: "Days", value: d },
    { label: "Hours", value: pad(h) },
    { label: "Minutes", value: pad(m) },
    { label: "Seconds", value: pad(s) },
  ];

  return (
    <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">Christmas Day is {dateLabel}</p>
      <p className="mt-3 font-serif text-5xl font-semibold text-ink sm:text-6xl">
        {days} {days === 1 ? "day" : "days"}
      </p>
      <p className="mt-1 text-muted">until Christmas</p>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted">Exact time left until midnight on Christmas</p>
      <div className="mx-auto mt-2 grid max-w-md grid-cols-4 gap-2" role="timer" aria-live="off">
        {units.map((u) => (
          <div key={u.label} className="rounded-xl border border-line bg-bg px-2 py-3">
            <div className="text-2xl font-semibold tabular-nums text-ink sm:text-3xl">{u.value}</div>
            <div className="mt-1 text-xs font-medium text-muted">{u.label}</div>
          </div>
        ))}
      </div>

      <dl className="mx-auto mt-6 grid max-w-xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
        <div className="rounded-xl border border-line bg-bg p-3">
          <dt className="text-xs font-medium text-muted">Weeks until Christmas</dt>
          <dd className="mt-1 font-semibold text-ink">
            {weeks} {weeks === 1 ? "week" : "weeks"}
            {extraDays > 0 && ` and ${extraDays} ${extraDays === 1 ? "day" : "days"}`}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-bg p-3">
          <dt className="text-xs font-medium text-muted">Sleeps until Christmas</dt>
          <dd className="mt-1 font-semibold text-ink">{days} {days === 1 ? "sleep" : "sleeps"}</dd>
        </div>
        <div className="rounded-xl border border-line bg-bg p-3">
          <dt className="text-xs font-medium text-muted">Fridays left before Christmas</dt>
          <dd className="mt-1 font-semibold text-ink">{countFridaysBefore(now, christmas)}</dd>
        </div>
      </dl>
      <p className="mt-4 text-xs text-muted">Counted in your device’s local time zone.</p>
    </div>
  );
}
