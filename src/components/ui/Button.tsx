'use client'

// Botón reutilizable con animaciones Framer Motion
// Variantes: primary (amarillo), secondary (azul), success (verde), danger (rojo), ghost (transparente)

import { motion } from 'framer-motion'

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

// Clases de estilos por variante
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-vial-yellow text-vial-asphalt-dark font-semibold hover:bg-vial-yellow-light border border-vial-yellow-dark',
  secondary:
    'bg-vial-blue text-vial-white font-semibold hover:bg-vial-blue-light border border-vial-blue-dark',
  success:
    'bg-vial-green text-vial-white font-semibold hover:bg-vial-green-light border border-vial-green',
  danger:
    'bg-vial-red text-vial-white font-semibold hover:bg-vial-red-light border border-vial-red',
  ghost:
    'bg-transparent text-vial-blue font-semibold hover:bg-vial-gray-light border border-vial-gray-mid',
}

// Clases de tamaño
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-base rounded-xl',
  lg: 'px-7 py-3.5 text-lg rounded-2xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={[
        'inline-flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer select-none',
        variantClasses[variant],
        sizeClasses[size],
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </motion.button>
  )
}
