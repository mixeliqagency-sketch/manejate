import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/seo'
import RoadSituationPageClient from './RoadSituationPageClient'

export const metadata: Metadata = buildMetadata({
  title: 'Situaciones Viales — Respondé ante escenarios reales de tránsito',
  description:
    'Respondé preguntas basadas en situaciones reales del tránsito de CABA. Aprende a reaccionar correctamente ante cada escenario vial.',
  path: '/juegos/road-situation',
})

export default function RoadSituationPage() {
  return <RoadSituationPageClient />
}
