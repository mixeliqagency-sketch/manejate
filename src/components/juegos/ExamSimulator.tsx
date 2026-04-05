'use client'

// === EXAM SIMULATOR — Simulacro de examen ===
// 30 preguntas del quiz mezcladas.
// Timer de 45 minutos. No se puede volver atrás.
// Sin feedback inmediato. Al final: resultados con aprobado/desaprobado (70%).
// XP: 30 si aprueba, 15 si no.

import { useMemo, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pickRandom } from '@/lib/questions'
import type { GameChildProps } from '@/components/juegos/GameWrapper'
import type { QuizQuestion } from '@/types'
import quizData from '../../../data/quiz.json'

const EXAM_QUESTIONS = 30
const EXAM_TIME_SECONDS = 45 * 60  // 45 minutos
const PASSING_SCORE = 70  // Porcentaje mínimo para aprobar

export default function ExamSimulator({ onGameComplete }: GameChildProps) {
  // Seleccionar preguntas al montar
  const questions = useMemo<QuizQuestion[]>(() => {
    const all = quizData as QuizQuestion[]
    return pickRandom(all, EXAM_QUESTIONS)
  }, [])

  const [currentIndex, setCurrentIndex] = useState(0)
  // Respuestas: -1 si no se respondió aún
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1))
  const [selectedOption, setSelectedOption] = useState<number>(-1)
  // Tiempo restante en segundos
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME_SECONDS)
  const [examFinished, setExamFinished] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Iniciar el timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          setExamFinished(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  // Cuando termina el examen (por tiempo o por finalizar)
  useEffect(() => {
    if (examFinished) {
      if (timerRef.current) clearInterval(timerRef.current)
      setShowResults(true)
    }
  }, [examFinished])

  // Formatear tiempo mm:ss
  function formatTime(s: number): string {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  function handleSelect(index: number) {
    if (examFinished) return
    setSelectedOption(index)
    const newAnswers = [...answers]
    newAnswers[currentIndex] = index
    setAnswers(newAnswers)
  }

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      // Última pregunta → finalizar
      setExamFinished(true)
    } else {
      setCurrentIndex(i => i + 1)
      setSelectedOption(answers[currentIndex + 1] ?? -1)
    }
  }

  function handleFinishExam() {
    setExamFinished(true)
  }

  function handleShowResults() {
    // Calcular score
    const correct = questions.filter((q, i) => answers[i] === q.correctIndex).length
    const score = Math.round((correct / questions.length) * 100)
    const xp = score >= PASSING_SCORE ? 30 : 15
    onGameComplete(score, xp)
  }

  // Pantalla de resultados del simulacro
  if (showResults) {
    const correct = questions.filter((q, i) => answers[i] === q.correctIndex).length
    const wrong = questions.filter((q, i) => answers[i] !== -1 && answers[i] !== q.correctIndex).length
    const unanswered = questions.filter((_, i) => answers[i] === -1).length
    const score = Math.round((correct / questions.length) * 100)
    const passed = score >= PASSING_SCORE

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col gap-6 rounded-2xl border border-vial-gray-mid bg-white p-8 shadow-sm"
      >
        {/* Título resultado */}
        <div className="text-center">
          <div className={[
            'mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full',
            passed ? 'bg-vial-green/10' : 'bg-vial-red/10',
          ].join(' ')}>
            {passed ? (
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <path d="M10 21l7 7 13-14" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <path d="M13 13l14 14M27 13L13 27" stroke="#C62828" strokeWidth="3" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <h2 className={[
            'text-2xl font-bold',
            passed ? 'text-vial-green' : 'text-vial-red',
          ].join(' ')}>
            {passed ? '¡Aprobado!' : 'Desaprobado'}
          </h2>
          <p className="mt-1 text-sm text-vial-asphalt-light">
            Necesitás {PASSING_SCORE}% para aprobar
          </p>
        </div>

        {/* Score grande */}
        <div className="text-center">
          <div className="text-6xl font-bold tracking-tight text-vial-asphalt-dark">{score}%</div>
          <p className="mt-1 text-sm text-vial-asphalt-light">
            {correct} de {questions.length} preguntas correctas
          </p>
        </div>

        {/* Detalle */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-vial-green/5 border border-vial-green/20 p-3 text-center">
            <div className="text-2xl font-bold text-vial-green">{correct}</div>
            <div className="text-xs text-vial-asphalt-light mt-0.5">Correctas</div>
          </div>
          <div className="rounded-xl bg-vial-red/5 border border-vial-red/20 p-3 text-center">
            <div className="text-2xl font-bold text-vial-red">{wrong}</div>
            <div className="text-xs text-vial-asphalt-light mt-0.5">Incorrectas</div>
          </div>
          <div className="rounded-xl bg-vial-gray-light border border-vial-gray-mid p-3 text-center">
            <div className="text-2xl font-bold text-vial-asphalt-light">{unanswered}</div>
            <div className="text-xs text-vial-asphalt-light mt-0.5">Sin responder</div>
          </div>
        </div>

        {/* Repaso de respuestas */}
        <details className="rounded-xl border border-vial-gray-mid overflow-hidden">
          <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-vial-asphalt-dark bg-vial-gray-light hover:bg-vial-gray-mid transition-colors">
            Ver respuestas correctas ({correct}/{questions.length})
          </summary>
          <div className="max-h-64 overflow-y-auto divide-y divide-vial-gray-mid">
            {questions.map((q, i) => {
              const userAnswer = answers[i]
              const isCorrect = userAnswer === q.correctIndex
              const isUnanswered = userAnswer === -1
              return (
                <div key={q.id} className={[
                  'px-4 py-3 text-xs',
                  isCorrect ? 'bg-vial-green/5' : isUnanswered ? '' : 'bg-vial-red/5',
                ].join(' ')}>
                  <p className="font-medium text-vial-asphalt-dark mb-1">
                    {i + 1}. {q.question}
                  </p>
                  <p className={[
                    'font-semibold',
                    isCorrect ? 'text-vial-green' : isUnanswered ? 'text-vial-asphalt-light' : 'text-vial-red',
                  ].join(' ')}>
                    Correcta: {q.options[q.correctIndex]}
                    {!isCorrect && !isUnanswered && ` (Tu respuesta: ${q.options[userAnswer]})`}
                    {isUnanswered && ' (Sin responder)'}
                  </p>
                </div>
              )
            })}
          </div>
        </details>

        {/* Botón finalizar */}
        <button
          type="button"
          onClick={handleShowResults}
          className="w-full rounded-xl bg-vial-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-vial-blue-light active:scale-95"
        >
          Finalizar y ver XP ganado
        </button>
      </motion.div>
    )
  }

  const question = questions[currentIndex]
  const progressPercent = (currentIndex / questions.length) * 100
  const answeredCount = answers.filter(a => a !== -1).length
  const isTimeLow = timeLeft <= 300  // últimos 5 minutos

  return (
    <div className="flex flex-col gap-6">
      {/* Encabezado del examen con timer */}
      <div className="flex items-center justify-between rounded-xl border border-vial-gray-mid bg-white px-4 py-3 shadow-sm">
        <div className="text-sm">
          <span className="text-vial-asphalt-light">Pregunta </span>
          <strong className="text-vial-asphalt-dark">{currentIndex + 1}/{questions.length}</strong>
        </div>
        <div className={[
          'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold tabular-nums',
          isTimeLow
            ? 'bg-vial-red/10 text-vial-red animate-pulse'
            : 'bg-vial-blue/10 text-vial-blue',
        ].join(' ')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 4v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {formatTime(timeLeft)}
        </div>
        <div className="text-sm">
          <span className="text-vial-asphalt-light">Respondidas: </span>
          <strong className="text-vial-asphalt-dark">{answeredCount}</strong>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-vial-gray-mid">
        <motion.div
          className="h-full rounded-full bg-vial-blue"
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Tarjeta de pregunta */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex flex-col gap-5 rounded-2xl border border-vial-gray-mid bg-white p-6 shadow-sm"
        >
          {/* Aviso de examen */}
          <div className="flex items-center gap-2 rounded-lg bg-vial-yellow/5 border border-vial-yellow/20 px-3 py-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
              <path d="M7 1l6 11H1L7 1z" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
              <path d="M7 5v3M7 10v.5" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-xs text-amber-700 font-medium">
              Simulacro de examen — No hay feedback inmediato
            </span>
          </div>

          <h2 className="text-lg font-semibold leading-snug text-vial-asphalt-dark sm:text-xl">
            {question.question}
          </h2>

          <div className="flex flex-col gap-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(index)}
                className={[
                  'flex items-start gap-3 rounded-xl border px-4 py-3.5 text-left text-sm leading-snug transition-all duration-200',
                  selectedOption === index
                    ? 'border-vial-blue bg-vial-blue/10 text-vial-blue font-semibold ring-2 ring-vial-blue/20'
                    : 'border-vial-gray-mid bg-white text-vial-asphalt hover:border-vial-blue/40 hover:bg-vial-blue/5 cursor-pointer',
                ].join(' ')}
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Botones de navegación */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleFinishExam}
          className="rounded-xl border border-vial-gray-mid px-4 py-2.5 text-sm text-vial-asphalt-light transition-colors hover:bg-vial-gray-light active:scale-95"
        >
          Finalizar examen
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="rounded-xl bg-vial-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-vial-blue-light active:scale-95"
        >
          {currentIndex + 1 >= questions.length ? 'Ver resultados' : 'Siguiente →'}
        </button>
      </div>
    </div>
  )
}
