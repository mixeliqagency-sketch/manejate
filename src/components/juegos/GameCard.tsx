'use client'

// === GAME CARD — Tarjeta de juego para el índice /juegos ===
// Muestra: emoji decorativo, badge de dificultad, nombre, descripción y XP.
// Animación escalonada con Framer Motion al entrar al viewport.

import { motion, type Easing } from 'framer-motion'

const EASE_OUT: Easing = 'easeOut'
import Link from 'next/link'
import type { GameMeta } from '@/types'

interface GameCardProps {
  game: GameMeta
  // Índice para el delay escalonado de la animación
  index?: number
}

// Configuración de estilos y etiquetas por dificultad
const difficultyConfig: Record<GameMeta['difficulty'], { label: string; bgClass: string; dotClass: string }> = {
  facil: {
    label: 'Fácil',
    bgClass: 'bg-vial-green/10 text-vial-green border border-vial-green/20',
    dotClass: 'bg-vial-green',
  },
  medio: {
    label: 'Medio',
    bgClass: 'bg-vial-yellow/15 text-vial-yellow-dark border border-vial-yellow/30',
    dotClass: 'bg-vial-yellow',
  },
  dificil: {
    label: 'Difícil',
    bgClass: 'bg-vial-red/10 text-vial-red border border-vial-red/20',
    dotClass: 'bg-vial-red',
  },
}

export default function GameCard({ game, index = 0 }: GameCardProps) {
  const diff = difficultyConfig[game.difficulty]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: EASE_OUT }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/juegos/${game.type}`}
        className="group flex h-full flex-col gap-4 rounded-2xl border border-vial-gray-mid bg-white p-5 shadow-sm transition-all duration-200 hover:border-vial-blue/40 hover:shadow-lg"
      >
        {/* Fila superior: emoji + badge dificultad */}
        <div className="flex items-start justify-between gap-2">
          {/* Emoji icono decorativo — excepción documentada: identificador visual */}
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-vial-gray-light text-3xl"
            role="img"
            aria-label={game.name}
          >
            {game.icon}
          </span>

          {/* Badge de dificultad con punto de color */}
          <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${diff.bgClass}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${diff.dotClass}`} aria-hidden="true" />
            {diff.label}
          </span>
        </div>

        {/* Nombre y descripción */}
        <div className="flex flex-1 flex-col gap-1.5">
          <h3 className="text-base font-bold leading-snug text-vial-asphalt-dark">
            {game.name}
          </h3>
          <p className="text-sm leading-6 text-vial-asphalt-light line-clamp-3">
            {game.description}
          </p>
        </div>

        {/* Footer: XP + flecha */}
        <div className="flex items-center justify-between">
          {/* XP reward */}
          <div className="flex items-center gap-1.5 text-sm font-semibold text-vial-blue">
            {/* Ícono estrella */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M7 1l1.6 3.3L12.5 5l-2.75 2.68.65 3.82L7 9.5l-3.4 2L4.25 7.68 1.5 5l3.9-.57L7 1z"
                fill="currentColor"
              />
            </svg>
            +{game.xpReward} XP
          </div>

          {/* Flecha de acción */}
          <span className="flex items-center gap-1 text-xs font-semibold text-vial-asphalt-light transition-colors group-hover:text-vial-blue">
            Jugar
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-150 group-hover:translate-x-1"
            >
              <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
