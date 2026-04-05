// === ÍNDICE DE LECCIONES ===
// Muestra la grilla con las 12 lecciones disponibles.
// LessonMap es client component (necesita useProgress).

import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/seo'
import LessonMap from '@/components/lecciones/LessonMap'

// Metadata SEO para esta página
export const metadata: Metadata = buildMetadata({
  title: 'Lecciones de tránsito CABA — 12 lecciones gratis',
  description:
    'Aprendé las normas de tránsito de Buenos Aires con 12 lecciones basadas en el Manual del Conductor oficial de CABA. Contenido actualizado para el examen 2026.',
  path: '/lecciones',
})

export default function LeccionesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      {/* Encabezado */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-vial-asphalt-dark sm:text-4xl">
          Lecciones de tránsito
        </h1>
        <p className="mt-3 text-base leading-relaxed text-vial-asphalt-light sm:text-lg">
          12 lecciones basadas en el Manual del Conductor oficial de CABA. Aprendé a tu ritmo y completá cada lección para ganar XP.
        </p>
      </div>

      {/* Grilla de lecciones */}
      <LessonMap />

    </section>
  )
}
