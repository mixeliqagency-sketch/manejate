// Componente Badge — etiqueta/pill sin animaciones (no necesita 'use client')
// Variantes con colores de fondo + texto: blue, green, yellow, red, gray
// Tamaños: sm, md

type BadgeVariant = 'blue' | 'green' | 'yellow' | 'red' | 'gray'
type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
}

// Color de fondo y texto por variante
const variantClasses: Record<BadgeVariant, string> = {
  blue: 'bg-vial-blue text-vial-white',
  green: 'bg-vial-green text-vial-white',
  yellow: 'bg-vial-yellow text-vial-asphalt-dark',
  red: 'bg-vial-red text-vial-white',
  gray: 'bg-vial-gray-mid text-vial-asphalt',
}

// Tamaño del pill
const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs rounded-md',
  md: 'px-3 py-1 text-sm rounded-lg',
}

export default function Badge({
  children,
  variant = 'blue',
  size = 'md',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}
