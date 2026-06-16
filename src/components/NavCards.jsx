const cards = [
  {
    title: 'Inicio',
    desc: 'Portal principal de la intranet corporativa',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: 'Recursos Humanos',
    desc: 'Gestión del talento, nóminas y documentación',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Administrativa',
    desc: 'Gestión documental, finanzas y procesos',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: 'Sistemas',
    desc: 'Soporte técnico, infraestructura y desarrollo',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
]

export default function NavCards() {
  return (
    <>
      <h1
        className="text-4xl md:text-5xl font-bold text-dark/80 mb-2 tracking-tight"
        style={{ fontStretch: 'condensed' }}
      >
        Intranet
      </h1>
      <p className="text-xs text-gray-400 tracking-widest uppercase mb-14 md:mb-18">
        Selecciona una aplicación
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full max-w-2xl lg:max-w-4xl">
        {cards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            className="group relative flex flex-col items-center gap-3 px-6 py-8 md:py-10 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/60 hover:border-primary/30 hover:bg-white hover:shadow-lg hover:scale-[1.04] hover:z-10 transition-all duration-300"
          >
            <div className="size-11 p-2.5 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              {card.icon}
            </div>
            <span
              className="text-sm font-semibold text-dark/80 group-hover:text-primary transition-colors duration-300 leading-tight text-center"
              style={{ fontStretch: 'condensed' }}
            >
              {card.title}
            </span>
            <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-300 ease-in-out">
              <p
                className="text-[11px] text-gray-400 leading-relaxed text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75"
                style={{ fontStretch: 'condensed' }}
              >
                {card.desc}
              </p>
            </div>
          </a>
        ))}
      </div>
    </>
  )
}
