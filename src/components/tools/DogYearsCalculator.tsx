"use client";

import { useId, useState } from "react";
import { Choice, NumberField, ResultBox, Stat, num, parseNumber } from "./fields";

type Size = "small" | "medium" | "large" | "giant";
type Dir = "dog" | "human";

const PER_YEAR: Record<Size, number> = { small: 4, medium: 5, large: 6, giant: 7 };
const SIZES: { id: Size; label: string }[] = [
  { id: "small", label: "Small (up to 20 lb)" },
  { id: "medium", label: "Medium (21 to 50 lb)" },
  { id: "large", label: "Large (51 to 100 lb)" },
  { id: "giant", label: "Giant (over 100 lb)" },
];

/** Year 1 = 15 human years, year 2 = 24, then a fixed number per year by size. */
function toHuman(dogYears: number, size: Size) {
  if (dogYears <= 1) return dogYears * 15;
  if (dogYears <= 2) return 15 + (dogYears - 1) * 9;
  return 24 + (dogYears - 2) * PER_YEAR[size];
}

function toDog(humanYears: number, size: Size) {
  if (humanYears <= 15) return humanYears / 15;
  if (humanYears <= 24) return 1 + (humanYears - 15) / 9;
  return 2 + (humanYears - 24) / PER_YEAR[size];
}

export default function DogYearsCalculator() {
  const id = useId();
  const [dir, setDir] = useState<Dir>("dog");
  const [size, setSize] = useState<Size>("medium");
  const [age, setAge] = useState("5");
  const a = parseNumber(age);
  const out = a !== null ? (dir === "dog" ? toHuman(a, size) : toDog(a, size)) : null;

  return (
    <div>
      <Choice
        name={`${id}-dir`}
        legend="Convert"
        options={[
          { id: "dog", label: "Dog years to human years" },
          { id: "human", label: "Human years to dog years" },
        ]}
        value={dir}
        onChange={setDir}
      />
      <div className="mt-5">
        <Choice name={`${id}-size`} legend="Dog size (adult weight)" options={SIZES} value={size} onChange={setSize} />
      </div>
      <div className="mt-5">
        <NumberField id={`${id}-age`} label={dir === "dog" ? "Dog's age (years)" : "Human age (years)"} value={age} onChange={setAge} hint="Decimals work, like 1.5 for 18 months." />
      </div>
      <ResultBox empty="Enter an age.">
        {out !== null ? (
          <>
            <Stat label={dir === "dog" ? "In human years" : "In dog years"} value={`${num(out, 1)} years`} big />
            <p className="mt-3 text-sm text-muted">
              Based on the common vet guideline: the first year equals about 15 human years, the second about 9 more, then about {PER_YEAR[size]} human years
              for each dog year for a {size} dog. It is an estimate, and every dog ages a little differently.
            </p>
          </>
        ) : undefined}
      </ResultBox>
    </div>
  );
}
