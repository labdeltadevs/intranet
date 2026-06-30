import { useEffect, useState } from "react";
import matraz from "../assets/matraz.png";

const formatter = new Intl.DateTimeFormat("es-BO", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatNow(date) {
  return formatter.format(date);
}

export default function Header() {
  const [now, setNow] = useState(() => formatNow(new Date()));

  useEffect(() => {
    const tick = setInterval(() => {
      setNow(formatNow(new Date()));
    }, 30_000);
    return () => clearInterval(tick);
  }, []);

  return (
    <header className="flex-shrink-0 w-full border-b border-slate-200/50 bg-white/75 backdrop-blur-xl shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-3">
        <a
          href="#"
          className="flex items-center gap-3 text-slate-800 transition-colors hover:text-primary"
          aria-label="Inicio - Laboratorios Delta S.A."
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
            <img
              src={matraz}
              alt=""
              aria-hidden="true"
              className="h-6 w-6 object-contain"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">
              Laboratorios Delta
            </span>
          </span>
        </a>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-white/50 bg-white/60 px-3 py-1.5 text-xs text-slate-600 backdrop-blur-md sm:flex">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.18)]"
            />
            <span className="font-medium">Equipo conectado</span>
          </div>

          <div
            className="flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-3 py-1.5 text-xs font-medium text-slate-700 backdrop-blur-md"
            aria-label={`Hora actual ${now}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 text-slate-500"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <span className="tabular-nums">{now}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
