import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/seo'
import HangmanPageClient from './HangmanPageClient'

export const metadata: Metadata = buildMetadata({
  title: 'El Ahorcado Vial — Adivinar palabras del código de tránsito',
  description:
    'Jugá al ahorcado con términos del código vial de CABA. 6 intentos para adivinar la palabra con una pista como guía.',
  path: '/juegos/hangman',
})

export default function HangmanPage() {
  return <HangmanPageClient />
}
