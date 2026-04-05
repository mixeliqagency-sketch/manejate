// === SITEMAP.XML DINÁMICO ===
// Genera el sitemap con todas las rutas del sitio.
// Next.js lo sirve automáticamente en /sitemap.xml

import type { MetadataRoute } from 'next'
import type { Lesson } from '@/types'
import lessonsMeta from '../../data/lessons-meta.json'

const lessons = lessonsMeta as Lesson[]

// URL base del sitio
const BASE_URL = 'https://manejate.com.ar'

// Tipos de juegos disponibles
const gameTypes = [
  'quiz',
  'memory',
  'true-or-false',
  'fill-blank',
  'crossword',
  'word-search',
  'drag-classify',
  'hangman',
  'road-situation',
  'exam-simulator',
  'order-steps',
]

// Niveles de examen disponibles
const examLevels = ['facil', 'medio', 'dificil', 'simulacro']

// Slugs de artículos del blog disponibles
const blogSlugs = [
  'como-es-el-examen-teorico-de-manejo-caba-2026',
  'velocidades-maximas-caba',
  'señales-de-transito-tipos-y-significados',
]

export default function sitemap(): MetadataRoute.Sitemap {
  // Fecha de última modificación (hoy)
  const lastModified = new Date()

  return [
    // Página principal
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // Sección Lecciones
    {
      url: `${BASE_URL}/lecciones`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Cada lección individual
    ...lessons.map(lesson => ({
      url: `${BASE_URL}/lecciones/${lesson.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    // Sección Juegos
    {
      url: `${BASE_URL}/juegos`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Cada juego individual
    ...gameTypes.map(type => ({
      url: `${BASE_URL}/juegos/${type}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // Sección Exámenes
    {
      url: `${BASE_URL}/examenes`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Cada nivel de examen
    ...examLevels.map(nivel => ({
      url: `${BASE_URL}/examenes/${nivel}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // Progreso
    {
      url: `${BASE_URL}/progreso`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.5,
    },

    // Blog
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Cada artículo del blog
    ...blogSlugs.map(slug => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
