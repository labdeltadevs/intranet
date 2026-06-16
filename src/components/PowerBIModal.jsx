import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function PowerBIModal({ src, title = 'Power BI', open, onClose }) {
  const overlayRef = useRef(null)
  const modalRef = useRef(null)
  const iframeRef = useRef(null)
  const closeBtnRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isVisible, setIsVisible] = useState(open)
  const [shouldRender, setShouldRender] = useState(open)
  const [iframeSrc, setIframeSrc] = useState(open ? src : '')

  useEffect(() => {
    if (open) {
      setShouldRender(true)
      requestAnimationFrame(() => setIsVisible(true))
      setLoading(true)
      setError(false)
      setIframeSrc(src)
      setTimeout(() => closeBtnRef.current?.focus(), 50)
    } else if (shouldRender) {
      setIsVisible(false)
      const timeout = window.setTimeout(() => setShouldRender(false), 250)
      return () => window.clearTimeout(timeout)
    }
    return undefined
  }, [open, src, shouldRender])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  function onOverlayClick(e) {
    if (e.target === overlayRef.current) onClose()
  }

  function onIframeLoad() {
    setLoading(false)
    setError(false)
  }

  function onIframeError() {
    setLoading(false)
    setError(true)
  }

  function retryLoad() {
    setLoading(true)
    setError(false)
    setIframeSrc('')
    setTimeout(() => setIframeSrc(src), 100)
  }

  function enterFullscreen() {
    const el = modalRef.current
    if (!el) return
    if (el.requestFullscreen) el.requestFullscreen()
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
  }

  if (!shouldRender) return null

  return createPortal(
    <div
      ref={overlayRef}
      onClick={onOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-label={title}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-opacity duration-250 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        ref={modalRef}
        className={`relative w-[90%] h-[85%] bg-white/95 rounded-3xl shadow-2xl overflow-hidden border border-white/70 transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <button
            ref={closeBtnRef}
            onClick={enterFullscreen}
            className="bg-white/90 px-3 py-2 rounded-full text-sm font-medium border border-gray-200 shadow-sm hover:bg-white"
          >
            Pantalla completa
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-3 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-red-700"
          >
            Cerrar
          </button>
        </div>

        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 backdrop-blur-sm">
            <div className="rounded-full bg-white/90 px-4 py-2 shadow">Cargando informe...</div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-20 gap-4 p-6">
            <p className="text-center text-sm text-gray-700">No se pudo cargar el informe. Verifica tu conexión o intenta más tarde.</p>
            <div className="flex gap-2">
              <button onClick={retryLoad} className="px-4 py-2 bg-primary text-white rounded-full shadow-sm hover:bg-primary-dark">Reintentar</button>
              <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">Cerrar</button>
            </div>
          </div>
        )}

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
      </div>
    </div>,
    document.body
  )
}
