"use client";

import { useId, useMemo, useState } from "react";

interface Row {
  query: string;
  page: string;
  clicks: number;
  impressions: number;
  position: number | null;
}

interface Group {
  query: string;
  pages: Row[];
  impressions: number;
  clicks: number;
  /** Share of impressions held by the second-strongest URL (0 to 1). */
  competition: number;
}

const SAMPLE = `query,page,clicks,impressions,position
why is my house so dusty,https://example.com/why-is-my-house-so-dusty,120,2400,4.1
why is my house so dusty,https://example.com/how-to-clean-a-dusty-house,15,1300,9.8
how to reduce dust at home,https://example.com/how-to-clean-a-dusty-house,80,1900,5.2
wifi not working,https://example.com/why-is-my-wifi-not-working,210,5200,3.4`;

/** Minimal CSV/TSV parser that handles quoted fields. */
function parseDelimited(text: string): string[][] {
  const firstLine = text.split(/\r?\n/, 1)[0] ?? "";
  const delimiter = firstLine.includes("\t") ? "\t" : firstLine.split(";").length > firstLine.split(",").length ? ";" : ",";
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') inQuotes = false;
      else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === delimiter) {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      if (row.some((c) => c.trim())) rows.push(row);
      row = [];
      field = "";
    } else field += ch;
  }
  row.push(field);
  if (row.some((c) => c.trim())) rows.push(row);
  return rows;
}

