'use client'

// === GAMES PREVIEW — Vista previa de juegos disponibles ===
// Grid de tarjetas con todos los juegos de data/games-meta.json.
// Animación escalonada con whileInView de Framer Motion.

import { motion, type Easing } from 'framer-motion'

const EASE_OUT: Easing = 'easeOut'
import Link from 'next/link'
import gamesData from '../../../data/games-meta.json'
import type { GameMeta } from '@/types'

const games = gamesData as GameMeta[]

// Clases de color por dificultad
const difficultyConfig: Record<GameMeta['difficulty'], { label: string; classes: string }> = {
  facil: { label: 'Fácil', classes: 'bg-vial-green/10 text-vial-green' },
  medio: { label: 'Medio', classes: 'bg-vial-yellow/15 text-vial-yellow-dark' },
  dificil: { label: 'Difícil', classes: 'bg-vial-red/10 text-vial-red' },
}

export default function GamesPreview() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-vial-asphalt-dark sm:text-4xl">
            11 juegos para aprender
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-7 text-vial-asphalt-light">
            Cada estilo de aprendizaje tiene su juego. Practicá señales, normativas y situaciones reales de tránsito de forma interactiva.
          </p>
        </motion.div>

        {/* Grid de juegos */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {games.map((game, i) => {
            const diff = difficultyConfig[game.difficulty]
            return (
              <motion.div
                key={game.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: EASE_OUT }}
              >
                <Link
                  href={`/juegos/${game.type}`}
                  className="group flex flex-col gap-3 rounded-2xl border border-vial-gray-mid bg-white p-4 shadow-sm transition-all duration-200 hover:border-vial-blue/40 hover:shadow-md h-full"
                >
                  {/* Emoji icono decorativo + badge dificultad */}
                  <div className="flex items-start justify-between">
                    {/* Excepción documentada: emoji como identificador visual decorativo */}
                    <span className="text-3xl" role="img" aria-label={game.name}>
                      {game.icon}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${diff.classes}`}>
                      {diff.label}
                    </span>
                  </div>

                  {/* Nombre y descripción */}
                  <div className="flex flex-col gap-1 flex-1">
                    <h3 className="text-sm font-bold text-vial-asphalt-dark leading-tight">
                      {game.name}
                    </h3>
                    <p className="text-xs leading-5 text-vial-asphalt-light line-clamp-3">
                      {game.description}
                    </p>
                  </div>

                  {/* XP reward */}
                  <div className="flex items-center gap-1 text-xs font-semibold text-vial-blue">
                    {/* Ícono estrella/XP */}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M6 1l1.4 2.8L10.5 4.3l-2.25 2.19.53 3.1L6 8l-2.78 1.59.53-3.1L1.5 4.3l3.1-.5L6 1z" fill="currentColor" />
                    </svg>
                    +{game.xpReward} XP
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Link ver todos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/juegos"
            className="inline-flex items-center gap-2 text-base font-semibold text-vial-blue transition-colors hover:text-vial-blue-light"
          >
            Ver todos los juegos
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
