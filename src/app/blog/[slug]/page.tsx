// === PÁGINA DE ARTÍCULO DE BLOG ===
// Ruta dinámica: /blog/[slug]
// Por ahora incluye el artículo completo sobre el examen teórico de CABA.

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { generateMetadata as buildMetadata } from '@/lib/seo'

// Artículos disponibles con su contenido
const articles: Record<string, {
  title: string
  date: string
  readTime: string
  category: string
  description: string
  content: React.ReactNode
}> = {
  'como-es-el-examen-teorico-de-manejo-caba-2026': {
    title: 'Cómo es el examen teórico de manejo en CABA 2026',
    date: '2026-04-01',
    readTime: '5 min',
    category: 'Examen',
    description:
      'Todo lo que necesitás saber antes de ir a rendir el examen teórico de manejo en la Ciudad de Buenos Aires en 2026.',
    content: (
      <div className="lesson-content">
        <p>
          Antes de poder salir a manejar de forma independiente en la Ciudad de Buenos Aires, es obligatorio aprobar el <strong>examen teórico de tránsito</strong>. Acá te explicamos todo lo que necesitás saber para prepararte bien.
        </p>

        <h2>¿En qué consiste el examen?</h2>
        <p>
          El examen teórico evalúa el conocimiento de las normas de tránsito vigentes en CABA, basadas principalmente en la <strong>Ley 2148 de la Ciudad Autónoma de Buenos Aires</strong>. Se rinde en los Centros de Atención y Renovación de Licencias habilitados por el Gobierno de la Ciudad.
        </p>
        <p>
          El examen es de opción múltiple y se toma de forma digital (en computadora) en la mayoría de los centros. Consiste en una serie de preguntas con cuatro opciones de respuesta, donde solo una es correcta.
        </p>

        <h2>¿Cuántas preguntas tiene?</h2>
        <p>
          El examen estándar consta de <strong>30 preguntas de opción múltiple</strong>. Cada pregunta tiene exactamente cuatro opciones y solo una es la respuesta correcta.
        </p>

        <h2>¿Cuánto tiempo se tiene para responder?</h2>
        <p>
          Se cuenta con <strong>45 minutos</strong> en total para completar las 30 preguntas. No hay un tiempo límite por pregunta, por lo que podés distribuir el tiempo como prefieras.
        </p>

        <h2>¿Con qué puntaje se aprueba?</h2>
        <p>
          El puntaje de aprobación es de <strong>70%</strong>, lo que equivale a responder correctamente al menos 21 de las 30 preguntas. Si se obtiene menos del 70%, el examen se considera desaprobado.
        </p>

        <h2>¿Qué pasa si no aprobás?</h2>
        <p>
          Si no aprobás el examen teórico, podés volver a rendirlo. Generalmente se puede reintentar después de un período determinado. El objetivo es que el solicitante estudie bien el material antes de volver a intentarlo.
        </p>
        <p>
          No hay un límite establecido de intentos, pero es importante estar bien preparado antes de ir a rendir para evitar demoras innecesarias.
        </p>

        <h2>¿De qué temas te van a preguntar?</h2>
        <p>
          Las preguntas del examen cubren los temas del <strong>Manual del Conductor CABA</strong>, que es la guía oficial. Los temas más frecuentes incluyen:
        </p>
        <ul>
          <li><strong>Prioridad normativa</strong> — el orden de prioridad entre agentes, señales transitorias, semáforos y señalización vertical</li>
          <li><strong>Semáforos</strong> — significado de cada color y tipo de luz</li>
          <li><strong>Señalización vial</strong> — señales reglamentarias, preventivas e informativas</li>
          <li><strong>Prioridad de paso</strong> — intersecciones, rotondas, emergencias</li>
          <li><strong>Velocidades</strong> — límites máximos y mínimos, distancia de seguridad</li>
          <li><strong>Estacionamiento</strong> — formas permitidas, cordones, prohibiciones</li>
          <li><strong>Conducción especial</strong> — lluvia, niebla, autopistas</li>
          <li><strong>El conductor responsable</strong> — celular, alcohol, distracciones</li>
        </ul>

        <h2>Consejos para prepararte</h2>
        <ul>
          <li><strong>Estudiá el manual oficial</strong>: el contenido del examen viene directamente del Manual del Conductor CABA 2019. No hay preguntas que estén fuera de ese material.</li>
          <li><strong>Practicá con simulacros</strong>: hacer exámenes de práctica en las mismas condiciones (30 preguntas, 45 minutos) te permite acostumbrarte al formato.</li>
          <li><strong>Prestá atención a los detalles</strong>: muchas preguntas del examen son sobre detalles específicos, como el tiempo de reacción a 90 km/h, la distancia mínima de seguridad, o el significado exacto de cada color de cordón.</li>
          <li><strong>Aprendé los colores y formas</strong>: las señales de tránsito tienen formas y colores específicos que es necesario conocer.</li>
        </ul>

        <h2>¿Dónde rendís el examen?</h2>
        <p>
          Los exámenes teóricos se rinden en los <strong>Centros de Atención de Licencias de Conducir</strong> del Gobierno de la Ciudad de Buenos Aires. Podés consultar la lista actualizada de centros habilitados en el sitio oficial de GCBA (buenosaires.gob.ar).
        </p>
        <p>
          Generalmente se requiere turno previo. Asegurate de llevar toda la documentación necesaria para la habilitación (DNI, certificado de aptitud psicofísica, entre otros).
        </p>
      </div>
    ),
  },

  'velocidades-maximas-caba': {
    title: 'Velocidades máximas en CABA: todo lo que necesitás saber',
    date: '2026-04-03',
    readTime: '4 min',
    category: 'Normas',
    description:
      'Límites de velocidad en calles, avenidas y autopistas de la Ciudad de Buenos Aires según la Ley 2148.',
    content: (
      <div className="lesson-content">
        <p>
          Conocer los límites de velocidad no es solo para aprobar el examen: es una responsabilidad que puede salvar vidas. Te explicamos los límites vigentes en CABA según la Ley 2148.
        </p>
        <p>
          Este artículo está en preparación. Volvé pronto para leer el contenido completo.
        </p>
      </div>
    ),
  },

  'señales-de-transito-tipos-y-significados': {
    title: 'Las señales de tránsito: tipos, formas y colores',
    date: '2026-04-05',
    readTime: '6 min',
    category: 'Señalización',
    description:
      'Guía completa sobre señales reglamentarias, preventivas e informativas en CABA.',
    content: (
      <div className="lesson-content">
        <p>
          Entender las señales de tránsito es fundamental para circular de forma segura. Te explicamos los cuatro tipos de señales y cómo reconocerlas.
        </p>
        <p>
          Este artículo está en preparación. Volvé pronto para leer el contenido completo.
        </p>
      </div>
    ),
  },
}

