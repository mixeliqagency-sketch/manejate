// === PÁGINA DE BLOG ===
// Lista de artículos con título, descripción, fecha y link.
// Server component puro.

import type { Metadata } from 'next'
import Link from 'next/link'
import { generateMetadata as buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Blog de tránsito y manejo CABA — Consejos y guías',
  description:
    'Artículos sobre el examen teórico de manejo, normas de tránsito de Buenos Aires, consejos para conductores y todo lo que necesitás saber para obtener tu licencia.',
  path: '/blog',
})

// Artículos del blog (por ahora estáticos)
const articles = [
  {
    slug: 'como-es-el-examen-teorico-de-manejo-caba-2026',
    title: 'Cómo es el examen teórico de manejo en CABA 2026',
    excerpt:
      'Todo lo que necesitás saber antes de ir a rendir: cómo se toman las preguntas, cuánto dura, cuántas errores se pueden cometer y qué pasa si no aprobás.',
    date: '2026-04-01',
    readTime: '5 min',
    category: 'Examen',
    categoryColor: 'bg-blue-100 text-vial-blue',
  },
  {
    slug: 'velocidades-maximas-caba',
    title: 'Velocidades máximas en CABA: todo lo que necesitás saber',
    excerpt:
      'Límites de velocidad en calles, avenidas y autopistas de la Ciudad de Buenos Aires. Cuándo aplicar velocidad precautoria y cómo calcular la distancia de seguridad.',
    date: '2026-04-03',
    readTime: '4 min',
    category: 'Normas',
    categoryColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    slug: 'señales-de-transito-tipos-y-significados',
    title: 'Las señales de tránsito: tipos, formas y colores',
    excerpt:
      'Guía completa sobre señales reglamentarias, preventivas e informativas. Cómo distinguirlas por su forma y color, y qué hacer ante cada una.',
    date: '2026-04-05',
    readTime: '6 min',
    category: 'Señalización',
    categoryColor: 'bg-green-100 text-green-700',
  },
]

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">

      {/* Encabezado */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-vial-asphalt-dark sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 text-base leading-relaxed text-vial-asphalt-light">
          Artículos y guías para prepararte mejor para el examen teórico de manejo en CABA.
        </p>
      </div>

      {/* Lista de artículos */}
      <div className="space-y-6">
        {articles.map(article => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group block p-6 rounded-2xl border border-vial-gray-mid hover:border-vial-blue hover:shadow-md transition-all duration-200 bg-vial-white"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                {/* Categoría + fecha */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${article.categoryColor}`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-vial-asphalt-light">
                    {new Date(article.date).toLocaleDateString('es-AR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="text-xs text-vial-asphalt-light">· {article.readTime} de lectura</span>
                </div>

                {/* Título */}
                <h2 className="text-lg font-bold text-vial-asphalt-dark group-hover:text-vial-blue transition-colors mb-2">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-vial-asphalt-light leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
              </div>

              {/* Flecha */}
              <svg className="w-5 h-5 text-vial-asphalt-light group-hover:text-vial-blue transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
