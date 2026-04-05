'use client'

// === DISPLAY DE NIVEL Y XP ===
// Muestra el nivel actual, nombre, XP total y barra de progreso al próximo nivel.

import { motion } from 'framer-motion'
import { useProgress } from '@/context/ProgressContext'
import { LEVELS, getXPForNextLevel } from '@/lib/gamification'

export default function LevelDisplay() {
  const { progress } = useProgress()
  const { xp, level } = progress

  // Obtener info del nivel actual
  const currentLevel = LEVELS.find(l => l.level === level) ?? LEVELS[0]
  const nextLevel = LEVELS.find(l => l.level === level + 1) ?? null

  // Calcular progreso hacia el próximo nivel
  const { progress: xpProgress } = getXPForNextLevel(xp)

  const isMaxLevel = level === LEVELS.length

  return (
    <div className="bg-vial-blue rounded-2xl p-6 text-white">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-blue-200 text-sm font-medium">Tu nivel actual</p>
          <h2 className="text-3xl font-bold">{currentLevel.name}</h2>
          <p className="text-blue-200 text-sm">Nivel {level} de {LEVELS.length}</p>
        </div>

        {/* Badge de nivel */}
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-2xl font-black">{level}</span>
        </div>
      </div>

      {/* XP total */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-blue-100">XP total</span>
          <span className="font-bold">
            {xp} XP
            {!isMaxLevel && nextLevel && ` / ${nextLevel.xpRequired} XP`}
          </span>
        </div>

        {/* Barra de progreso al próximo nivel */}
        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${isMaxLevel ? 100 : xpProgress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        {/* Texto descriptivo */}
        <p className="text-blue-200 text-xs mt-1.5">
          {isMaxLevel
            ? '¡Nivel máximo alcanzado!'
            : nextLevel
              ? `${nextLevel.xpRequired - xp} XP para ser ${nextLevel.name}`
              : ''
          }
        </p>
      </div>
    </div>
  )
}
