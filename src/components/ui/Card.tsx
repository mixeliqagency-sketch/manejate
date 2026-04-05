'use client'

// Tarjeta genérica con fondo blanco, bordes y sombra suave
// Prop hover: activa efecto de elevación con Framer Motion al pasar el cursor

import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  hover?: boolean
}

export default function Card({
  children,
  onClick,
  className = '',
  hover = false,
}: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={[
        'bg-vial-white rounded-2xl border border-vial-gray-mid shadow-sm p-6',
        onClick ? 'cursor-pointer' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </motion.div>
  )
}
