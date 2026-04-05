import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/seo'
import MemoryPageClient from './MemoryPageClient'

export const metadata: Metadata = buildMetadata({
  title: 'Memoria de Señales — Emparejá señales con sus significados',
  description:
    'Encontrá los pares de señales de tránsito y sus significados en este juego de memoria. Elegí la dificultad: fácil, medio o difícil.',
  path: '/juegos/memory',
})

export default function MemoryPage() {
  return <MemoryPageClient />
}
