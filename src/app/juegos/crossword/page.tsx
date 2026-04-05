import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/seo'
import CrosswordPageClient from './CrosswordPageClient'

export const metadata: Metadata = buildMetadata({
  title: 'Crucigrama Vial — Adivinar términos del tránsito',
  description:
    'Leé las definiciones y escribí la palabra correcta del vocabulario vial de CABA. Un crucigrama educativo basado en el Manual del Conductor.',
  path: '/juegos/crossword',
})

export default function CrosswordPage() {
  return <CrosswordPageClient />
}
