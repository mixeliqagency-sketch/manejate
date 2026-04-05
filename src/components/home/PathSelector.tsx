'use client'

// === PATH SELECTOR — Selector de camino de aprendizaje ===
// Dos tarjetas superpuestas al hero (-mt-8) para elegir entre
// "Primera licencia" y "Renovación / Repaso".

import { motion, type Easing } from 'framer-motion'
import Link from 'next/link'

const EASE_OUT: Easing = 'easeOut'

interface PathOption {
  href: string
  title: string
  description: string
  // SVG paths para el ícono de cada camino
  icon: React.ReactNode
  // Color de acento del borde al hacer hover
  accentClass: string
  badgeLabel: string
  badgeBg: string
}

const paths: PathOption[] = [
  {
    href: '/lecciones?camino=primera',
    title: 'Primera licencia',
    description: 'Aprendé desde cero todas las normas de tránsito que necesitás para sacar tu carnet en CABA.',
    icon: (
      // Ícono: persona con placa — primera vez
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="10" r="5" stroke="currentColor" strokeWidth="2" />
        <path d="M6 26c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 20l3 3 7-7" stroke="#FFB300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accentClass: 'hover:border-vial-blue hover:shadow-vial-blue/10',
    badgeLabel: 'Desde cero',
    badgeBg: 'bg-vial-blue/10 text-vial-blue',
  },
  {
    href: '/lecciones?camino=renovacion',
    title: 'Renovación / Repaso',
    description: 'Repasá lo esencial y poné a prueba tus conocimientos antes de renovar tu licencia de conducir.',
    icon: (
      // Ícono: carnet / tarjeta de renovación
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="16" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M18 13h6M18 16h5M18 19h4" stroke="#FFB300" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    accentClass: 'hover:border-vial-yellow hover:shadow-vial-yellow/10',
    badgeLabel: 'Repaso rápido',
    badgeBg: 'bg-vial-yellow/15 text-vial-yellow-dark',
  },
]

export default function PathSelector() {
  return (
    <section className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {paths.map((path, i) => (
            <motion.div
              key={path.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 + 0.2, ease: EASE_OUT }}
            >
              <Link
                href={path.href}
                className={[
                  'group flex h-full flex-col gap-4 rounded-2xl border border-vial-gray-mid bg-white p-6 shadow-lg transition-all duration-200',
                  path.accentClass,
                  'hover:shadow-xl',
                ].join(' ')}
              >
                {/* Ícono + badge en fila */}
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-vial-gray-light text-vial-asphalt">
                    {path.icon}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${path.badgeBg}`}>
                    {path.badgeLabel}
                  </span>
                </div>

                {/* Título */}
                <div>
                  <h3 className="text-lg font-bold text-vial-asphalt-dark">
                    {path.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-vial-asphalt-light">
                    {path.description}
                  </p>
                </div>

                {/* Flecha de acción */}
                <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-vial-blue transition-gap duration-150 group-hover:gap-2">
                  Empezar
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
