export default function SearchBar({ value, onChange, resultsCount, totalCount }) {
  const hasQuery = value && value.trim().length > 0;
  const showCount = typeof resultsCount === "number" && hasQuery;

  return (
    <div className="w-full max-w-xl mx-auto">
      <label htmlFor="area-search" className="sr-only">
        Buscar un area o aplicacion
      </label>
      <div className="group relative flex items-center">
        <span className="pointer-events-none absolute left-4 flex h-5 w-5 items-center justify-center text-slate-400 transition-colors group-focus-within:text-primary">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </span>

        <input
          id="area-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Buscar un area o aplicacion..."
          autoComplete="off"
          spellCheck="false"
          className="w-full rounded-full border border-white/50 bg-white/70 py-3 pl-12 pr-12 text-sm text-slate-800 placeholder-slate-400 shadow-sm backdrop-blur-xl transition-all focus:border-primary/60 focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />

        {hasQuery && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Limpiar busqueda"
            className="absolute right-3 flex h-7 w-7 items-center justify-center rounded-full bg-slate-200/70 text-slate-500 transition hover:bg-slate-300 hover:text-slate-700"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {showCount && (
        <p className="mt-2 text-center text-xs text-slate-500">
          {resultsCount} de {totalCount} areas
        </p>
      )}
    </div>
  );
}
