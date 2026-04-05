// Footer — componente de servidor (no client)
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-vial-asphalt-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

        {/* Grilla de 3 columnas */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">

          {/* Columna 1: Marca y descripción */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-vial-blue">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <circle cx="9" cy="9" r="6" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M9 5v4l2.5 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-lg font-bold tracking-tight">Manejate</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Aprendé las normas de tránsito de CABA de forma interactiva, con juegos y exámenes que te preparan de verdad.
            </p>
          </div>

          {/* Columna 2: Aprender */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Aprender
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/lecciones" className="text-sm text-white/70 hover:text-vial-yellow transition-colors">
                  Lecciones
                </Link>
              </li>
              <li>
                <Link href="/juegos" className="text-sm text-white/70 hover:text-vial-yellow transition-colors">
                  Juegos
                </Link>
              </li>
              <li>
                <Link href="/examenes" className="text-sm text-white/70 hover:text-vial-yellow transition-colors">
                  Exámenes
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Recursos */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Recursos
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/blog" className="text-sm text-white/70 hover:text-vial-yellow transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/progreso" className="text-sm text-white/70 hover:text-vial-yellow transition-colors">
                  Mi Progreso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40 leading-relaxed max-w-xl">
            Contenido basado en el Manual del Conductor CABA 2019 (Ley 2148). No reemplaza la formación oficial.
          </p>
          <p className="text-xs text-white/30 mt-2 sm:mt-0 shrink-0">
            Un proyecto de Mixeliq
          </p>
        </div>
      </div>
    </footer>
  )
}
