import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/seo'
import FillBlankPageClient from './FillBlankPageClient'

export const metadata: Metadata = buildMetadata({
  title: 'Completar la Oración — Normas de tránsito CABA',
  description:
    'Completá oraciones sobre las normas de tránsito de CABA eligiendo la opción correcta. Ejercicios con feedback inmediato y explicaciones.',
  path: '/juegos/fill-blank',
})

export default function FillBlankPage() {
  return <FillBlankPageClient />
}