const num = (v: string | undefined) => {
  if (!v) return 0;
  const n = Number(v.replace(/[%,\s]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

function findColumn(header: string[], names: string[]): number {
  return header.findIndex((h) => names.some((n) => h.includes(n)));
}

function toRows(text: string): { rows: Row[]; error?: string } {
  const table = parseDelimited(text.trim());
  if (table.length < 2) return { rows: [], error: "Paste at least a header row and one data row." };
  const header = table[0].map((h) => h.trim().toLowerCase());
  const q = findColumn(header, ["query", "keyword", "search term"]);
  const p = findColumn(header, ["page", "url", "landing"]);
  if (q === -1 || p === -1)
    return { rows: [], error: "Couldn’t find “query” and “page” columns. Check the header row matches the example." };
  const c = findColumn(header, ["click"]);
  const im = findColumn(header, ["impression"]);
  const pos = findColumn(header, ["position", "rank"]);

  const rows = table.slice(1).flatMap((cells) => {
    const query = cells[q]?.trim().toLowerCase();
    const page = cells[p]?.trim().replace(/#.*$/, "").replace(/\/+$/, "");
    if (!query || !page) return [];
    return [{
      query,
      page,
      clicks: c >= 0 ? num(cells[c]) : 0,
      impressions: im >= 0 ? num(cells[im]) : 0,
      position: pos >= 0 && cells[pos]?.trim() ? num(cells[pos]) : null,
    }];
  });
  return { rows };
}

function findCannibalization(rows: Row[], minImpressions: number): Group[] {
  const byQuery = new Map<string, Map<string, Row>>();
  for (const r of rows) {
    const pages = byQuery.get(r.query) ?? new Map<string, Row>();
    const existing = pages.get(r.page);
    if (existing) {
      existing.clicks += r.clicks;
      existing.impressions += r.impressions;
    } else pages.set(r.page, { ...r });
    byQuery.set(r.query, pages);
  }
  const groups: Group[] = [];
  for (const [query, pageMap] of byQuery) {
    const pages = [...pageMap.values()]
      .filter((p) => p.impressions >= minImpressions)
      .sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks);
    if (pages.length < 2) continue;
    const impressions = pages.reduce((s, p) => s + p.impressions, 0);
    const clicks = pages.reduce((s, p) => s + p.clicks, 0);
    groups.push({ query, pages, impressions, clicks, competition: impressions ? pages[1].impressions / impressions : 0 });
  }
  return groups.sort((a, b) => b.competition * b.impressions - a.competition * a.impressions);
}

function severity(g: Group) {
  if (g.competition >= 0.3) return { label: "High", className: "bg-[var(--accent-rose-soft)] text-[var(--accent-rose)]" };
  if (g.competition >= 0.1) return { label: "Medium", className: "bg-[var(--accent-amber-soft)] text-[var(--accent-amber)]" };
  return { label: "Low", className: "bg-surface-muted text-muted" };
}

export default function KeywordCannibalizationChecker() {
  const id = useId();
  const [input, setInput] = useState("");
  const [minImpressions, setMinImpressions] = useState(10);
  const [submitted, setSubmitted] = useState("");

  const { rows, error } = useMemo(() => (submitted ? toRows(submitted) : { rows: [] as Row[] }), [submitted]);
  const groups = useMemo(() => findCannibalization(rows, minImpressions), [rows, minImpressions]);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setInput(text);
    setSubmitted(text);
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(input);
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor={`${id}-data`} className="text-sm font-semibold text-ink">
            Query + page data (CSV or tab-separated)
          </label>
          <button
            type="button"
            onClick={() => {
              setInput(SAMPLE);
              setSubmitted(SAMPLE);
            }}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-brand hover:bg-brand-soft"
          >
            Load example
          </button>
        </div>
        <textarea
          id={`${id}-data`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={9}
          spellCheck={false}
          placeholder={"query,page,clicks,impressions,position\n…"}
          className="mt-2 w-full resize-y rounded-xl border border-line-strong bg-surface p-4 font-mono text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand-soft"
        />
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <div>
            <label htmlFor={`${id}-file`} className="block text-sm font-medium text-ink-soft">
              Or upload a .csv file
            </label>
            <input
              id={`${id}-file`}
              type="file"
              accept=".csv,.tsv,.txt,text/csv"
              onChange={onFile}
              className="mt-1.5 block text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-surface-muted file:px-3 file:py-2 file:font-medium file:text-ink"
            />
          </div>
          <div>
            <label htmlFor={`${id}-min`} className="block text-sm font-medium text-ink-soft">
              Ignore URLs with fewer impressions than
            </label>
            <input
              id={`${id}-min`}
              type="number"
              min={0}
              value={minImpressions}
              onChange={(e) => setMinImpressions(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1.5 w-32 rounded-xl border border-line-strong bg-surface px-3 py-2 text-ink focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand-soft"
            />
          </div>
          <button type="submit" className="rounded-xl bg-brand px-5 py-2.5 font-semibold text-on-brand hover:bg-brand-strong">
            Check for cannibalization
          </button>
        </div>
      </form>

      <div className="mt-8" aria-live="polite">
        {error && <p className="rounded-xl border border-line bg-bg p-4 text-ink-soft">{error}</p>}
        {!error && submitted && (
          <p className="text-sm text-muted">
            Analyzed {rows.length.toLocaleString()} rows · found{" "}
            <strong className="text-ink">{groups.length}</strong> {groups.length === 1 ? "query" : "queries"} with more than one
            ranking URL.
          </p>
        )}
        {groups.length > 0 && (
          <div className="mt-4 space-y-4">
            {groups.map((g) => {
              const s = severity(g);
              return (
                <section key={g.query} className="rounded-2xl border border-line bg-surface p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold text-ink">“{g.query}”</h3>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${s.className}`}>
                      {s.label} overlap · {Math.round(g.competition * 100)}%
                    </span>
                  </div>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="text-xs text-muted">
                        <tr>
                          <th scope="col" className="py-1.5 pr-4 font-medium">URL</th>
                          <th scope="col" className="py-1.5 pr-4 text-right font-medium">Clicks</th>
                          <th scope="col" className="py-1.5 pr-4 text-right font-medium">Impr.</th>
                          <th scope="col" className="py-1.5 text-right font-medium">Pos.</th>
                        </tr>
                      </thead>
                      <tbody className="tabular-nums">
                        {g.pages.map((p) => (
                          <tr key={p.page} className="border-t border-line">
                            <td className="max-w-[28rem] break-all py-2 pr-4 text-ink-soft">{p.page}</td>
                            <td className="py-2 pr-4 text-right">{p.clicks.toLocaleString()}</td>
                            <td className="py-2 pr-4 text-right">{p.impressions.toLocaleString()}</td>
                            <td className="py-2 text-right">{p.position === null ? "-" : p.position.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
