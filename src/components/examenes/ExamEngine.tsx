'use client'

// === MOTOR DE EXAMEN ===
// Configurable por nivel: fácil, medio, difícil, simulacro.
// Maneja el timer, las preguntas, el progreso y el resultado final.

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { QuizQuestion, ExamLevel, ExamResult } from '@/types'
import { useProgress } from '@/context/ProgressContext'
import ProgressBar from '@/components/ui/ProgressBar'
import Timer from '@/components/ui/Timer'
import ExamResultComponent from './ExamResult'
import quizData from '../../../data/quiz.json'

// Configuración de cada nivel de examen
const EXAM_CONFIGS: Record<ExamLevel, {
  questionCount: number
  timePerQuestion: number | null
  totalTime: number | null
  showFeedback: 'immediate' | 'end'
  passingScore: number
  xpReward: number
}> = {
  facil: {
    questionCount: 10,
    timePerQuestion: null,
    totalTime: null,
    showFeedback: 'immediate',
    passingScore: 60,
    xpReward: 100,
  },
  medio: {
    questionCount: 20,
    timePerQuestion: 30,
    totalTime: null,
    showFeedback: 'end',
    passingScore: 65,
    xpReward: 200,
  },
  dificil: {
    questionCount: 30,
    timePerQuestion: 20,
    totalTime: null,
    showFeedback: 'end',
    passingScore: 70,
    xpReward: 300,
  },
  simulacro: {
    questionCount: 30,
    timePerQuestion: null,
    totalTime: 45 * 60, // 45 minutos en segundos
    showFeedback: 'end',
    passingScore: 70,
    xpReward: 500,
  },
}

