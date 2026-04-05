'use client'

// === HERO — Sección principal de la home ===
// Fondo degradado azul con líneas decorativas de ruta.
// Badge oficial + título + subtítulo + dos CTAs.
// Animación escalonada con Framer Motion.

import { motion, type Easing } from 'framer-motion'
import Link from 'next/link'

// Variantes de animación reutilizables
const EASE_OUT: Easing = 'easeOut'
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: EASE_OUT },
})

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-vial-blue via-vial-blue-dark to-vial-asphalt-dark">

      {/* Patrón decorativo: líneas de carretera horizontales */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-16 opacity-10"
      >
        {/* Línea central de carretera — discontinua */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex w-full gap-8 px-0"
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div
                key={j}
                className="h-1 w-16 shrink-0 rounded-full bg-white"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Contenido del hero */}
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="flex flex-col items-center text-center">

          {/* Badge oficial */}
          <motion.div {...fadeUp(0.1)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              {/* Ícono de libro / documento oficial */}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M2 2h10v10H2V2zm0 0v10M7 2v10M2 6h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Basado en el Manual Oficial de CABA
            </span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            {...fadeUp(0.2)}
            className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Aprendé a manejar{' '}
            <span className="block text-vial-yellow">jugando.</span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            {...fadeUp(0.3)}
            className="mt-6 max-w-xl text-lg leading-8 text-blue-100"
          >
            Practicá gratis para el examen teórico de conducir en CABA.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.4)}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            {/* CTA primario — amarillo */}
            <Link
              href="/lecciones"
              className="inline-flex items-center gap-2 rounded-2xl bg-vial-yellow px-7 py-3.5 text-base font-semibold text-vial-asphalt-dark shadow-lg transition-all duration-150 hover:bg-vial-yellow-light hover:shadow-xl active:scale-95"
            >
              {/* Ícono play / inicio */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d="M6 4l8 5-8 5V4z"
                  fill="currentColor"
                />
              </svg>
              Empezar ahora
            </Link>

            {/* CTA secundario — ghost blanco */}
            <Link
              href="/examenes"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-150 hover:bg-white/20 active:scale-95"
            >
              {/* Ícono de examen / clipboard */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <rect x="3" y="2" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M6 6h6M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Hacer simulacro
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
