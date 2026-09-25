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
  "keyword-cannibalization-checker": dynamic(() => import("./KeywordCannibalizationChecker"), { loading: Loading }),
};
