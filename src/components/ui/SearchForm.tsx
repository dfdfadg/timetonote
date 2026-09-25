import { SearchIcon } from "@/components/ui/Icons";

/**
 * Plain GET form → /search?q=. Works without JavaScript and needs no client bundle.
 */
export function SearchForm({
  defaultValue = "",
  size = "default",
  autoFocus = false,
  id = "site-search",
}: {
  defaultValue?: string;
  size?: "default" | "large";
  autoFocus?: boolean;
  id?: string;
}) {
  const large = size === "large";
  return (
    <form action="/search" method="get" role="search" className="w-full">
      <label htmlFor={id} className="sr-only">
        Search TimeToNote
      </label>
      <div
        className={`flex items-center gap-2 rounded-2xl border border-line-strong bg-surface pl-4 shadow-sm focus-within:border-brand focus-within:ring-4 focus-within:ring-brand-soft ${
          large ? "p-2" : "p-1.5"
        }`}
      >
        <SearchIcon className="shrink-0 text-muted" />
        <input
          id={id}
          name="q"
          type="search"
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          placeholder="e.g. wifi not working"
          autoComplete="off"
          enterKeyHint="search"
          maxLength={120}
          className={`min-w-0 flex-1 bg-transparent text-ink placeholder:text-muted focus:outline-none ${
            large ? "py-2.5 text-base sm:text-lg" : "py-2 text-base"
          }`}
        />
        <button
          type="submit"
          className={`shrink-0 rounded-xl bg-brand font-semibold text-on-brand hover:bg-brand-strong ${
            large ? "px-5 py-3" : "px-4 py-2"
          }`}
        >
          Search
        </button>
      </div>
    </form>
  );
}
