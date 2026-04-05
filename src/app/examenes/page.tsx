// === ÍNDICE DE EXÁMENES ===
// Muestra los 4 niveles de examen como tarjetas seleccionables.

import type { Metadata } from 'next'
import Link from 'next/link'
import { generateMetadata as buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Exámenes de tránsito CABA — 4 niveles de práctica',
  description:
    'Practicá el examen teórico de manejo de Buenos Aires con 4 niveles: fácil, medio, difícil y simulacro. Preguntas basadas en el manual oficial de CABA.',
  path: '/examenes',
})

// Configuración de cada nivel para mostrar en pantalla
const examLevels = [
  {
    nivel: 'facil',
    emoji: '🟢',
    name: 'Fácil',
    description: '10 preguntas sin tiempo límite, con feedback inmediato en cada respuesta. Ideal para empezar.',
    badge: 'Para principiantes',
    badgeColor: 'bg-green-100 text-green-700',
    borderColor: 'border-vial-green',
    hoverBg: 'hover:bg-green-50',
    questions: 10,
    time: 'Sin tiempo',
    passing: '60%',
  },
  {
    nivel: 'medio',
    emoji: '🟡',
    name: 'Medio',
    description: '20 preguntas con 30 segundos por pregunta. El resultado se muestra al final.',
    badge: 'Nivel intermedio',
    badgeColor: 'bg-yellow-100 text-yellow-700',
    borderColor: 'border-vial-yellow',
    hoverBg: 'hover:bg-yellow-50',
    questions: 20,
    time: '30 seg/pregunta',
    passing: '65%',
  },
  {
    nivel: 'dificil',
    emoji: '🔴',
    name: 'Difícil',
    description: '30 preguntas con 20 segundos por pregunta. Alta presión para prepararse bien.',
    badge: 'Desafiante',
    badgeColor: 'bg-red-100 text-red-700',
    borderColor: 'border-vial-red',
    hoverBg: 'hover:bg-red-50',
    questions: 30,
    time: '20 seg/pregunta',
    passing: '70%',
  },
  {
    nivel: 'simulacro',
    emoji: '🎓',
    name: 'Simulacro',
    description: '30 preguntas en 45 minutos totales, igual al examen oficial. Revisión detallada al final.',
    badge: 'Como el examen real',
    badgeColor: 'bg-blue-100 text-vial-blue',
    borderColor: 'border-vial-blue',
    hoverBg: 'hover:bg-blue-50',
    questions: 30,
    time: '45 minutos totales',
    passing: '70%',
  },
]

export default function ExamenesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      {/* Encabezado */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-vial-asphalt-dark sm:text-4xl">
          Exámenes de práctica
        </h1>
        <p className="mt-3 text-base leading-relaxed text-vial-asphalt-light sm:text-lg">
          Ponete a prueba con 4 niveles. El simulacro reproduce las condiciones del examen oficial de CABA.
        </p>
      </div>

      {/* Grilla de niveles */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {examLevels.map(exam => (
          <Link
            key={exam.nivel}
            href={`/examenes/${exam.nivel}`}
            className={`group block p-6 rounded-2xl border-2 ${exam.borderColor} ${exam.hoverBg} transition-all duration-200 hover:-translate-y-1 hover:shadow-md bg-vial-white`}
          >
            {/* Encabezado de la tarjeta */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{exam.emoji}</span>
                <div>
                  <h2 className="text-xl font-bold text-vial-asphalt-dark">{exam.name}</h2>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${exam.badgeColor}`}>
                    {exam.badge}
                  </span>
                </div>
              </div>

              {/* Flecha derecha */}
              <svg className="w-5 h-5 text-vial-asphalt-light group-hover:text-vial-blue transition-colors mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Descripción */}
            <p className="text-sm text-vial-asphalt-light leading-relaxed mb-4">
              {exam.description}
            </p>

            {/* Stats del examen */}
            <div className="flex flex-wrap gap-3 text-xs">
              <div className="flex items-center gap-1.5 bg-vial-gray-light px-3 py-1.5 rounded-full">
                <svg className="w-3.5 h-3.5 text-vial-asphalt-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-vial-asphalt">{exam.questions} preguntas</span>
              </div>
              <div className="flex items-center gap-1.5 bg-vial-gray-light px-3 py-1.5 rounded-full">
                <svg className="w-3.5 h-3.5 text-vial-asphalt-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-vial-asphalt">{exam.time}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-vial-gray-light px-3 py-1.5 rounded-full">
                <svg className="w-3.5 h-3.5 text-vial-asphalt-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-vial-asphalt">Aprobás con {exam.passing}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Info adicional */}
      <p className="mt-8 text-center text-sm text-vial-asphalt-light">
        Todas las preguntas están basadas en el Manual del Conductor CABA 2019 (Ley 2148).
      </p>
    </section>
  )
}
