"use client";

import { useId, useState } from "react";
import { Choice, NumberField, ResultBox, Stat, parseNumber, usd } from "./fields";

type Plan = "yearly" | "monthly";
const PLAN_COST: Record<Plan, number> = { yearly: 98, monthly: 12.95 * 12 };

export default function WalmartPlusCalculator() {
  const id = useId();
  const [plan, setPlan] = useState<Plan>("yearly");
  const [deliveries, setDeliveries] = useState("2");
  const [deliveryFee, setDeliveryFee] = useState("9.95");
  const [shipments, setShipments] = useState("1");
  const [gallons, setGallons] = useState("40");
  const [streaming, setStreaming] = useState("8");

  const d = parseNumber(deliveries) ?? 0;
  const f = parseNumber(deliveryFee) ?? 0;
  const s = parseNumber(shipments) ?? 0;
  const g = parseNumber(gallons) ?? 0;
  const st = parseNumber(streaming) ?? 0;

  const parts = [
    { label: "Delivery fees saved", value: d * f * 12 },
    { label: "Shipping fees saved", value: s * 6.99 * 12 },
    { label: "Gas savings (10¢/gal)", value: g * 0.1 * 12 },
    { label: "Streaming value", value: st * 12 },
  ];
  const savings = parts.reduce((t, p) => t + p.value, 0);
  const cost = PLAN_COST[plan];
  const net = savings - cost;

  return (
    <div>
      <Choice
        name={`${id}-plan`}
        legend="Plan"
        options={[
          { id: "yearly", label: "Yearly ($98)" },
          { id: "monthly", label: "Monthly ($12.95)" },
        ]}
        value={plan}
        onChange={setPlan}
      />
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField id={`${id}-d`} label="Grocery deliveries per month ($35+)" value={deliveries} onChange={setDeliveries} />
        <NumberField id={`${id}-f`} label="Delivery fee without Walmart+ ($)" value={deliveryFee} onChange={setDeliveryFee} hint="Fees vary by time slot and store." />
        <NumberField id={`${id}-s`} label="Online orders under $35 per month" value={shipments} onChange={setShipments} hint="Non-members often pay about $6.99 shipping." />
        <NumberField id={`${id}-g`} label="Gallons of gas per month at member stations" value={gallons} onChange={setGallons} />
        <NumberField id={`${id}-st`} label="Streaming value per month ($)" value={streaming} onChange={setStreaming} hint="Set to 0 if you would not pay for Paramount+ or Peacock." />
      </div>
      <ResultBox empty="Enter how you shop.">
        <p className="text-lg font-semibold text-ink">
          {net >= 0
            ? `Walmart+ likely pays for itself. You could save about ${usd(net, 0)} a year after the fee.`
            : `Walmart+ may not be worth it for you. You would pay about ${usd(-net, 0)} more than you save.`}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Stat label="Total yearly value" value={usd(savings, 0)} />
          <Stat label="Membership cost per year" value={usd(cost, 0)} />
          <Stat label="Net per year" value={usd(net, 0)} big />
        </div>
        <ul className="mt-4 space-y-1 text-sm text-muted">
          {parts.map((p) => (
            <li key={p.label}>
              {p.label}: {usd(p.value, 0)}
            </li>
          ))}
        </ul>
      </ResultBox>
    </div>
  );
}