// Genera rutas estáticas para los artículos disponibles
export async function generateStaticParams() {
  return Object.keys(articles).map(slug => ({ slug }))
}

// Metadata dinámica por artículo
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = articles[slug]

  if (!article) {
    return { title: 'Artículo no encontrado' }
  }

  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${slug}`,
  })
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = articles[slug]

  if (!article) notFound()

  const formattedDate = new Date(article.date).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">

      {/* Breadcrumb */}
      <nav className="text-sm text-vial-asphalt-light mb-6">
        <Link href="/blog" className="hover:text-vial-blue transition-colors">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-vial-asphalt-dark line-clamp-1">{article.title}</span>
      </nav>

      {/* Encabezado del artículo */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-vial-blue">
            {article.category}
          </span>
          <span className="text-xs text-vial-asphalt-light">{formattedDate}</span>
          <span className="text-xs text-vial-asphalt-light">· {article.readTime} de lectura</span>
        </div>

        <h1 className="text-2xl font-bold text-vial-asphalt-dark sm:text-3xl leading-tight mb-3">
          {article.title}
        </h1>

        <p className="text-vial-asphalt-light leading-relaxed">
          {article.description}
        </p>
      </header>

      {/* Separador */}
      <hr className="border-vial-gray-mid mb-8" />

      {/* Contenido del artículo */}
      <div className="lesson-content text-vial-asphalt leading-relaxed">
        {article.content}
      </div>

      {/* CTA al examen */}
      <div className="mt-12 p-6 bg-vial-blue rounded-2xl text-center text-white">
        <p className="font-bold text-lg mb-2">¿Listo para practicar?</p>
        <p className="text-blue-200 text-sm mb-4">
          Probá el simulacro de examen con las mismas condiciones que el oficial: 30 preguntas en 45 minutos.
        </p>
        <Link
          href="/examenes/simulacro"
          className="inline-block bg-white text-vial-blue font-bold px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
        >
          Ir al simulacro
        </Link>
      </div>

    </article>
  )
}
