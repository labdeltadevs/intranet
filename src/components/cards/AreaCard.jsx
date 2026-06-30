import Swal from "sweetalert2";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const comingSoonCopy = {
  title: "Aplicacion en desarrollo",
  text: "Esta area se encuentra en construccion y estara disponible proximamente.",
  confirmButtonText: "Entendido",
};

export default function AreaCard({ area, onAction }) {
  const isAvailable = area.status === "available";
  const isDisabled = !isAvailable;

  function handleClick(event) {
    if (isDisabled) {
      event.preventDefault();
      Swal.fire({
        icon: "info",
        title: comingSoonCopy.title,
        text: comingSoonCopy.text,
        confirmButtonText: comingSoonCopy.confirmButtonText,
      });
      return;
    }

    if (area.action) {
      event.preventDefault();
      onAction?.(area.action);
      return;
    }

    if (area.external) {
      return;
    }

    if (!area.href || area.href === "#") {
      event.preventDefault();
      Swal.fire({
        icon: "info",
        title: comingSoonCopy.title,
        text: comingSoonCopy.text,
        confirmButtonText: comingSoonCopy.confirmButtonText,
      });
    }
  }

  function handleKeyDown(event) {
    if (isDisabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  }

  const interactiveProps = isDisabled
    ? {
        "aria-disabled": true,
        tabIndex: -1,
        onClick: handleClick,
      }
    : {
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        role: "button",
        tabIndex: 0,
      };

  const href = isDisabled ? undefined : area.href || "#";
  const target = area.external ? "_blank" : undefined;
  const rel = area.external ? "noopener noreferrer" : undefined;

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={`${area.title} - ${isAvailable ? "disponible" : "en desarrollo"}`}
      className={cn(
        "group relative block h-full overflow-hidden rounded-[1.75rem] border p-5 text-center transition-all duration-300 backdrop-blur-xl sm:p-6 sm:text-left",
        isDisabled
          ? "border-white/30 bg-white/60 opacity-60 grayscale cursor-not-allowed"
          : "border-white/60 bg-white/85 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-primary/30 hover:bg-white/90 hover:shadow-[0_20px_80px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2",
      )}
      {...interactiveProps}
    >
      {isDisabled && (
        <span className="pointer-events-none absolute right-1 top-1 inline-flex items-center gap-1 rounded-full bg-amber-100/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-800 shadow-sm sm:right-4 sm:top-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v6" />
            <path d="M12 17h.01" />
          </svg>
          En desarrollo
        </span>
      )}

      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:gap-5 sm:text-left">
        <div
          className={cn(
            "flex-shrink-0 flex items-center justify-center rounded-2xl transition-all duration-300 h-18 w-18",
            isDisabled
              ? "bg-slate-200/60 text-slate-400"
              : "bg-gradient-to-br from-primary/20 to-primary/5 text-primary group-hover:bg-primary group-hover:from-primary group-hover:to-primary-dark group-hover:text-white group-hover:scale-105",
          )}
        >
          <div className="flex h-10 w-10 items-center justify-center">
            {area.icon}
          </div>
        </div>

        <div className="mt-4 space-y-2 sm:mt-0 sm:pt-1">
          <h3
            className={cn(
              "text-lg font-semibold tracking-tight sm:text-xl",
              isDisabled ? "text-slate-700" : "text-slate-900",
            )}
          >
            {area.title}
          </h3>

          <p
            className={cn(
              "max-w-xs text-sm leading-6",
              isDisabled ? "text-slate-500" : "text-slate-600",
            )}
          >
            {area.desc}
          </p>
        </div>
      </div>
    </a>
  );
}
