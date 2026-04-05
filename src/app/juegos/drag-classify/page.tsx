import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/seo'
import DragClassifyPageClient from './DragClassifyPageClient'

export const metadata: Metadata = buildMetadata({
  title: 'Clasificar Señales — Reglamentaria, Preventiva, Informativa o Transitoria',
  description:
    'Clasificá señales de tránsito en su categoría correcta: reglamentaria, preventiva, informativa o transitoria. Feedback inmediato por señal.',
  path: '/juegos/drag-classify',
})

export default function DragClassifyPage() {
  return <DragClassifyPageClient />
}
