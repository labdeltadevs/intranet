import { useMemo, useState } from "react";
import Swal from "sweetalert2";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import AreaCard from "./components/cards/AreaCard";
import PowerBIModal from "./components/modals/PowerBIModal";
import CommercialModal from "./components/modals/CommercialModal";

import areas from "./data/areas.jsx";
import biData from "./data/biReports";

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export default function App() {
  const [search, setSearch] = useState("");
  const [biOpen, setBiOpen] = useState(false);
  const [biSrc, setBiSrc] = useState("");
  const [commercialOpen, setCommercialOpen] = useState(false);

  const filteredAreas = useMemo(() => {
    const query = normalize(search);
    if (!query) return areas;
    return areas.filter((area) => {
      if (normalize(area.title).includes(query)) return true;
      if (area.desc && normalize(area.desc).includes(query)) return true;
      if (Array.isArray(area.tags)) {
        return area.tags.some((tag) => normalize(tag).includes(query));
      }
      return false;
    });
  }, [search]);

  async function showBIList() {
    if (!biData || !biData.reports || biData.reports.length === 0) {
      Swal.fire("No hay reportes", "No se encontraron reportes configurados.", "info");
      return;
    }

    const { inputOptions, reports } = biData;
    const reportsById = {};
    reports.forEach((r) => (reportsById[r.id] = r));

    const { value: selectedId } = await Swal.fire({
      title: "Selecciona un reporte visual",
      input: "select",
      inputOptions,
      inputPlaceholder: "Seleccionar...",
      showCancelButton: true,
    });

    if (selectedId === undefined || selectedId === null) return;
    const report = reportsById[selectedId];
    if (!report) return;

    const { value: pin } = await Swal.fire({
      title: `Introduce PIN para "${report.title}"`,
      input: "password",
      inputPlaceholder: "PIN",
      inputAttributes: { autocapitalize: "off", autocorrect: "off" },
      showCancelButton: true,
    });

    if (pin === undefined) return;
    if (pin === report.pin || pin === biData.MASTER_KEY) {
      setBiSrc(report.src);
      setBiOpen(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "PIN incorrecto",
        text: "Acceso denegado",
      });
    }
  }

  function handleAction(action) {
    if (action === "bi") showBIList();
    else if (action === "commercial") setCommercialOpen(true);
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Header />

      <main
        id="content"
        className="flex-1 overflow-y-auto flex flex-col items-center px-4 sm:px-6 py-4"
      >
        <Hero
          search={search}
          onSearchChange={setSearch}
          resultsCount={filteredAreas.length}
          totalCount={areas.length}
        />

        <section
          aria-labelledby="areas-title"
          className="w-full max-w-6xl"
        >
          <div className="mb-6 text-center animate-fade-in bg-white/70 backdrop-blur-xl rounded-[1.75rem] border border-white/45 p-4 shadow-[0_8px_32px_rgba(15,23,42,0.10)]">
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              {areas.filter((a) => a.status === "available").length} areas
              disponibles &middot;{" "}
              {areas.filter((a) => a.status !== "available").length} en
              desarrollo
            </p>
          </div>

          {filteredAreas.length === 0 ? (
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-[1.75rem] border border-white/45 bg-white/70 p-8 text-center backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.10)] animate-fade-in">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </div>
              <p className="text-sm text-slate-700">
                No se encontraron areas para{" "}
                <span className="font-semibold text-slate-900">
                  &ldquo;{search}&rdquo;
                </span>
              </p>
              <button
                type="button"
                onClick={() => setSearch("")}
                className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-dark"
              >
                Limpiar busqueda
              </button>
            </div>
          ) : (
            <div className="stagger grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {filteredAreas.map((area) => (
                <AreaCard key={area.id} area={area} onAction={handleAction} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      <PowerBIModal
        src={biSrc}
        title="Dashboard - Jefe de Ventas"
        open={biOpen}
        onClose={() => {
          setBiOpen(false);
          setBiSrc("");
        }}
      />

      <CommercialModal
        open={commercialOpen}
        onClose={() => setCommercialOpen(false)}
      />
    </div>
  );
}
