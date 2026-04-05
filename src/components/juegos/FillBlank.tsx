'use client'

// === FILL BLANK — Completar la oración ===
// Muestra una oración con un espacio en blanco.
// El usuario elige entre 3-4 opciones para completarlo.
// Feedback inmediato con explicación. Similar al Quiz.

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { filterByLesson, pickRandom } from '@/lib/questions'
import type { GameChildProps } from '@/components/juegos/GameWrapper'
import type { FillBlankItem } from '@/types'
import fillBlankData from '../../../data/fill-blank.json'

// Cantidad de preguntas por partida
const ITEMS_PER_ROUND = 10

type OptionState = 'idle' | 'correct' | 'wrong' | 'dimmed'

function getOptionClass(state: OptionState): string {
  switch (state) {
    case 'correct':
      return 'border-vial-green bg-vial-green/10 text-vial-green font-semibold ring-2 ring-vial-green/30'
    case 'wrong':
      return 'border-vial-red bg-vial-red/10 text-vial-red ring-2 ring-vial-red/20'
    case 'dimmed':
      return 'border-vial-gray-mid bg-vial-gray-light text-vial-asphalt-light opacity-50'
    default:
      return 'border-vial-gray-mid bg-white text-vial-asphalt hover:border-vial-blue/40 hover:bg-vial-blue/5 cursor-pointer'
  }
}

export default function FillBlank({ lessonFilter, onGameComplete }: GameChildProps) {
  // Filtrar y seleccionar items al montar
  const items = useMemo<FillBlankItem[]>(() => {
    const all = fillBlankData as FillBlankItem[]
    const filtered = lessonFilter ? filterByLesson(all, lessonFilter) : all
    return pickRandom(filtered, ITEMS_PER_ROUND)
  }, [lessonFilter])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number>(-1)
  const [correctCount, setCorrectCount] = useState(0)

  // Si no hay items disponibles
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-vial-gray-mid bg-white p-10 text-center">
        <span className="text-5xl" role="img" aria-label="Sin preguntas">📭</span>
        <p className="text-lg font-semibold text-vial-asphalt-dark">
          No hay ejercicios para esta lección todavía.
        </p>
        <p className="text-sm text-vial-asphalt-light">
          Probá seleccionando otra lección o &ldquo;Todas las lecciones&rdquo;.
        </p>
      </div>
    )
  }

  const item = items[currentIndex]
  const totalItems = items.length
  const hasAnswered = selectedOption !== -1
  const progressPercent = (currentIndex / totalItems) * 100

  function getState(index: number): OptionState {
    if (!hasAnswered) return 'idle'
    if (index === item.correctIndex) return 'correct'
    if (index === selectedOption) return 'wrong'
    return 'dimmed'
  }

  function handleSelect(index: number) {
    if (hasAnswered) return
    setSelectedOption(index)
    if (index === item.correctIndex) {
      setCorrectCount(c => c + 1)
    }
  }

  function handleNext() {
    if (currentIndex + 1 >= totalItems) {
      const scorePercent = Math.round((correctCount / totalItems) * 100)
      const xp = scorePercent >= 70 ? 20 : 10
      onGameComplete(scorePercent, xp)
    } else {
      setCurrentIndex(i => i + 1)
      setSelectedOption(-1)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Barra de progreso */}
      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-vial-asphalt-light">
          <span>Pregunta {currentIndex + 1} de {totalItems}</span>
          <span>{Math.round(progressPercent)}% completado</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-vial-gray-mid">
          <motion.div
            className="h-full rounded-full bg-vial-blue"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Tarjeta de pregunta */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex flex-col gap-5 rounded-2xl border border-vial-gray-mid bg-white p-6 shadow-sm"
        >
          {/* Instrucción */}
          <p className="text-xs font-semibold uppercase tracking-wider text-vial-blue">
            Completá el espacio en blanco
          </p>

          {/* Oración con espacio en blanco */}
          <div className="rounded-xl bg-vial-gray-light p-4 text-sm leading-relaxed text-vial-asphalt-dark sm:text-base">
            <span>{item.textBefore} </span>
            <span className={[
              'inline-block min-w-[80px] rounded-lg border-b-2 px-3 py-0.5 font-semibold transition-colors duration-200',
              hasAnswered
                ? selectedOption === item.correctIndex
                  ? 'border-vial-green bg-vial-green/10 text-vial-green'
                  : 'border-vial-red bg-vial-red/10 text-vial-red'
                : 'border-vial-blue bg-vial-blue/5 text-vial-blue',
            ].join(' ')}>
              {hasAnswered ? item.options[item.correctIndex] : '___'}
            </span>
            <span> {item.textAfter}</span>
          </div>

          {/* Opciones */}
          <div className="flex flex-col gap-3">
            {item.options.map((option, index) => {
              const state = getState(index)
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelect(index)}
                  disabled={hasAnswered}
                  className={[
                    'flex items-start gap-3 rounded-xl border px-4 py-3.5 text-left text-sm leading-snug transition-all duration-200',
                    getOptionClass(state),
                  ].join(' ')}
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                  {hasAnswered && state !== 'dimmed' && (
                    <span className="ml-auto shrink-0" aria-hidden="true">
                      {state === 'correct' ? (
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
                </button>
              )
            })}
          </div>

          {/* Explicación */}
          <AnimatePresence>
            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className={[
                  'rounded-xl border-l-4 p-4',
                  selectedOption === item.correctIndex
                    ? 'border-vial-green bg-vial-green/5'
                    : 'border-vial-red bg-vial-red/5',
                ].join(' ')}>
                  <p className={[
                    'mb-1.5 text-sm font-semibold',
                    selectedOption === item.correctIndex ? 'text-vial-green' : 'text-vial-red',
                  ].join(' ')}>
                    {selectedOption === item.correctIndex ? '¡Correcto!' : 'Incorrecto'}
                  </p>
                  <p className="text-sm leading-relaxed text-vial-asphalt">
                    {item.explanation}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Botón siguiente */}
      <AnimatePresence>
        {hasAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex justify-end"
          >
            <button
              type="button"
              onClick={handleNext}
              className="rounded-xl bg-vial-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-vial-blue-light active:scale-95"
            >
              {currentIndex + 1 >= totalItems ? 'Ver resultado' : 'Siguiente →'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
