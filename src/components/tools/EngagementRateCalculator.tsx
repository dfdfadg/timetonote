"use client";

import { useId, useState } from "react";
import { Choice, NumberField, ResultBox, Stat, num, parseNumber } from "./fields";

type Base = "followers" | "views";

export default function EngagementRateCalculator() {
  const id = useId();
  const [base, setBase] = useState<Base>("followers");
  const [likes, setLikes] = useState("420");
  const [comments, setComments] = useState("35");
  const [shares, setShares] = useState("12");
  const [saves, setSaves] = useState("20");
  const [audience, setAudience] = useState("15000");

  const total = [likes, comments, shares, saves].reduce((t, v) => t + (parseNumber(v) ?? 0), 0);
  const a = parseNumber(audience);
  const rate = a && a > 0 ? (total / a) * 100 : null;

  return (
    <div>
      <Choice
        name={`${id}-base`}
        legend="Calculate by"
        options={[
          { id: "followers", label: "Followers (Instagram style)" },
          { id: "views", label: "Views (TikTok and Reels style)" },
        ]}
        value={base}
        onChange={setBase}
      />
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <NumberField id={`${id}-l`} label="Likes" value={likes} onChange={setLikes} />
        <NumberField id={`${id}-c`} label="Comments" value={comments} onChange={setComments} />
        <NumberField id={`${id}-sh`} label="Shares" value={shares} onChange={setShares} />
        <NumberField id={`${id}-sv`} label="Saves" value={saves} onChange={setSaves} />
      </div>
      <div className="mt-4">
        <NumberField id={`${id}-a`} label={base === "followers" ? "Followers" : "Views"} value={audience} onChange={setAudience} />
      </div>
      <ResultBox empty={`Enter your interactions and ${base}.`}>
        {rate !== null ? (
          <>
            <Stat label="Engagement rate" value={`${num(rate, 2)}%`} big />
            <p className="mt-3 text-sm text-muted">
              Formula: (likes + comments + shares + saves) ÷ {base} × 100 = {num(total, 0)} ÷ {num(a ?? 0, 0)} × 100. To compare fairly, always use the
              same method for every post.
            </p>
          </>
        ) : undefined}
      </ResultBox>
    </div>
  );
}
