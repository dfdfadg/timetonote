"use client";

import { useId, useMemo, useState } from "react";

function analyse(text: string) {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length : 0;
  const sentences = trimmed ? (trimmed.match(/[^.!?…]+[.!?…]+|[^.!?…]+$/g) ?? []).filter((s) => /[\p{L}\p{N}]/u.test(s)).length : 0;
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
  return {
    words,
    characters: [...text].length,
    charactersNoSpaces: [...text.replace(/\s/g, "")].length,
    sentences,
    paragraphs,
    readingMinutes: words ? Math.max(1, Math.ceil(words / 225)) : 0,
    speakingMinutes: words ? Math.max(1, Math.ceil(words / 140)) : 0,
  };
}

export default function WordCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => analyse(text), [text]);
  const id = useId();

  const items = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.characters },
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Reading time", value: `${stats.readingMinutes} min` },
    { label: "Speaking time", value: `${stats.speakingMinutes} min` },
  ];

  return (
    <div>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-live="polite">
        {items.map((item) => (
          <div key={item.label} className="rounded-xl border border-line bg-bg p-3">
            <dt className="text-xs font-medium text-muted">{item.label}</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="text-sm font-semibold text-ink">
            Your text
          </label>
          <button
            type="button"
            onClick={() => setText("")}
            disabled={!text}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-brand hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear
          </button>
        </div>
        <textarea
          id={id}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={12}
          placeholder="Type or paste your text here…"
          className="mt-2 w-full resize-y rounded-xl border border-line-strong bg-surface p-4 text-base leading-relaxed text-ink placeholder:text-muted focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand-soft"
        />
      </div>
    </div>
  );
}
