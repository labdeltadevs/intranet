const iconProps = {
  viewBox: '0 0 32 32',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'h-10 w-10',
};

const areas = [
  {
    id: 'inicio',
    title: 'Inicio',
    desc: 'Accede a la pagina web oficial de Laboratorios DELTA S.A.',
    href: 'https://laboratoriosdelta.net/',
    external: true,
    status: 'available',
    tags: ['web', 'publica', 'portal', 'sitio', 'inicio'],
    icon: (
      <svg {...iconProps}>
        <path d="M4 12l12-9 12 9" />
        <path d="M6 10v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10" />
        <path d="M13 24v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7" />
      </svg>
    ),
  },
  {
    id: 'business-intelligence',
    title: 'Business Intelligence',
    desc: 'Analisis de datos y visualizacion para la toma de decisiones basados en nuestros ERP/CRM/MRP.',
    status: 'available',
    action: 'bi',
    tags: ['bi', 'datos', 'reportes', 'power bi', 'dashboard', 'inteligencia'],
    icon: (
      <svg {...iconProps}>
        <path d="M4 22h22" />
        <rect x="7" y="15" width="3" height="6" rx="0.5" fill="currentColor" stroke="none" />
        <rect x="13" y="10" width="3" height="11" rx="0.5" fill="currentColor" stroke="none" />
        <rect x="19" y="5" width="3" height="16" rx="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'comercial',
    title: 'Comercial',
    desc: 'Procesos comerciales, campanas, estrategias, ventas y gestion de clientes.',
    status: 'available',
    action: 'commercial',
    tags: ['ventas', 'clientes', 'campanas', 'comercial', 'estrategia'],
    icon: (
      <svg {...iconProps}>
        <path d="M7 10h20l-1.6 16H8.6L7 10z" />
        <path d="M12 10V7a4 4 0 0 1 8 0v3" />
        <circle cx="11" cy="18" r="1" fill="currentColor" stroke="none" />
        <circle cx="22" cy="18" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'recursos-humanos',
    title: 'Recursos Humanos',
    desc: 'Gestion de personal, nominas y documentacion.',
    status: 'coming_soon',
    tags: ['rrhh', 'personal', 'nomina', 'empleados', 'rh'],
    icon: (
      <svg {...iconProps}>
        <path d="M18 23v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="9" r="4" />
        <path d="M28 23v-2a4 4 0 0 0-3-3.87" />
        <path d="M22 5.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'administracion',
    title: 'Administracion',
    desc: 'Procesos financieros, compras y gestion administrativa.',
    status: 'coming_soon',
    tags: ['finanzas', 'contabilidad', 'compras', 'administracion', 'gestion'],
    icon: (
      <svg {...iconProps}>
        <path d="M18 2h-8a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
        <path d="M18 2v6h6" />
        <line x1="12" y1="14" x2="20" y2="14" />
        <line x1="12" y1="18" x2="20" y2="18" />
        <line x1="12" y1="10" x2="14" y2="10" />
      </svg>
    ),
  },
  {
    id: 'tic',
    title: 'T.I.C.',
    desc: 'Tecnologias de la informacion y comunicaciones, soporte tecnico, mantenimientos.',
    status: 'coming_soon',
    tags: ['tic', 'ti', 'soporte', 'tecnologia', 'infraestructura', 'sistemas'],
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="4" width="22" height="14" rx="2" />
        <path d="M8 22h14" />
        <path d="M15 18v4" />
        <circle cx="15" cy="18" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'marketing',
    title: 'Marketing',
    desc: 'Estrategia de marca, campanas digitales y comunicacion institucional.',
    status: 'coming_soon',
    tags: ['marketing', 'marca', 'campanas', 'digital', 'comunicacion'],
    icon: (
      <svg {...iconProps}>
        <path d="M5 11l20-8v26L5 21z" />
        <path d="M3 11h22" />
        <path d="M10 21V11" />
        <path d="M28 10l-3 6 3 6" />
      </svg>
    ),
  },
  {
    id: 'contabilidad',
    title: 'Contabilidad',
    desc: 'Registros contables, estados financieros y obligaciones tributarias.',
    status: 'coming_soon',
    tags: ['contabilidad', 'finanzas', 'tributos', 'impuestos', 'estados financieros'],
    icon: (
      <svg {...iconProps}>
        <rect x="5" y="3" width="22" height="24" rx="2" />
        <line x1="9" y1="9" x2="23" y2="9" />
        <line x1="9" y1="15" x2="23" y2="15" />
        <line x1="9" y1="21" x2="16" y2="21" />
        <circle cx="10" cy="21.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'calidad',
    title: 'Calidad y Regulatoria',
    desc: 'Buenas practicas de manufactura, normativas y certificaciones de la industria farmaceutica.',
    status: 'coming_soon',
    tags: ['calidad', 'regulatoria', 'normativa', 'farmaceutica', 'bpm', 'certificaciones'],
    icon: (
      <svg {...iconProps}>
        <path d="M16 3l10 5v7c0 8-5 13-10 15-5-2-10-7-10-15V8l10-5z" />
        <path d="M12 18l3 3 6-6" />
        <path d="M16 3v2l8 4" fill="none" stroke="none" />
      </svg>
    ),
  },
];

export default areas;
