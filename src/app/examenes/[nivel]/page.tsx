// === PÁGINA DE EXAMEN POR NIVEL ===
// Ruta dinámica: /examenes/[nivel]
// Monta el ExamEngine con el nivel correspondiente.

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateMetadata as buildMetadata } from '@/lib/seo'
import type { ExamLevel } from '@/types'
import ExamEngine from '@/components/examenes/ExamEngine'

// Niveles válidos
const VALID_LEVELS: ExamLevel[] = ['facil', 'medio', 'dificil', 'simulacro']

// Información de display por nivel
const levelInfo: Record<ExamLevel, { name: string; description: string }> = {
  facil:     { name: 'Fácil', description: '10 preguntas sin tiempo. Feedback inmediato.' },
  medio:     { name: 'Medio', description: '20 preguntas con 30 segundos por pregunta.' },
  dificil:   { name: 'Difícil', description: '30 preguntas con 20 segundos por pregunta.' },
  simulacro: { name: 'Simulacro oficial', description: '30 preguntas en 45 minutos totales.' },
}

// Genera las páginas estáticas para los 4 niveles
export async function generateStaticParams() {
  return VALID_LEVELS.map(nivel => ({ nivel }))
}

// Metadata dinámica por nivel
export async function generateMetadata({
  params,
}: {
  params: Promise<{ nivel: string }>
}): Promise<Metadata> {
  const { nivel } = await params

  if (!VALID_LEVELS.includes(nivel as ExamLevel)) {
    return { title: 'Nivel no encontrado' }
  }

  const info = levelInfo[nivel as ExamLevel]

  return buildMetadata({
    title: `Examen ${info.name} de tránsito CABA`,
    description: `${info.description} Preparate para el examen teórico de manejo de Buenos Aires.`,
    path: `/examenes/${nivel}`,
  })
}

export default async function ExamenNivelPage({
  params,
}: {
  params: Promise<{ nivel: string }>
}) {
  const { nivel } = await params

  // Validar que el nivel sea uno de los 4 válidos
  if (!VALID_LEVELS.includes(nivel as ExamLevel)) {
    notFound()
  }

  const examLevel = nivel as ExamLevel
  const info = levelInfo[examLevel]

  return (
    <div>
      {/* Encabezado de la página (server) */}
      <div className="bg-vial-gray-light border-b border-vial-gray-mid px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-lg font-bold text-vial-asphalt-dark">
            Examen — {info.name}
          </h1>
          <p className="text-sm text-vial-asphalt-light">{info.description}</p>
        </div>
      </div>

      {/* Motor del examen (client) */}
      <ExamEngine nivel={examLevel} />
    </div>
  )
}
