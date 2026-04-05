// === SEO BLOCK — Bloque de texto para SEO (Server Component) ===
// Sin 'use client' — se renderiza en el servidor para mejor indexación.
// Explica el examen teórico de CABA y el propósito de Manejate.

export default function SEOBlock() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Título principal */}
        <h2 className="text-2xl font-bold tracking-tight text-vial-asphalt-dark sm:text-3xl">
          ¿Cómo es el examen teórico de manejo en CABA?
        </h2>

        {/* Párrafo 1: descripción del examen oficial */}
        <p className="mt-6 text-base leading-8 text-vial-asphalt">
          El examen teórico de conducir en la Ciudad Autónoma de Buenos Aires (CABA) evalúa el
          conocimiento de las normas de tránsito establecidas en la{' '}
          <strong>Ley 2148 de Tránsito y Transporte de CABA</strong>. El test consta de preguntas de
          opción múltiple que abarcan señales de tránsito, prioridades de paso, límites de
          velocidad, estacionamiento, comportamiento ante emergencias y conducción responsable.
          Para aprobarlo es necesario responder correctamente la mayoría de las preguntas dentro
          del tiempo asignado.
        </p>

        {/* Párrafo 2: cómo ayuda Manejate */}
        <p className="mt-4 text-base leading-8 text-vial-asphalt">
          Manejate es una plataforma gratuita que te permite prepararte para ese examen de forma
          dinámica y efectiva. A través de 11 juegos interactivos, 12 lecciones temáticas y
          simulacros de examen con distintos niveles de dificultad, podés repasar todo el contenido
          necesario sin aburrirte. La plataforma registra tu progreso, te otorga puntos de
          experiencia (XP) y te desafía a mejorar tu racha de respuestas correctas.
        </p>

        {/* Párrafo 3: fuente del contenido */}
        <p className="mt-4 text-base leading-8 text-vial-asphalt">
          Todo el contenido de Manejate está basado en el{' '}
          <strong>Manual del Conductor de CABA 2019</strong>, la publicación oficial que resume las
          normas de la Ley 2148. Las preguntas, definiciones y situaciones de tránsito que
          encontrarás en los juegos y exámenes reflejan fielmente lo que se evalúa en los centros
          de licencias de la Ciudad de Buenos Aires.
        </p>
      </div>
    </section>
  )
}
