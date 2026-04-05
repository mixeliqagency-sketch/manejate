'use client'

// === MAPA DE LECCIONES ===
// Grilla de tarjetas que muestra las 12 lecciones disponibles.
// Las lecciones completadas muestran un tilde verde.
// Enlaza a /lecciones/[slug]

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Lesson } from '@/types'
import { useProgress } from '@/context/ProgressContext'
import lessonsMeta from '../../../data/lessons-meta.json'

const lessons = lessonsMeta as Lesson[]

export default function LessonMap() {
  const { progress } = useProgress()

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {lessons.map((lesson, index) => {
        const isCompleted = progress.completedLessons.includes(lesson.slug)

        return (
          <motion.div
            key={lesson.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <Link href={`/lecciones/${lesson.slug}`} className="block h-full">
              <div
                className={[
                  'h-full p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md',
                  isCompleted
                    ? 'border-vial-green bg-green-50'
                    : 'border-vial-gray-mid bg-vial-white hover:border-vial-blue',
                ].join(' ')}
              >
                {/* Encabezado: número + badge completado */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {/* Número de lección */}
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      isCompleted
                        ? 'bg-vial-green text-white'
                        : 'bg-vial-gray-light text-vial-asphalt-light'
                    }`}>
                      {String(lesson.id).padStart(2, '0')}
                    </span>
                    {/* Ícono de la lección */}
                    <span className="text-2xl">{lesson.icon}</span>
                  </div>

                  {/* Tilde de completado */}
                  {isCompleted && (
                    <svg className="w-5 h-5 text-vial-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                {/* Título */}
                <h3 className={`font-bold text-base mb-1 ${
                  isCompleted ? 'text-green-800' : 'text-vial-asphalt-dark'
                }`}>
                  {lesson.title}
                </h3>

                {/* Descripción */}
                <p className={`text-xs leading-relaxed line-clamp-2 ${
                  isCompleted ? 'text-green-700' : 'text-vial-asphalt-light'
                }`}>
                  {lesson.description}
                </p>

                {/* Temas */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {lesson.topics.slice(0, 2).map(topic => (
                    <span
                      key={topic}
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-green-100 text-green-700'
                          : 'bg-vial-gray-light text-vial-asphalt-light'
                      }`}
                    >
                      {topic}
                    </span>
                  ))}
                  {lesson.topics.length > 2 && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      isCompleted ? 'bg-green-100 text-green-700' : 'bg-vial-gray-light text-vial-asphalt-light'
                    }`}>
                      +{lesson.topics.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