// Seleccionar N preguntas al azar del pool
function pickRandom(questions: QuizQuestion[], count: number): QuizQuestion[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

// Nombres y emojis de niveles para mostrar en pantalla
const levelDisplay: Record<ExamLevel, { name: string; emoji: string }> = {
  facil: { name: 'Fácil', emoji: '🟢' },
  medio: { name: 'Medio', emoji: '🟡' },
  dificil: { name: 'Difícil', emoji: '🔴' },
  simulacro: { name: 'Simulacro', emoji: '🎓' },
}

interface ExamEngineProps {
  nivel: ExamLevel
}

export default function ExamEngine({ nivel }: ExamEngineProps) {
  const { progress, addXP } = useProgress()
  const config = EXAM_CONFIGS[nivel]
  const display = levelDisplay[nivel]

  // Preguntas seleccionadas al azar
  const [questions] = useState(() =>
    pickRandom(quizData as QuizQuestion[], config.questionCount)
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(config.questionCount).fill(null)
  )
  const [selected, setSelected] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [examFinished, setExamFinished] = useState(false)
  const [examResult, setExamResult] = useState<ExamResult | null>(null)
  const [timerKey, setTimerKey] = useState(0) // para resetear el timer por pregunta

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length

  // Calcular resultado final del examen
  const finishExam = useCallback((finalAnswers: (number | null)[]) => {
    const correctCount = finalAnswers.reduce<number>((acc, ans, idx) => {
      return acc + (ans === questions[idx].correctIndex ? 1 : 0)
    }, 0)

    const total = questions.length
    const percentage = Math.round((correctCount / total) * 100)
    const passed = percentage >= config.passingScore

    // Calcular correctas por lección
    const byLesson: Record<string, { correct: number; total: number }> = {}
    questions.forEach((q, idx) => {
      if (!byLesson[q.lessonSlug]) {
        byLesson[q.lessonSlug] = { correct: 0, total: 0 }
      }
      byLesson[q.lessonSlug].total++
      if (finalAnswers[idx] === q.correctIndex) {
        byLesson[q.lessonSlug].correct++
      }
    })

    const result: ExamResult = {
      level: nivel,
      date: new Date().toISOString(),
      score: correctCount,
      total,
      percentage,
      passed,
      byLesson,
    }

    // Sumar XP si aprobó
    if (passed) {
      addXP(config.xpReward)
    } else {
      // Igual suma un poco de XP por intentarlo
      addXP(Math.floor(config.xpReward * 0.2))
    }

    setExamResult(result)
    setExamFinished(true)
  }, [questions, config, nivel, addXP])

  // Manejar cuando se acaba el tiempo (por pregunta o total)
  const handleTimeUp = useCallback(() => {
    if (config.timePerQuestion) {
      // Se acabó el tiempo de esta pregunta: registrar null y avanzar
      const newAnswers = [...answers]
      newAnswers[currentIndex] = null
      setAnswers(newAnswers)

      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex(prev => prev + 1)
        setSelected(null)
        setShowFeedback(false)
        setTimerKey(prev => prev + 1)
      } else {
        finishExam(newAnswers)
      }
    } else if (config.totalTime) {
      // Se acabó el tiempo total del simulacro
      finishExam(answers)
    }
  }, [config, answers, currentIndex, totalQuestions, finishExam])

  // Manejar selección de respuesta
  const handleSelect = (index: number) => {
    if (showFeedback) return // ya respondió esta pregunta

    setSelected(index)
    const newAnswers = [...answers]
    newAnswers[currentIndex] = index
    setAnswers(newAnswers)

    if (config.showFeedback === 'immediate') {
      setShowFeedback(true)
    } else {
      // En modo sin feedback, avanzar automáticamente
      setTimeout(() => {
        if (currentIndex < totalQuestions - 1) {
          setCurrentIndex(prev => prev + 1)
          setSelected(null)
          setTimerKey(prev => prev + 1)
        } else {
          finishExam(newAnswers)
        }
      }, 400)
    }
  }

  // Avanzar a la siguiente pregunta (modo con feedback)
  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelected(null)
      setShowFeedback(false)
      setTimerKey(prev => prev + 1)
    } else {
      finishExam(answers)
    }
  }

  // Si el examen terminó, mostrar resultado
  if (examFinished && examResult) {
    return (
      <ExamResultComponent
        result={examResult}
        questions={questions}
        answers={answers}
        nivel={nivel}
      />
    )
  }

  const progressPercent = Math.round(((currentIndex + (showFeedback ? 1 : 0)) / totalQuestions) * 100)
  const isCorrect = selected === currentQuestion.correctIndex

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">

      {/* Encabezado del examen */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-sm font-semibold text-vial-asphalt-light">
            {display.emoji} Examen {display.name}
          </span>
          <p className="text-xs text-vial-asphalt-light mt-0.5">
            Pregunta {currentIndex + 1} de {totalQuestions}
          </p>
        </div>

        {/* Timer según configuración */}
        {config.totalTime && (
          <Timer
            key="total-timer"
            totalSeconds={config.totalTime}
            onTimeUp={handleTimeUp}
          />
        )}
        {config.timePerQuestion && (
          <Timer
            key={`q-timer-${timerKey}`}
            totalSeconds={config.timePerQuestion}
            onTimeUp={handleTimeUp}
          />
        )}
      </div>

      {/* Barra de progreso */}
      <ProgressBar value={progressPercent} color="blue" size="sm" className="mb-6" />

      {/* Tarjeta de pregunta */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="bg-vial-white rounded-2xl border border-vial-gray-mid p-6 shadow-sm"
        >
          {/* Texto de la pregunta */}
          <p className="text-base font-semibold text-vial-asphalt-dark leading-relaxed mb-5">
            {currentQuestion.question}
          </p>

          {/* Opciones de respuesta */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let optionStyle = 'border-vial-gray-mid bg-vial-white text-vial-asphalt hover:border-vial-blue cursor-pointer'

              if (showFeedback || (selected !== null && config.showFeedback === 'end')) {
                if (index === currentQuestion.correctIndex) {
                  optionStyle = 'border-vial-green bg-green-50 text-green-800 cursor-default'
                } else if (index === selected && index !== currentQuestion.correctIndex) {
                  optionStyle = 'border-vial-red bg-red-50 text-red-800 cursor-default'
                } else {
                  optionStyle = 'border-vial-gray-mid bg-vial-gray-light text-vial-asphalt-light cursor-default opacity-50'
                }
              } else if (selected === index) {
                optionStyle = 'border-vial-blue bg-blue-50 text-vial-blue cursor-pointer'
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showFeedback || (selected !== null && config.showFeedback === 'end')}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-colors ${optionStyle}`}
                >
                  <span className="font-bold mr-2 opacity-60">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              )
            })}
          </div>

          {/* Feedback inmediato (solo en modo fácil) */}
          {showFeedback && config.showFeedback === 'immediate' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`mt-4 p-4 rounded-xl text-sm ${
                isCorrect
                  ? 'bg-green-50 border border-vial-green text-green-800'
                  : 'bg-red-50 border border-vial-red text-red-800'
              }`}
            >
              <p className="font-bold mb-1">{isCorrect ? '¡Correcto! +5 XP' : 'Incorrecto'}</p>
              <p>{currentQuestion.explanation}</p>
            </motion.div>
          )}

          {/* Botón siguiente (en modo fácil con feedback) */}
          {showFeedback && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleNext}
              className="mt-4 w-full py-3 bg-vial-blue text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              {currentIndex < totalQuestions - 1 ? 'Siguiente pregunta' : 'Ver resultado'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Indicadores de progreso visual */}
      <div className="mt-6 flex flex-wrap gap-1.5 justify-center">
        {questions.map((_, idx) => {
          let dotStyle = 'bg-vial-gray-mid'
          if (idx < currentIndex) {
            dotStyle = answers[idx] === questions[idx].correctIndex
              ? 'bg-vial-green'
              : 'bg-vial-red'
          } else if (idx === currentIndex) {
            dotStyle = 'bg-vial-blue'
          }
          return (
            <div
              key={idx}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${dotStyle}`}
              title={`Pregunta ${idx + 1}`}
            />
          )
        })}
      </div>
    </div>
  )
}
