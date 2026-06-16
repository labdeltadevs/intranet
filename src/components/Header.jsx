export default function Header() {
  return (
    <header className="px-6 py-5">
      <div className="max-w-6xl mx-auto flex items-center gap-3">
        <span className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark block shrink-0" />
        <span
          className="text-sm font-bold text-dark/70 tracking-tight uppercase"
          style={{ fontStretch: 'condensed' }}
        >
          Laboratorios Delta
        </span>
      </div>
    </header>
  )
}
