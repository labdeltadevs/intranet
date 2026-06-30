export default function Footer() {
  return (
    <footer className="flex-shrink-0 w-full border-t border-slate-200/50 bg-white/70 backdrop-blur-xl shadow-[0_-1px_4px_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-semibold text-slate-700">
            Laboratorios Delta S.A.
          </p>
          <p className="text-[11px] leading-5 text-slate-500">
            Casa Matriz &middot; Calle Presbitero Medina, Pasaje Tal Tal Nro. 2
            &middot; Zona Sopocachi, La Paz &mdash; Bolivia
          </p>
        </div>

        <div className="flex flex-col items-center gap-1 sm:items-end">
          <a
            href="https://laboratoriosdelta.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-slate-600 transition-colors hover:text-primary"
          >
            www.laboratoriosdelta.net
          </a>
          <p
            className="text-[11px] text-slate-400/80"
            style={{ fontStretch: "condensed" }}
          >
            &copy; {new Date().getFullYear()} Laboratorios Delta S.A. &middot;
            Intranet Corporativa
          </p>
        </div>
      </div>
    </footer>
  );
}
