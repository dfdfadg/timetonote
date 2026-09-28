"use client";

import { useSyncExternalStore } from "react";

const DAY = 24 * 60 * 60 * 1000;

interface Holiday {
  name: string;
  emoji: string;
  /** The holiday's date in a given year (local time, midnight). */
  date: (year: number) => Date;
  greeting: string;
  /** Extra stat shown next to weeks and sleeps. */
  weekday: { day: number; label: string };
}

/** US Thanksgiving: the fourth Thursday of November. */
function thanksgiving(year: number): Date {
  const first = new Date(year, 10, 1);
  const firstThursday = 1 + ((4 - first.getDay() + 7) % 7);
  return new Date(year, 10, firstThursday + 21);
}

const holidays = {
  christmas: {
    name: "Christmas",
    emoji: "🎄",
    date: (y) => new Date(y, 11, 25),
    greeting: "Merry Christmas! It is today.",
    weekday: { day: 5, label: "Fridays" },
  },
  thanksgiving: {
    name: "Thanksgiving",
    emoji: "🦃",
    date: thanksgiving,
    greeting: "Happy Thanksgiving! It is today.",
    weekday: { day: 6, label: "Weekends" },
  },
  halloween: {
    name: "Halloween",
    emoji: "🎃",
    date: (y) => new Date(y, 9, 31),
    greeting: "Happy Halloween! It is today.",
    weekday: { day: 6, label: "Weekends" },
  },
  "new-year": {
    name: "New Year's Day",
    emoji: "🎆",
    date: (y) => new Date(y, 0, 1),
    greeting: "Happy New Year! It is today.",
    weekday: { day: 6, label: "Weekends" },
  },
} satisfies Record<string, Holiday>;

/** The next occurrence of the holiday, counting today as "the day" until midnight. */
function nextOccurrence(holiday: Holiday, now: Date): Date {
  const thisYear = holiday.date(now.getFullYear());
  const dayAfter = new Date(thisYear.getFullYear(), thisYear.getMonth(), thisYear.getDate() + 1);
  return now < dayAfter ? thisYear : holiday.date(now.getFullYear() + 1);
}

/** Whole calendar days between two local dates (ignores time of day and DST shifts). */
function calendarDaysBetween(a: Date, b: Date): number {
  const ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((ub - ua) / DAY);
}

/** How many times a weekday (0 = Sunday) falls after today and before the target date. */
function countWeekdayBefore(now: Date, target: Date, weekday: number): number {
  let count = 0;
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  while (d < target) {
    if (d.getDay() === weekday) count++;
    d.setDate(d.getDate() + 1);
  }
  return count;
}

const pad = (n: number) => String(n).padStart(2, "0");
const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/** A one-second clock. The server snapshot is null so nothing time-based is prerendered. */
function subscribeClock(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}
const getSecond = () => Math.floor(Date.now() / 1000);
const getServerSecond = () => null;

function HolidayCountdown({ holiday }: { holiday: Holiday }) {
  const second = useSyncExternalStore(subscribeClock, getSecond, getServerSecond);

  if (second === null) {
    return <div className="h-72 animate-pulse rounded-2xl bg-surface-muted" aria-hidden="true" />;
  }

  const now = new Date(second * 1000);
  const target = nextOccurrence(holiday, now);
  const days = calendarDaysBetween(now, target);

  if (days === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-5xl" aria-hidden="true">
          {holiday.emoji}
        </p>
        <p className="mt-4 font-serif text-3xl font-semibold text-ink">{holiday.greeting}</p>
        <p className="mt-2 text-muted">Come back tomorrow to start the countdown to next year.</p>
      </div>
    );
  }

  const msLeft = Math.max(0, target.getTime() - now.getTime());
  const units = [
    { label: "Days", value: Math.floor(msLeft / DAY) },
    { label: "Hours", value: pad(Math.floor((msLeft % DAY) / 3_600_000)) },
    { label: "Minutes", value: pad(Math.floor((msLeft % 3_600_000) / 60_000)) },
    { label: "Seconds", value: pad(Math.floor((msLeft % 60_000) / 1000)) },
  ];
  const weeks = Math.floor(days / 7);
  const extraDays = days % 7;
  const dateLabel = target.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
        {holiday.name} is {dateLabel}
      </p>
      <p className="mt-3 font-serif text-5xl font-semibold text-ink sm:text-6xl">{plural(days, "day", "days")}</p>
      <p className="mt-1 text-muted">until {holiday.name}</p>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted">
        Exact time left until midnight on {holiday.name}
      </p>
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
          <dt className="text-xs font-medium text-muted">Weeks until {holiday.name}</dt>
          <dd className="mt-1 font-semibold text-ink">
            {weeks === 0
              ? plural(extraDays, "day", "days")
              : `${plural(weeks, "week", "weeks")}${extraDays > 0 ? ` and ${plural(extraDays, "day", "days")}` : ""}`}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-bg p-3">
          <dt className="text-xs font-medium text-muted">Sleeps until {holiday.name}</dt>
          <dd className="mt-1 font-semibold text-ink">{plural(days, "sleep", "sleeps")}</dd>
        </div>
        <div className="rounded-xl border border-line bg-bg p-3">
          <dt className="text-xs font-medium text-muted">
            {holiday.weekday.label} left before {holiday.name}
          </dt>
          <dd className="mt-1 font-semibold text-ink">{countWeekdayBefore(now, target, holiday.weekday.day)}</dd>
        </div>
      </dl>
      <p className="mt-4 text-xs text-muted">Counted in your device’s local time zone.</p>
    </div>
  );
}

export const ChristmasCountdown = () => <HolidayCountdown holiday={holidays.christmas} />;
export const ThanksgivingCountdown = () => <HolidayCountdown holiday={holidays.thanksgiving} />;
export const HalloweenCountdown = () => <HolidayCountdown holiday={holidays.halloween} />;
export const NewYearCountdown = () => <HolidayCountdown holiday={holidays["new-year"]} />;
