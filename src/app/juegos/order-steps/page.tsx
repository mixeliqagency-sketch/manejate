import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/seo'
import OrderStepsPageClient from './OrderStepsPageClient'

export const metadata: Metadata = buildMetadata({
  title: 'Ordenar los Pasos — Secuencias de maniobras viales',
  description:
    'Ordená correctamente los pasos de maniobras viales como sobrepasos, estacionamiento y giros. Aprende la secuencia correcta del Manual del Conductor.',
  path: '/juegos/order-steps',
})

export default function OrderStepsPage() {
  return <OrderStepsPageClient />
}
