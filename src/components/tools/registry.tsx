import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/**
 * Maps a tool slug (see src/data/tools.ts) to its interactive component.
 * Each tool is code-split so a page only loads the JavaScript it needs.
 */
const Loading = () => <div className="h-64 animate-pulse rounded-2xl bg-surface-muted" aria-hidden="true" />;

export const toolComponents: Record<string, ComponentType> = {
  "word-counter": dynamic(() => import("./WordCounter"), { loading: Loading }),
  "percentage-calculator": dynamic(() => import("./PercentageCalculator"), { loading: Loading }),
  "days-until-christmas": dynamic(() => import("./HolidayCountdown").then((m) => m.ChristmasCountdown), { loading: Loading }),
  "days-until-thanksgiving": dynamic(() => import("./HolidayCountdown").then((m) => m.ThanksgivingCountdown), {
    loading: Loading,
  }),
  "days-until-halloween": dynamic(() => import("./HolidayCountdown").then((m) => m.HalloweenCountdown), { loading: Loading }),
  "days-until-new-year": dynamic(() => import("./HolidayCountdown").then((m) => m.NewYearCountdown), { loading: Loading }),
  "space-heater-cost-calculator": dynamic(() => import("./SpaceHeaterCostCalculator"), { loading: Loading }),
  "costco-membership-calculator": dynamic(() => import("./CostcoMembershipCalculator"), { loading: Loading }),
  "dehumidifier-size-calculator": dynamic(() => import("./DehumidifierSizeCalculator"), { loading: Loading }),
  "walmart-plus-calculator": dynamic(() => import("./WalmartPlusCalculator"), { loading: Loading }),
  "air-fryer-conversion-calculator": dynamic(() => import("./AirFryerConverter"), { loading: Loading }),
  "hours-and-minutes-calculator": dynamic(() => import("./TimeCalculator"), { loading: Loading }),
  "decimal-to-time-calculator": dynamic(
    () => import("./TimeCalculator").then((m) => function DecimalToTime() {
      return <m.default initialMode="decimal" />;
    }),
    { loading: Loading },
  ),
  "age-calculator": dynamic(() => import("./AgeCalculator"), { loading: Loading }),
  "shoe-size-converter": dynamic(() => import("./ShoeSizeConverter"), { loading: Loading }),
  "engagement-rate-calculator": dynamic(() => import("./EngagementRateCalculator"), { loading: Loading }),
  "dog-years-calculator": dynamic(() => import("./DogYearsCalculator"), { loading: Loading }),
  "water-intake-calculator": dynamic(() => import("./WaterIntakeCalculator"), { loading: Loading }),
  "mpg-calculator": dynamic(() => import("./MpgCalculator"), { loading: Loading }),
  "salary-increase-calculator": dynamic(() => import("./SalaryIncreaseCalculator"), { loading: Loading }),
  "tree-trimming-cost-calculator": dynamic(() => import("./TreeTrimmingCostCalculator"), { loading: Loading }),
  "home-inspection-cost-calculator": dynamic(() => import("./HomeInspectionCostCalculator"), { loading: Loading }),
  "fence-cost-calculator": dynamic(() => import("./FenceCostCalculator"), { loading: Loading }),
  "lot-size-to-acres-calculator": dynamic(() => import("./LotSizeCalculator"), { loading: Loading }),
  "keyword-cannibalization-checker": dynamic(() => import("./KeywordCannibalizationChecker"), { loading: Loading }),
};
