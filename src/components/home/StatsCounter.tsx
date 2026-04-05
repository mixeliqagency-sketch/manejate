'use client'

// === STATS COUNTER — Contadores animados de estadísticas clave ===
// Se animan cuando entran al viewport usando useInView de Framer Motion.
// Fondo gris suave para separar visualmente de las secciones adyacentes.

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Stat {
  value: number
  suffix: string
  prefix?: string
  label: string
  // Ícono SVG descriptivo de cada stat
  icon: React.ReactNode
}

const stats: Stat[] = [
  {
    value: 200,
    suffix: '+',
    label: 'Preguntas de práctica',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: 11,
    suffix: '',
    label: 'Juegos interactivos',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="7" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 13v-2m0 2v2m0-2h2m-2 0H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="15" cy="12" r="1" fill="currentColor" />
        <circle cx="18" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    value: 12,
    suffix: '',
    label: 'Lecciones del manual',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 4h16v16H4V4z" stroke="currentColor" strokeWidth="1.8" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: 4,
    suffix: '',
    label: 'Niveles de examen',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 17l4-8 4 5 3-3 4 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

// Hook: anima un número de 0 hasta target en durationMs milisegundos
function useCountUp(target: number, durationMs: number, active: boolean): number {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active) return

    // Cancelar cualquier animación previa
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    startTimeRef.current = null
    setCount(0)

    function step(timestamp: number) {
      if (startTimeRef.current === null) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / durationMs, 1)
      // Easing: ease-out cuadrático
      const eased = 1 - (1 - progress) ** 2
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [active, target, durationMs])

  return count
}

// Sub-componente por stat con su propio contador
function StatItem({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCountUp(stat.value, 1200, isInView)

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 text-center">
      {/* Ícono en círculo de acento */}
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-vial-blue/10 text-vial-blue">
        {stat.icon}
      </span>

      {/* Número animado */}
      <div className="text-4xl font-bold tracking-tight text-vial-asphalt-dark sm:text-5xl">
        {stat.prefix ?? ''}
        {count}
        {stat.suffix}
      </div>

      {/* Etiqueta */}
      <p className="text-sm font-medium text-vial-asphalt-light">{stat.label}</p>
    </div>
  )
}

export default function StatsCounter() {
  return (
    <section className="bg-vial-gray-light px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
