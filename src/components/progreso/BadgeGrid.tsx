'use client'

// === GRILLA DE BADGES ===
// Muestra los 8 badges disponibles.
// Los ganados aparecen resaltados; los pendientes, en gris con indicación de cómo obtenerlos.

import { motion } from 'framer-motion'
import { BADGES } from '@/lib/gamification'
import { useProgress } from '@/context/ProgressContext'

export default function BadgeGrid() {
  const { progress } = useProgress()
  const earnedBadges = progress.badges

  return (
    <div>
      <h2 className="text-lg font-bold text-vial-asphalt-dark mb-4">
        Insignias ({earnedBadges.length} / {BADGES.length})
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {BADGES.map((badge, index) => {
          const isEarned = earnedBadges.includes(badge.id)

          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={[
                'p-4 rounded-2xl border text-center transition-all',
                isEarned
                  ? 'border-vial-yellow bg-yellow-50 shadow-sm'
                  : 'border-vial-gray-mid bg-vial-gray-light opacity-60',
              ].join(' ')}
            >
              {/* Ícono del badge */}
              <div className={`text-3xl mb-2 ${!isEarned && 'grayscale filter'}`}>
                {isEarned ? badge.icon : '🔒'}
              </div>

              {/* Nombre */}
              <p className={`text-xs font-bold mb-1 ${
                isEarned ? 'text-yellow-800' : 'text-vial-asphalt-light'
              }`}>
                {badge.name}
              </p>

              {/* Descripción / condición */}
              <p className={`text-xs leading-tight ${
                isEarned ? 'text-yellow-700' : 'text-vial-asphalt-light'
              }`}>
                {isEarned ? badge.description : badge.condition}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
