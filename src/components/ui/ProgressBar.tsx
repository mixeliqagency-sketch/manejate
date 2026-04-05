'use client'

// Barra de progreso animada con Framer Motion
// Colores: blue (azul), green (verde), yellow (amarillo)
// Tamaños: sm (h-2), md (h-3)

import { motion, type Easing } from 'framer-motion'

const EASE_OUT: Easing = 'easeOut'

type BarColor = 'blue' | 'green' | 'yellow'
type BarSize = 'sm' | 'md'

interface ProgressBarProps {
  value: number           // 0 a 100
  color?: BarColor
  size?: BarSize
  showLabel?: boolean
  label?: string
  className?: string
}

// Color del relleno por variante
const colorClasses: Record<BarColor, string> = {
  blue: 'bg-vial-blue',
  green: 'bg-vial-green',
  yellow: 'bg-vial-yellow',
}

// Altura de la barra por tamaño
const sizeClasses: Record<BarSize, string> = {
  sm: 'h-2',
  md: 'h-3',
}

export default function ProgressBar({
  value,
  color = 'blue',
  size = 'md',
  showLabel = false,
  label,
  className = '',
}: ProgressBarProps) {
  // Clampear el valor entre 0 y 100
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={['w-full', className].join(' ')}>
      {/* Etiqueta opcional encima de la barra */}
      {showLabel && (
        <div className="flex justify-between mb-1 text-sm text-vial-asphalt">
          <span>{label ?? 'Progreso'}</span>
          <span>{clamped}%</span>
        </div>
      )}

      {/* Pista de fondo */}
      <div className={['w-full bg-vial-gray-mid rounded-full overflow-hidden', sizeClasses[size]].join(' ')}>
        {/* Relleno animado */}
        <motion.div
          className={['h-full rounded-full', colorClasses[color]].join(' ')}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        />
      </div>
    </div>
  )
}
