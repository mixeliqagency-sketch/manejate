import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/seo'
import WordSearchPageClient from './WordSearchPageClient'

export const metadata: Metadata = buildMetadata({
  title: 'Sopa de Letras Vial — Encontrá los términos del tránsito',
  description:
    'Encontrá palabras del vocabulario vial ocultas en la sopa de letras. Cuando encontrás una palabra, se revela su definición.',
  path: '/juegos/word-search',
})

export default function WordSearchPage() {
  return <WordSearchPageClient />
}
