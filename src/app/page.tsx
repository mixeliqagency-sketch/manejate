// === HOME PAGE — Página principal de Manejate ===
// Server component: ensambla las secciones de la home.

import Hero from '@/components/home/Hero'
import PathSelector from '@/components/home/PathSelector'
import AdSlot from '@/components/ui/AdSlot'
import GamesPreview from '@/components/home/GamesPreview'
import StatsCounter from '@/components/home/StatsCounter'
import SEOBlock from '@/components/home/SEOBlock'

export default function Home() {
  return (
    <>
      {/* Sección hero con fondo degradado y CTAs principales */}
      <Hero />

      {/* Selector de camino de aprendizaje — se superpone al hero */}
      <PathSelector />

      {/* Espacio publicitario header (solo si NEXT_PUBLIC_ADSENSE_ID está definido) */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <AdSlot position="header" />
      </div>

      {/* Vista previa de todos los juegos disponibles */}
      <GamesPreview />

      {/* Contadores animados de estadísticas clave */}
      <StatsCounter />

      {/* Bloque SEO con descripción del examen teórico de CABA */}
      <SEOBlock />
    </>
  )
}
