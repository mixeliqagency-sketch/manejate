import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/seo'
import ExamSimulatorPageClient from './ExamSimulatorPageClient'

export const metadata: Metadata = buildMetadata({
  title: 'Simulacro de Examen — 30 preguntas en 45 minutos',
  description:
    'Simulacro completo del examen teórico de conducir en CABA. 30 preguntas, 45 minutos, necesitás 70% para aprobar. Sin feedback hasta el final.',
  path: '/juegos/exam-simulator',
})

export default function ExamSimulatorPage() {
  return <ExamSimulatorPageClient />
}
