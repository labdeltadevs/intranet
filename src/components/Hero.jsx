import matraz from "../assets/matraz.png";
import SearchBar from "./SearchBar";

export default function Hero({ search, onSearchChange, resultsCount, totalCount }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative w-full max-w-5xl mx-auto mb-6 flex-shrink-0 overflow-hidden rounded-[2rem] border-2 border-white/45 bg-white/70 p-8 backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.12)] sm:p-12 animate-fade-up"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 -bottom-16 h-48 w-48 rounded-full bg-orange-300/20 blur-3xl"
      />

      <div className="relative flex flex-col items-center text-center">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
            <img
              src={matraz}
              alt=""
              aria-hidden="true"
              className="h-8 w-8 object-contain"
            />
          </span>
          <span className="text-[11px] uppercase tracking-[0.4em] text-slate-700/80">
            Intranet Corporativa
          </span>
        </div>

        <h1
          id="hero-title"
          className="text-4xl font-semibold tracking-tight text-primary sm:text-5xl md:text-6xl"
        >
          Laboratorios Delta S.A.
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
          Comprometidos con la salud de la poblacion.
        </p>

        <div className="mt-8 w-full">
          <SearchBar
            value={search}
            onChange={onSearchChange}
            resultsCount={resultsCount}
            totalCount={totalCount}
          />
        </div>

        <a
          href="https://laboratoriosdelta.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-primary"
        >
          Visitar sitio web publico
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
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>
    </section>
  );
}
