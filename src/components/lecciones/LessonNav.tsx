// === NAVEGACIÓN ENTRE LECCIONES ===
// Muestra links a la lección anterior y siguiente al pie de cada lección.
// Servidor: solo necesita los datos del lessons-meta.json

import Link from 'next/link'
import type { Lesson } from '@/types'
import lessonsMeta from '../../../data/lessons-meta.json'

const lessons = lessonsMeta as Lesson[]

interface LessonNavProps {
  currentSlug: string
}

export default function LessonNav({ currentSlug }: LessonNavProps) {
  // Encontrar el índice de la lección actual
  const currentIndex = lessons.findIndex(l => l.slug === currentSlug)

  const prev = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const next = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null

  return (
    <nav className="mt-10 pt-8 border-t border-vial-gray-mid">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">

        {/* Lección anterior */}
        {prev ? (
          <Link
            href={`/lecciones/${prev.slug}`}
            className="group flex items-center gap-3 p-4 rounded-xl border border-vial-gray-mid hover:border-vial-blue hover:bg-blue-50 transition-colors flex-1"
          >
            {/* Flecha izquierda como SVG */}
            <svg className="w-5 h-5 text-vial-asphalt-light group-hover:text-vial-blue flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <div className="min-w-0">
              <p className="text-xs text-vial-asphalt-light group-hover:text-vial-blue transition-colors">Lección anterior</p>
              <p className="text-sm font-semibold text-vial-asphalt-dark truncate">{prev.icon} {prev.title}</p>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {/* Lección siguiente */}
        {next ? (
          <Link
            href={`/lecciones/${next.slug}`}
            className="group flex items-center gap-3 p-4 rounded-xl border border-vial-gray-mid hover:border-vial-blue hover:bg-blue-50 transition-colors flex-1 sm:text-right sm:flex-row-reverse"
          >
            {/* Flecha derecha como SVG */}
            <svg className="w-5 h-5 text-vial-asphalt-light group-hover:text-vial-blue flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <div className="min-w-0">
              <p className="text-xs text-vial-asphalt-light group-hover:text-vial-blue transition-colors">Próxima lección</p>
              <p className="text-sm font-semibold text-vial-asphalt-dark truncate">{next.icon} {next.title}</p>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

      </div>
    </nav>
  )
}
