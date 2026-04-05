'use client'

// === ROAD SITUATION — Situaciones viales ===
// Preguntas del quiz presentadas con un estilo de "escenario vial".
// Muestra una tarjeta visual con descripción de situación antes de la pregunta.
// Flujo idéntico al Quiz pero con diferente tratamiento visual.

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { filterByLesson, pickRandom } from '@/lib/questions'
import type { GameChildProps } from '@/components/juegos/GameWrapper'
import type { QuizQuestion } from '@/types'
import quizData from '../../../data/quiz.json'

const QUESTIONS_PER_ROUND = 10

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

// Iconos de situaciones viales (rotativos para dar variedad visual)
const SITUATION_ICONS = [
  // Auto en calle
  <svg key="car" viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
    <rect x="6" y="20" width="36" height="14" rx="3" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="2"/>
    <path d="M10 20l4-8h20l4 8" stroke="#3B82F6" strokeWidth="2" fill="none"/>
    <circle cx="14" cy="36" r="4" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
    <circle cx="34" cy="36" r="4" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
  </svg>,
  // Semáforo
  <svg key="traffic" viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
    <rect x="16" y="6" width="16" height="36" rx="4" fill="#64748B" fillOpacity="0.15" stroke="#64748B" strokeWidth="2"/>
    <circle cx="24" cy="14" r="4" fill="#EF4444" fillOpacity="0.7"/>
    <circle cx="24" cy="24" r="4" fill="#F59E0B" fillOpacity="0.7"/>
    <circle cx="24" cy="34" r="4" fill="#22C55E" fillOpacity="0.7"/>
  </svg>,
  // Cruce de peatones
  <svg key="cross" viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
    <path d="M8 40h32" stroke="#64748B" strokeWidth="3" strokeLinecap="round"/>
    <path d="M14 40V20" stroke="#F8FAFC" strokeWidth="4" strokeLinecap="round"/>
    <path d="M20 40V20" stroke="#64748B" strokeWidth="4" strokeLinecap="round"/>
    <path d="M26 40V20" stroke="#F8FAFC" strokeWidth="4" strokeLinecap="round"/>
    <path d="M32 40V20" stroke="#64748B" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="24" cy="12" r="5" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
  </svg>,
  // Señal de pare
  <svg key="stop" viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
    <polygon points="18,8 30,8 40,18 40,30 30,40 18,40 8,30 8,18" fill="#EF4444" fillOpacity="0.15" stroke="#EF4444" strokeWidth="2"/>
    <text x="24" y="28" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#EF4444">PARE</text>
  </svg>,
  // Rotonda
  <svg key="roundabout" viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
    <circle cx="24" cy="24" r="14" stroke="#3B82F6" strokeWidth="2" fill="none"/>
    <circle cx="24" cy="24" r="6" stroke="#3B82F6" strokeWidth="2" fill="#3B82F6" fillOpacity="0.1"/>
    <path d="M24 10V6M38 24h4M24 38v4M10 24H6" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/>
  </svg>,
]

export default function RoadSituation({ lessonFilter, onGameComplete }: GameChildProps) {
  const questions = useMemo<QuizQuestion[]>(() => {
    const all = quizData as QuizQuestion[]
    const filtered = lessonFilter ? filterByLesson(all, lessonFilter) : all
    return pickRandom(filtered, QUESTIONS_PER_ROUND)
  }, [lessonFilter])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number>(-1)
  const [correctCount, setCorrectCount] = useState(0)

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-vial-gray-mid bg-white p-10 text-center">
        <span className="text-5xl" role="img" aria-label="Sin preguntas">📭</span>
        <p className="text-lg font-semibold text-vial-asphalt-dark">
          No hay situaciones para esta lección todavía.
        </p>
      </div>
    )
  }

  const question = questions[currentIndex]
  const totalQuestions = questions.length
  const hasAnswered = selectedOption !== -1
  const progressPercent = (currentIndex / totalQuestions) * 100
  // Ícono rotativo según el índice
  const situationIcon = SITUATION_ICONS[currentIndex % SITUATION_ICONS.length]

  function getState(index: number): OptionState {
    if (!hasAnswered) return 'idle'
    if (index === question.correctIndex) return 'correct'
    if (index === selectedOption) return 'wrong'
    return 'dimmed'
  }

  function handleSelect(index: number) {
    if (hasAnswered) return
    setSelectedOption(index)
    if (index === question.correctIndex) {
      setCorrectCount(c => c + 1)
    }
  }

  function handleNext() {
    if (currentIndex + 1 >= totalQuestions) {
      const scorePercent = Math.round((correctCount / totalQuestions) * 100)
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
          <span>Situación {currentIndex + 1} de {totalQuestions}</span>
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

      {/* Tarjeta de situación */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex flex-col gap-5 rounded-2xl border border-vial-gray-mid bg-white shadow-sm overflow-hidden"
        >
          {/* Cabecera de escenario */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-vial-blue/5 to-vial-blue/10 border-b border-vial-blue/10 px-6 py-5">
            <div className="shrink-0">
              {situationIcon}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-vial-blue mb-1">
                Situación vial
              </p>
              <h2 className="text-base font-semibold leading-snug text-vial-asphalt-dark sm:text-lg">
                {question.question}
              </h2>
            </div>
          </div>

          {/* Opciones */}
          <div className="flex flex-col gap-3 px-6 pb-6">
            <p className="text-xs font-medium text-vial-asphalt-light">¿Cuál es la respuesta correcta?</p>
            {question.options.map((option, index) => {
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
                    selectedOption === question.correctIndex
                      ? 'border-vial-green bg-vial-green/5'
                      : 'border-vial-red bg-vial-red/5',
                  ].join(' ')}>
                    <p className={[
                      'mb-1.5 text-sm font-semibold',
                      selectedOption === question.correctIndex ? 'text-vial-green' : 'text-vial-red',
                    ].join(' ')}>
                      {selectedOption === question.correctIndex ? '¡Correcto!' : 'Incorrecto'}
                    </p>
                    <p className="text-sm leading-relaxed text-vial-asphalt">{question.explanation}</p>
                    <p className="mt-2 text-xs text-vial-asphalt-light">Fuente: {question.source}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
              {currentIndex + 1 >= totalQuestions ? 'Ver resultado' : 'Siguiente →'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
