// === PÁGINA DE PROGRESO ===
// Muestra el nivel actual, badges, racha y estadísticas del usuario.

import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/seo'
import LevelDisplay from '@/components/progreso/LevelDisplay'
import BadgeGrid from '@/components/progreso/BadgeGrid'
import StreakAndStats from '@/components/progreso/StreakAndStats'

export const metadata: Metadata = buildMetadata({
  title: 'Mi progreso — Estadísticas y logros',
  description:
    'Revisá tu nivel, insignias ganadas, racha de estudio y estadísticas de progreso en Manejate.',
  path: '/progreso',
})

export default function ProgresoPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">

      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-vial-asphalt-dark">Mi progreso</h1>
        <p className="text-vial-asphalt-light mt-1">
          Tu historial de estudio, nivel actual e insignias desbloqueadas.
        </p>
      </div>

      {/* Sección nivel y XP */}
      <div className="mb-6">
        <LevelDisplay />
      </div>

      {/* Racha y estadísticas generales */}
      <div className="mb-8">
        <StreakAndStats />
      </div>

      {/* Grilla de badges */}
      <BadgeGrid />

    </section>
  )
}
