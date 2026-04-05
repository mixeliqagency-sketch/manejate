'use client'

// === DRAG CLASSIFY — Clasificar señales por categoría ===
// Muestra señales de tránsito una a la vez.
// El usuario hace click en la categoría correcta (click-to-place, mobile friendly).
// Feedback por señal: verde flash = correcto, rojo flash = incorrecto + muestra la correcta.

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { shuffleArray } from '@/lib/questions'
import type { GameChildProps } from '@/components/juegos/GameWrapper'
import type { SignalItem } from '@/types'
import signalsData from '../../../data/signals.json'

// Categorías disponibles con colores y etiquetas
const CATEGORIES = [
  {
    id: 'reglamentaria' as const,
    label: 'Reglamentaria',
    color: 'border-vial-red bg-vial-red/5 text-vial-red',
    activeColor: 'border-vial-red bg-vial-red/20',
    icon: 'R',
    description: 'Círculo rojo — de cumplimiento obligatorio',
  },
  {
    id: 'preventiva' as const,
    label: 'Preventiva',
    color: 'border-vial-yellow bg-vial-yellow/5 text-vial-yellow-dark',
    activeColor: 'border-vial-yellow bg-vial-yellow/20',
    icon: 'P',
    description: 'Rombo amarillo — advierte peligros',
  },
  {
    id: 'informativa' as const,
    label: 'Informativa',
    color: 'border-vial-blue bg-vial-blue/5 text-vial-blue',
    activeColor: 'border-vial-blue bg-vial-blue/20',
    icon: 'I',
    description: 'Rectángulo verde o azul — orientación vial',
  },
  {
    id: 'transitoria' as const,
    label: 'Transitoria',
    color: 'border-orange-400 bg-orange-50 text-orange-700',
    activeColor: 'border-orange-400 bg-orange-100',
    icon: 'T',
    description: 'Naranja — señal temporal, mayor prioridad',
  },
]

type CategoryId = typeof CATEGORIES[number]['id']

// Estado del feedback visual
type FeedbackState = 'none' | 'correct' | 'wrong'

export default function DragClassify({ onGameComplete }: GameChildProps) {
  // Mezclar todas las señales
  const signals = useMemo<SignalItem[]>(() => {
    const all = signalsData as SignalItem[]
    return shuffleArray(all)
  }, [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [feedback, setFeedback] = useState<FeedbackState>('none')
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null)
  // Categoría correcta (mostrar si respuesta incorrecta)
  const [revealCorrect, setRevealCorrect] = useState(false)

  const signal = signals[currentIndex]
  const totalSignals = signals.length
  const progressPercent = (currentIndex / totalSignals) * 100

  function handleCategoryClick(catId: CategoryId) {
    if (feedback !== 'none') return  // Ya respondió esta señal

    setSelectedCategory(catId)
    const isCorrect = catId === signal.category

    if (isCorrect) {
      setCorrectCount(c => c + 1)
      setFeedback('correct')
    } else {
      setFeedback('wrong')
      setRevealCorrect(true)
    }

    // Avanzar automáticamente después de 1.5 segundos
    setTimeout(() => {
      if (currentIndex + 1 >= totalSignals) {
        const score = Math.round(((isCorrect ? correctCount + 1 : correctCount) / totalSignals) * 100)
        const xp = score >= 70 ? 20 : 10
        onGameComplete(score, xp)
      } else {
        setCurrentIndex(i => i + 1)
        setFeedback('none')
        setSelectedCategory(null)
        setRevealCorrect(false)
      }
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Barra de progreso */}
      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-vial-asphalt-light">
          <span>Señal {currentIndex + 1} de {totalSignals}</span>
          <span>{Math.round(progressPercent)}% completado</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-vial-gray-mid">
          <motion.div
            className="h-full rounded-full bg-vial-blue"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Tarjeta de señal */}
      <AnimatePresence mode="wait">
        <motion.div
          key={signal.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={[
            'flex flex-col items-center gap-4 rounded-2xl border-2 p-6 text-center shadow-sm transition-all duration-300',
            feedback === 'correct'
              ? 'border-vial-green bg-vial-green/5'
              : feedback === 'wrong'
              ? 'border-vial-red bg-vial-red/5'
              : 'border-vial-gray-mid bg-white',
          ].join(' ')}
        >
          {/* Ícono SVG de la señal */}
          <div className={[
            'flex h-20 w-20 items-center justify-center rounded-full border-4',
            feedback === 'correct'
              ? 'border-vial-green bg-vial-green/10'
              : feedback === 'wrong'
              ? 'border-vial-red bg-vial-red/10'
              : 'border-vial-blue/30 bg-vial-blue/5',
          ].join(' ')}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={[
                'h-10 w-10',
                feedback === 'correct'
                  ? 'text-vial-green'
                  : feedback === 'wrong'
                  ? 'text-vial-red'
                  : 'text-vial-blue',
              ].join(' ')}
              aria-hidden="true"
            >
              <path d={signal.svgPath} />
            </svg>
          </div>

          {/* Nombre de la señal */}
          <div>
            <h2 className="text-lg font-bold text-vial-asphalt-dark">{signal.name}</h2>
            <p className="mt-1 text-sm text-vial-asphalt-light leading-snug">{signal.description}</p>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {feedback !== 'none' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={[
                  'rounded-xl px-4 py-2 text-sm font-semibold',
                  feedback === 'correct'
                    ? 'bg-vial-green/10 text-vial-green'
                    : 'bg-vial-red/10 text-vial-red',
                ].join(' ')}
              >
                {feedback === 'correct'
                  ? '¡Correcto!'
                  : `Incorrecto — es ${CATEGORIES.find(c => c.id === signal.category)?.label}`
                }
              </motion.div>
            )}
          </AnimatePresence>

          {/* Instrucción */}
          <p className="text-xs text-vial-asphalt-light">
            ¿A qué categoría pertenece esta señal?
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Botones de categoría */}
      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id
          const isCorrectCategory = signal.category === cat.id
          const showAsCorrect = revealCorrect && isCorrectCategory

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(cat.id)}
              disabled={feedback !== 'none'}
              aria-label={`Categoría ${cat.label}`}
              className={[
                'flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-3 text-center transition-all duration-200 active:scale-95',
                showAsCorrect
                  ? 'border-vial-green bg-vial-green/10 text-vial-green ring-2 ring-vial-green/30'
                  : isSelected && feedback === 'wrong'
                  ? 'border-vial-red bg-vial-red/10 text-vial-red ring-2 ring-vial-red/20'
                  : feedback !== 'none'
                  ? 'border-vial-gray-mid bg-vial-gray-light text-vial-asphalt-light opacity-50 cursor-default'
                  : cat.color + ' hover:opacity-80 cursor-pointer',
              ].join(' ')}
            >
              <span className="text-2xl font-black">{cat.icon}</span>
              <span className="text-xs font-semibold">{cat.label}</span>
              <span className="text-xs opacity-70 hidden sm:block">{cat.description}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
