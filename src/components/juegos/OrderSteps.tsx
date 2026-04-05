'use client'

// === ORDER STEPS — Ordenar los pasos de una maniobra ===
// Carga una secuencia del JSON de order-steps.
// Muestra los pasos en orden aleatorio.
// El usuario hace click en los pasos en el orden correcto (click-to-order numerado).
// Al terminar de seleccionar: botón "Verificar" que muestra cuáles están bien/mal.

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { filterByLesson, pickRandom, shuffleArray } from '@/lib/questions'
import type { GameChildProps } from '@/components/juegos/GameWrapper'
import type { OrderStepsItem } from '@/types'
import orderStepsData from '../../../data/order-steps.json'

interface ShuffledStep {
  text: string
  originalIndex: number  // Posición correcta en el array original (0-based)
}

interface PlacedStep {
  text: string
  originalIndex: number
  position: number  // Posición en que fue colocado por el usuario (0-based)
  isCorrect?: boolean  // undefined = no verificado aún
}

export default function OrderSteps({ lessonFilter, onGameComplete }: GameChildProps) {
  // Elegir un escenario al azar
  const scenario = useMemo<OrderStepsItem | null>(() => {
    const all = orderStepsData as OrderStepsItem[]
    const filtered = lessonFilter ? filterByLesson(all, lessonFilter) : all
    const picked = pickRandom(filtered, 1)
    return picked.length > 0 ? picked[0] : null
  }, [lessonFilter])

  // Pasos mezclados (los que quedan por ordenar)
  const initialShuffled = useMemo<ShuffledStep[]>(() => {
    if (!scenario) return []
    return shuffleArray(
      scenario.steps.map((text, originalIndex) => ({ text, originalIndex }))
    )
  }, [scenario])

  // Pasos que el usuario aún no colocó
  const [remaining, setRemaining] = useState<ShuffledStep[]>(initialShuffled)
  // Pasos colocados por el usuario en orden
  const [placed, setPlaced] = useState<PlacedStep[]>([])
  const [verified, setVerified] = useState(false)

  if (!scenario) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-vial-gray-mid bg-white p-10 text-center">
        <span className="text-5xl" role="img" aria-label="Sin escenarios">📭</span>
        <p className="text-lg font-semibold text-vial-asphalt-dark">
          No hay secuencias para esta lección todavía.
        </p>
      </div>
    )
  }

  // El usuario hace click en un paso "remaining" → lo coloca en la siguiente posición disponible
  function handlePlaceStep(step: ShuffledStep) {
    if (verified) return
    const position = placed.length
    setPlaced(prev => [...prev, { ...step, position }])
    setRemaining(prev => prev.filter(s => s.originalIndex !== step.originalIndex))
  }

  // El usuario hace click en un paso "placed" → lo devuelve a "remaining"
  function handleRemoveStep(placedStep: PlacedStep) {
    if (verified) return
    // Devolver solo el último paso (el más reciente) para mantener el orden
    const lastPlaced = placed[placed.length - 1]
    if (lastPlaced.originalIndex !== placedStep.originalIndex) return  // Solo el último

    setRemaining(prev => [...prev, { text: placedStep.text, originalIndex: placedStep.originalIndex }])
    setPlaced(prev => prev.slice(0, -1))
  }

  function handleVerify() {
    // Verificar si cada paso está en la posición correcta
    const verified = placed.map(p => ({
      ...p,
      isCorrect: p.position === p.originalIndex,
    }))
    setPlaced(verified)
    setVerified(true)
  }

  function handleFinish() {
    const correct = placed.filter(p => p.isCorrect).length
    const total = scenario?.steps.length ?? placed.length
    const score = Math.round((correct / total) * 100)
    const xp = score >= 70 ? 20 : 10
    onGameComplete(score, xp)
  }

  const allPlaced = remaining.length === 0
  const correctCount = placed.filter(p => p.isCorrect).length

  return (
    <div className="flex flex-col gap-6">
      {/* Instrucción */}
      <div className="rounded-xl border border-vial-blue/20 bg-vial-blue/5 p-4">
        <h2 className="text-sm font-bold text-vial-blue mb-1">{scenario.title}</h2>
        <p className="text-xs text-vial-asphalt-light">
          Hacé click en los pasos de abajo en el orden correcto. Podés deshacer el último paso haciendo click sobre él.
        </p>
      </div>

      {/* Zona de pasos ordenados (donde el usuario construye la secuencia) */}
      <div className="rounded-2xl border border-vial-gray-mid bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-vial-asphalt-light mb-3">
          Tu orden
        </p>
        <div className="flex flex-col gap-2 min-h-[60px]">
          {placed.length === 0 ? (
            <p className="text-sm text-vial-asphalt-light text-center py-4">
              Seleccioná los pasos en el orden correcto...
            </p>
          ) : (
            placed.map((p, i) => (
              <motion.button
                key={`placed-${p.originalIndex}`}
                type="button"
                onClick={() => handleRemoveStep(p)}
                disabled={verified || i !== placed.length - 1}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={[
                  'flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm text-vial-asphalt-dark transition-all duration-200',
                  verified
                    ? p.isCorrect
                      ? 'border-vial-green bg-vial-green/5 cursor-default'
                      : 'border-vial-red bg-vial-red/5 cursor-default'
                    : i === placed.length - 1
                    ? 'border-vial-blue bg-vial-blue/5 hover:bg-vial-blue/10 cursor-pointer'
                    : 'border-vial-gray-mid bg-vial-gray-light cursor-default',
                ].join(' ')}
              >
                {/* Número de posición */}
                <span className={[
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white',
                  verified
                    ? p.isCorrect ? 'bg-vial-green' : 'bg-vial-red'
                    : 'bg-vial-blue',
                ].join(' ')}>
                  {i + 1}
                </span>
                <span className="leading-snug">{p.text}</span>
                {/* Feedback icon */}
                {verified && (
                  <span className="ml-auto shrink-0" aria-hidden="true">
                    {p.isCorrect ? (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M4 9l3.5 3.5L14 6" stroke="#2E7D32" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M5 5l8 8M13 5l-8 8" stroke="#C62828" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    )}
                  </span>
                )}
              </motion.button>
            ))
          )}
        </div>

        {/* Resultado de verificación */}
        <AnimatePresence>
          {verified && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={[
                'mt-3 rounded-xl border-l-4 p-3 text-sm overflow-hidden',
                correctCount === scenario.steps.length
                  ? 'border-vial-green bg-vial-green/5 text-vial-green'
                  : 'border-vial-yellow bg-vial-yellow/5 text-vial-yellow-dark',
              ].join(' ')}
            >
              <strong>{correctCount}/{scenario.steps.length} pasos en el orden correcto</strong>
              {correctCount < scenario.steps.length && (
                <p className="mt-1 text-xs text-vial-asphalt-light">
                  Los pasos en rojo estaban en la posición incorrecta.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pasos disponibles (los que quedan por colocar) */}
      <div className="rounded-2xl border border-vial-gray-mid bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-vial-asphalt-light mb-3">
          Pasos disponibles {remaining.length > 0 ? `(${remaining.length})` : '— ¡Todos colocados!'}
        </p>
        <div className="flex flex-col gap-2">
          {remaining.length === 0 ? (
            <p className="text-sm text-vial-green text-center py-2 font-semibold">
              ¡Todos los pasos fueron colocados!
            </p>
          ) : (
            remaining.map(step => (
              <button
                key={`remaining-${step.originalIndex}`}
                type="button"
                onClick={() => handlePlaceStep(step)}
                disabled={verified}
                className="flex items-start gap-3 rounded-xl border border-vial-gray-mid bg-white px-4 py-3 text-left text-sm text-vial-asphalt hover:border-vial-blue/40 hover:bg-vial-blue/5 transition-all duration-150 active:scale-98 cursor-pointer"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-vial-gray-mid text-xs font-bold text-vial-asphalt-light">
                  +
                </span>
                <span className="leading-snug">{step.text}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3">
        <AnimatePresence mode="wait">
          {!verified ? (
            <motion.button
              key="verify"
              type="button"
              onClick={handleVerify}
              disabled={!allPlaced}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={[
                'rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 active:scale-95',
                allPlaced
                  ? 'bg-vial-blue hover:bg-vial-blue-light cursor-pointer'
                  : 'bg-vial-gray-mid cursor-not-allowed',
              ].join(' ')}
            >
              Verificar orden
            </motion.button>
          ) : (
            <motion.button
              key="finish"
              type="button"
              onClick={handleFinish}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl bg-vial-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-vial-blue-light active:scale-95"
            >
              Ver resultado →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
