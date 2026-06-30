import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ANIMATION_MS = 250;
const LOADING_TIMEOUT_MS = 10000;

function getInitialPhase(open) {
  return open ? "open" : "closed";
}

export default function PowerBIModal({
  src,
  title = "Power BI",
  open,
  onClose,
  overlayClassName = "",
}) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const iframeRef = useRef(null);
  const closeBtnRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [phase, setPhase] = useState(() => getInitialPhase(open));
  const [iframeSrc, setIframeSrc] = useState(open ? src : "");
  const [configUrl, setConfigUrl] = useState("");
  const [showConfig, setShowConfig] = useState(!src);
  const closeTimerRef = useRef(null);
  const isOpenRef = useRef(open);

  useEffect(() => {
    if (open) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      requestAnimationFrame(() => {
        setLoading(true);
        setError(false);
        setShowConfig(!src);
        if (src) setIframeSrc(src);
        setPhase("open");
      });
      isOpenRef.current = true;
      const focusTimer = setTimeout(() => closeBtnRef.current?.focus(), 50);
      return () => clearTimeout(focusTimer);
    }

    if (!isOpenRef.current) return undefined;
    isOpenRef.current = false;

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
  }, [open, src]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (loading && iframeSrc) {
      const timer = setTimeout(() => setLoading(false), LOADING_TIMEOUT_MS);
      return () => clearTimeout(timer);
    }
  }, [loading, iframeSrc]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    [],
  );

  function loadConfigUrl() {
    const trimmed = configUrl.trim();
    if (!trimmed) return;
    setShowConfig(false);
    setLoading(true);
    setError(false);
    setIframeSrc(trimmed);
  }

  function onOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  function onIframeLoad() {
    setLoading(false);
    setError(false);
  }

  function onIframeError() {
    setLoading(false);
    setError(true);
  }

  function retryLoad() {
    setLoading(true);
    setError(false);
    setIframeSrc("");
    setTimeout(() => setIframeSrc(src), 100);
  }

  function enterFullscreen() {
    const el = modalRef.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }

  if (phase === "closed") return null;

  const isVisible = phase === "open" || phase === "opening";

  return createPortal(
    <div
      ref={overlayRef}
      onClick={onOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-label={title}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-opacity duration-250 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"} ${overlayClassName}`}
    >
      <div
        ref={modalRef}
        className={`relative w-[90%] h-[85%] bg-white/95 rounded-md shadow-xl overflow-hidden border border-white/70 transform transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
          <button
            ref={closeBtnRef}
            onClick={enterFullscreen}
            aria-label="Pantalla completa"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/90 border border-gray-200 shadow-sm hover:bg-white transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-slate-700"
            >
              <path d="M4 8V4h4" />
              <path d="M20 8V4h-4" />
              <path d="M4 16v4h4" />
              <path d="M20 16v4h-4" />
            </svg>
          </button>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-red-600 text-white shadow-sm hover:bg-red-700 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 backdrop-blur-sm">
            <div className="rounded-full bg-white/90 px-4 py-2 shadow">
              <svg
                className="animate-spin h-10 w-10 text-gray-700"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            </div>
          </div>
        )}

        {showConfig && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white p-6">
            <div className="w-full max-w-lg">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-7 w-7 text-primary"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8" />
                    <path d="M12 17v4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Configurar reporte Power BI
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Pega aquí la URL de embed que proporciona Power BI.
                </p>
              </div>
              <textarea
                value={configUrl}
                onChange={(e) => setConfigUrl(e.target.value)}
                placeholder="https://app.powerbi.com/view?r=..."
                rows={3}
                className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 p-3 text-sm text-gray-700 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div className="mt-4 flex gap-3">
                <button
                  onClick={loadConfigUrl}
                  disabled={!configUrl.trim()}
                  className="flex-1 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cargar reporte
                </button>
                <button
                  onClick={onClose}
                  className="rounded-full bg-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-300"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-30 gap-4 p-6">
            <p className="text-center text-sm text-gray-700">
              No se pudo cargar el informe. Verifica tu conexión o intenta más
              tarde.
            </p>
            <div className="flex gap-2">
              <button
                onClick={retryLoad}
                className="px-4 py-2 bg-primary text-white rounded-full shadow-sm hover:bg-primary-dark"
              >
                Reintentar
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {!showConfig && (
          <iframe
            ref={iframeRef}
            title={title}
            src={iframeSrc}
            onLoad={onIframeLoad}
            onError={onIframeError}
            className="w-full h-full border-0 bg-slate-50"
            loading="lazy"
            allowFullScreen
          />
        )}
      </div>
    </div>,
    document.body,
  );
}
