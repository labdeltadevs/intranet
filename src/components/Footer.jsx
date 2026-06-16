export default function Footer() {
  return (
    <footer className="px-6 py-6 text-center">
      <p
        className="text-[11px] text-gray-400/60"
        style={{ fontStretch: 'condensed' }}
      >
        &copy; {new Date().getFullYear()} Laboratorios Delta S.A.
      </p>
    </footer>
  )
}
