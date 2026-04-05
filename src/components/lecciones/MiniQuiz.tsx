'use client'

// === MINI QUIZ AL FINAL DE CADA LECCIÓN ===
// Muestra 3-5 preguntas filtradas por lessonSlug.
// Feedback inmediato por pregunta + puntaje final.
// Usa useProgress para registrar respuestas correctas.

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { QuizQuestion } from '@/types'
import { useProgress } from '@/context/ProgressContext'

interface MiniQuizProps {
  questions: QuizQuestion[]
  lessonSlug: string
}

export default function MiniQuiz({ questions, lessonSlug }: MiniQuizProps) {
  const { addXP } = useProgress()

  // Estado del quiz
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  // Si no hay preguntas para esta lección, no mostrar nada
  if (questions.length === 0) {
    return null
  }

  const currentQuestion = questions[currentIndex]
  const isCorrect = selected === currentQuestion.correctIndex

  // Manejar selección de opción
  const handleSelect = (index: number) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)

    if (index === currentQuestion.correctIndex) {
      setCorrectCount(prev => prev + 1)
      // 5 XP por respuesta correcta en mini quiz
      addXP(5)
    }
  }

  // Avanzar a la siguiente pregunta
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      setFinished(true)
    }
  }

  // Reiniciar el quiz
  const handleRestart = () => {
    setCurrentIndex(0)
    setSelected(null)
    setAnswered(false)
    setCorrectCount(0)
    setFinished(false)
  }

  const scorePercent = Math.round((correctCount / questions.length) * 100)

  // Pantalla de resultado final
  if (finished) {
    const passed = scorePercent >= 60
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 p-6 rounded-2xl border-2 border-vial-gray-mid text-center"
      >
        <div className="text-5xl mb-3">{passed ? '🎉' : '📚'}</div>
        <h3 className="text-xl font-bold text-vial-asphalt-dark mb-1">
          {passed ? '¡Muy bien!' : 'Seguí practicando'}
        </h3>
        <p className="text-vial-asphalt-light mb-4">
          Respondiste <span className="font-bold text-vial-asphalt-dark">{correctCount} de {questions.length}</span> preguntas correctamente ({scorePercent}%)
        </p>

        {/* Barra de puntaje */}
        <div className="w-full bg-vial-gray-mid rounded-full h-3 mb-6 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${passed ? 'bg-vial-green' : 'bg-vial-yellow'}`}
            initial={{ width: 0 }}
            animate={{ width: `${scorePercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        <button
          onClick={handleRestart}
          className="px-6 py-2.5 bg-vial-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Volver a intentar
        </button>
      </motion.div>
    )
  }

  return (
    <div className="mt-8 p-6 bg-vial-gray-light rounded-2xl border border-vial-gray-mid">
      {/* Encabezado del mini quiz */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-vial-asphalt-dark">
          Preguntas de repaso
        </h3>
        <span className="text-sm text-vial-asphalt-light">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="w-full bg-vial-gray-mid rounded-full h-1.5 mb-5">
        <div
          className="bg-vial-blue h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + (answered ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Pregunta */}
          <p className="text-sm font-semibold text-vial-asphalt-dark mb-4 leading-relaxed">
            {currentQuestion.question}
          </p>

          {/* Opciones */}
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => {
              // Determinar el estilo de cada opción según el estado
              let optionClass = 'border-vial-gray-mid bg-vial-white text-vial-asphalt hover:border-vial-blue cursor-pointer'

              if (answered) {
                if (index === currentQuestion.correctIndex) {
                  optionClass = 'border-vial-green bg-green-50 text-green-800 cursor-default'
                } else if (index === selected && index !== currentQuestion.correctIndex) {
                  optionClass = 'border-vial-red bg-red-50 text-red-800 cursor-default'
                } else {
                  optionClass = 'border-vial-gray-mid bg-vial-gray-light text-vial-asphalt-light cursor-default opacity-60'
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={answered}
                  className={`w-full text-left p-3 rounded-xl border text-sm transition-colors ${optionClass}`}
                >
                  <span className="font-medium mr-2 opacity-60">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              )
            })}
          </div>

          {/* Feedback después de responder */}
          {answered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`mt-4 p-3 rounded-xl text-sm ${
                isCorrect
                  ? 'bg-green-50 border border-vial-green text-green-800'
                  : 'bg-red-50 border border-vial-red text-red-800'
              }`}
            >
              <p className="font-semibold mb-1">{isCorrect ? '¡Correcto!' : 'Incorrecto'}</p>
              <p className="leading-relaxed">{currentQuestion.explanation}</p>
              {currentQuestion.source && (
                <p className="mt-1 text-xs opacity-70">Fuente: {currentQuestion.source}</p>
              )}
            </motion.div>
          )}

          {/* Botón siguiente */}
          {answered && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleNext}
              className="mt-4 w-full py-2.5 bg-vial-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm"
            >
              {currentIndex < questions.length - 1 ? 'Siguiente pregunta' : 'Ver resultado'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
