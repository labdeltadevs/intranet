import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import PowerBIModal from "./PowerBIModal";

const ANIMATION_MS = 250;

const commercialSections = [
  {
    title: "Resumen ejecutivo",
    description:
      "Visualiza indicadores clave de ventas, oportunidades y seguimiento comercial.",
    badge: "Inicio",
  },
  {
    title: "Campañas y acciones",
    description:
      "Gestiona campañas, acciones comerciales y prioridades del equipo de ventas.",
    badge: "Planificación",
  },
  {
    title: "Clientes y cartera",
    description:
      "Monitorea clientes prioritarios, estados de cartera y próximos cierres.",
    badge: "Seguimiento",
  },
  {
    title: "Objetivos y metas",
    description:
      "Controla metas trimestrales, cumplimiento y desempeño por territorio.",
    badge: "Metas",
  },
];

const quickStats = [
  { label: "Oportunidades", value: "24" },
  { label: "Cierres este mes", value: "8" },
  { label: "Clientes activos", value: "142" },
];

const reportUrl = "";

export default function CommercialModal({ open, onClose }) {
  const [biOpen, setBiOpen] = useState(false);
  const [phase, setPhase] = useState(() => (open ? "open" : "closed"));
  const closeTimerRef = useRef(null);

  useEffect(() => {
    if (open) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      requestAnimationFrame(() => setPhase("open"));
      return undefined;
    }
    if (phase === "closed") return undefined;
    requestAnimationFrame(() => setPhase("closing"));
    closeTimerRef.current = setTimeout(() => {
      setPhase("closed");
      closeTimerRef.current = null;
    }, ANIMATION_MS);
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [open, phase]);

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    [],
  );

  if (phase === "closed") return null;

  const isVisible = phase === "open" || phase === "opening";

  return createPortal(
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center bg-black/30 p-3 transition-opacity duration-300 md:p-6 ${isVisible ? "opacity-100" : "pointer-events-none opacity-0"}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Modal Comercial"
    >
      <div
        className={`relative flex h-[90dvh] w-[90vw] flex-col overflow-hidden rounded-[2rem] border border-gray-200/50 bg-white/95 text-slate-900 shadow-2xl shadow-slate-950/10 transition-all duration-300 max-sm:h-screen max-sm:w-screen max-sm:rounded-none max-sm:border-0 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <div className="absolute right-4 top-4 z-20 flex gap-2">
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500 transition hover:bg-gray-300 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="flex h-full flex-col lg:flex-row">
          <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
            <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-sm uppercase tracking-[0.35em] text-primary">
                  Comercial
                </p>
                <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Panel de Operaciones Comerciales
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  Obten informacion clave de ventas, oportunidades y seguimiento comercial en un solo lugar.
                </p>
              </div>
            </div>

            <div className="mb-8 grid gap-4 md:grid-cols-3">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <p className="text-2xl font-semibold text-primary">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[1.5rem] border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Acceso directo al reporte BI
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Abre un informe visual con la misma experiencia del módulo de BI.
                  </p>
                </div>
                <button
                  onClick={() => setBiOpen(true)}
                  className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
                >
                  Ver Ejecucion Estrategica/Campaña
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {commercialSections.map((section) => (
                  <div
                    key={section.title}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
                  >
                    <p className="text-[11px] uppercase tracking-[0.3em] text-primary">
                      {section.badge}
                    </p>
                    <h4 className="mt-2 text-lg font-semibold text-slate-800">
                      {section.title}
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      {section.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="w-full border-t border-gray-200 bg-gray-50/80 p-6 lg:w-[320px] lg:border-l lg:border-t-0">
            <h3 className="text-lg font-semibold text-slate-900">Contenido editable</h3>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              Puedes reemplazar estos bloques por documentos, enlaces, procesos o novedades del área comercial.
            </p>

            <div className="mt-5 space-y-3">
              {[
                "Campañas activas",
                "Clientes prioritarios",
                "Metas del trimestre",
                "Canales y oportunidades",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4">
              <p className="text-sm font-semibold text-primary">Próximo paso</p>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Agrega aquí formularios, políticas, documentos o notas internas según necesites.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <PowerBIModal
        src={reportUrl}
        title="Reporte Comercial"
        open={biOpen}
        onClose={() => setBiOpen(false)}
        overlayClassName="z-[80]"
      />
    </div>,
    document.body
  );
}
