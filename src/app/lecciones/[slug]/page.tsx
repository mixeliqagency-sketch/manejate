// === PÁGINA DE LECCIÓN INDIVIDUAL ===
// Ruta dinámica: /lecciones/[slug]
// Genera páginas estáticas para las 12 lecciones.
// Muestra: badge de número, título, descripción, contenido, MiniQuiz, LessonNav.

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateMetadata as buildMetadata } from '@/lib/seo'
import type { Lesson, QuizQuestion } from '@/types'
import lessonsMeta from '../../../../data/lessons-meta.json'
import quizData from '../../../../data/quiz.json'
import { getLessonContent } from '@/content/lessons'
import MiniQuiz from '@/components/lecciones/MiniQuiz'
import LessonNav from '@/components/lecciones/LessonNav'
import CompleteLessonButton from '@/components/lecciones/CompleteLessonButton'

const lessons = lessonsMeta as Lesson[]
const allQuestions = quizData as QuizQuestion[]

// Genera los parámetros estáticos para todas las lecciones
export async function generateStaticParams() {
  return lessons.map(lesson => ({ slug: lesson.slug }))
}

// Genera metadata dinámica para cada lección
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const lesson = lessons.find(l => l.slug === slug)

  if (!lesson) {
    return { title: 'Lección no encontrada' }
  }

  return buildMetadata({
    title: `${lesson.title} — Lección ${lesson.id} de tránsito CABA`,
    description: lesson.description,
    path: `/lecciones/${lesson.slug}`,
  })
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Buscar la lección por slug
  const lesson = lessons.find(l => l.slug === slug)
  if (!lesson) notFound()

  // Obtener el contenido de la lección
  const lessonContent = getLessonContent(slug)
  if (!lessonContent) notFound()

  // Filtrar preguntas del mini quiz para esta lección
  const quizQuestions = allQuestions.filter(q => q.lessonSlug === slug)

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">

      {/* Breadcrumb */}
      <nav className="text-sm text-vial-asphalt-light mb-6">
        <a href="/lecciones" className="hover:text-vial-blue transition-colors">
          Lecciones
        </a>
        <span className="mx-2">/</span>
        <span className="text-vial-asphalt-dark">{lesson.title}</span>
      </nav>

      {/* Encabezado de la lección */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          {/* Badge número de lección */}
          <span className="text-xs font-bold bg-vial-blue text-white px-3 py-1 rounded-full">
            Lección {String(lesson.id).padStart(2, '0')}
          </span>
          {/* Ícono */}
          <span className="text-3xl" role="img" aria-label={lesson.title}>
            {lesson.icon}
          </span>
        </div>

        <h1 className="text-2xl font-bold text-vial-asphalt-dark sm:text-3xl mb-3">
          {lesson.title}
        </h1>

        <p className="text-vial-asphalt-light leading-relaxed">
          {lesson.description}
        </p>

        {/* Lista de temas */}
        <div className="mt-4 flex flex-wrap gap-2">
          {lesson.topics.map(topic => (
            <span
              key={topic}
              className="text-xs px-3 py-1 bg-blue-50 text-vial-blue rounded-full border border-blue-100"
            >
              {topic}
            </span>
          ))}
        </div>
      </header>

      {/* Separador */}
      <hr className="border-vial-gray-mid mb-8" />

      {/* Contenido de la lección */}
      <div className="lesson-content text-vial-asphalt leading-relaxed">
        {lessonContent.content}
      </div>

      {/* Separador */}
      <hr className="border-vial-gray-mid my-8" />

      {/* Botón completar lección */}
      <div className="flex justify-center mb-8">
        <CompleteLessonButton slug={slug} />
      </div>

      {/* Mini quiz (solo si hay preguntas para esta lección) */}
      {quizQuestions.length > 0 && (
        <MiniQuiz questions={quizQuestions} lessonSlug={slug} />
      )}

      {/* Navegación entre lecciones */}
      <LessonNav currentSlug={slug} />

    </article>
  )
}
