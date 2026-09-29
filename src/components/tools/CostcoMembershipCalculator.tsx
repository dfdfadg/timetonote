"use client";

import { useId, useState } from "react";
import { NumberField, ResultBox, Stat, parseNumber, usd } from "./fields";

const GOLD_STAR = 65;
const EXECUTIVE = 130;
const REWARD_RATE = 0.02;
const REWARD_CAP = 1250;
const BREAK_EVEN = (EXECUTIVE - GOLD_STAR) / REWARD_RATE;

export default function CostcoMembershipCalculator() {
  const id = useId();
  const [monthly, setMonthly] = useState("250");
  const m = parseNumber(monthly);

  const yearly = (m ?? 0) * 12;
  const reward = Math.min(yearly * REWARD_RATE, REWARD_CAP);
  const net = reward - (EXECUTIVE - GOLD_STAR);
  const executiveWins = net > 0;

  return (
    <div>
      <NumberField
        id={`${id}-m`}
        label="How much do you spend at Costco each month? ($)"
        value={monthly}
        onChange={setMonthly}
        hint="Count warehouse and costco.com purchases. Leave out gas, since some items do not earn the 2% reward."
      />
      <ResultBox empty="Enter your monthly Costco spending.">
        {m !== null ? (
          <>
            <p className="text-lg font-semibold text-ink">
              {executiveWins
                ? `Executive pays off. You come out about ${usd(net, 0)} ahead each year.`
                : net === 0
                  ? "You are right at the break-even point. Either membership works."
                  : `Stick with Gold Star. Executive would cost you about ${usd(-net, 0)} more each year.`}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="Yearly spending" value={usd(yearly, 0)} />
              <Stat label="Your 2% reward" value={usd(reward, 0)} />
              <Stat label="Extra Executive fee" value={usd(EXECUTIVE - GOLD_STAR, 0)} />
              <Stat label="Break-even spending" value={`${usd(BREAK_EVEN, 0)}/yr`} />
            </div>
            <p className="mt-4 text-sm text-muted">
              Based on a {usd(GOLD_STAR, 0)} Gold Star fee, a {usd(EXECUTIVE, 0)} Executive fee, and a 2% reward capped at {usd(REWARD_CAP, 0)} a year. Fees
              can change, so check Costco&apos;s site.
            </p>
          </>
        ) : undefined}
      </ResultBox>
    </div>
  );
}
