'use client'

// === RESULTADO DEL EXAMEN ===
// Muestra el puntaje, si aprobó o no, y en modo simulacro el detalle de respuestas.
// Props: result (datos del examen), questions, answers, nivel

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { QuizQuestion, ExamResult, ExamLevel } from '@/types'
import ProgressBar from '@/components/ui/ProgressBar'

// Umbral de aprobación por nivel
const PASSING_SCORE: Record<ExamLevel, number> = {
  facil: 60,
  medio: 65,
  dificil: 70,
  simulacro: 70,
}

interface ExamResultProps {
  result: ExamResult
  questions: QuizQuestion[]
  answers: (number | null)[]
  nivel: ExamLevel
}

export default function ExamResultComponent({ result, questions, answers, nivel }: ExamResultProps) {
  const passing = PASSING_SCORE[nivel]
  const { score, total, percentage, passed } = result

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">

      {/* Panel principal de resultado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl border-2 p-8 text-center mb-8 ${
          passed
            ? 'border-vial-green bg-green-50'
            : 'border-vial-red bg-red-50'
        }`}
      >
        {/* Ícono grande */}
        <div className="text-6xl mb-4">{passed ? '🎉' : '📚'}</div>

        {/* Título */}
        <h2 className={`text-2xl font-bold mb-2 ${passed ? 'text-green-800' : 'text-red-800'}`}>
          {passed ? '¡Aprobaste!' : 'No aprobaste esta vez'}
        </h2>

        {/* Puntaje */}
        <p className={`text-lg mb-1 ${passed ? 'text-green-700' : 'text-red-700'}`}>
          {score} de {total} correctas — <strong>{percentage}%</strong>
        </p>

        <p className={`text-sm mb-6 ${passed ? 'text-green-600' : 'text-red-600'}`}>
          {passed
            ? `¡Bien! Superaste el umbral de aprobación (${passing}%).`
            : `Necesitás al menos ${passing}% para aprobar. ¡Seguí practicando!`
          }
        </p>

        {/* Barra de puntaje */}
        <div className="max-w-xs mx-auto">
          <ProgressBar
            value={percentage}
            color={passed ? 'green' : 'yellow'}
            size="md"
            showLabel
            label="Puntaje"
          />
        </div>

        {/* XP ganada */}
        <p className="mt-4 text-sm font-semibold text-vial-asphalt-light">
          {passed ? '+XP ganados por aprobar' : 'Ganaste XP por participar'}
        </p>
      </motion.div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <Link
          href={`/examenes/${nivel}`}
          className="flex-1 py-3 bg-vial-blue text-white rounded-xl font-bold text-center hover:bg-blue-700 transition-colors"
        >
          Intentar de nuevo
        </Link>
        <Link
          href="/examenes"
          className="flex-1 py-3 border border-vial-gray-mid text-vial-asphalt-dark rounded-xl font-bold text-center hover:border-vial-blue hover:text-vial-blue transition-colors"
        >
          Cambiar nivel
        </Link>
        <Link
          href="/lecciones"
          className="flex-1 py-3 border border-vial-gray-mid text-vial-asphalt-dark rounded-xl font-bold text-center hover:border-vial-blue hover:text-vial-blue transition-colors"
        >
          Repasar lecciones
        </Link>
      </div>

      {/* Detalle por pregunta (solo en simulacro) */}
      {nivel === 'simulacro' && (
        <div>
          <h3 className="text-lg font-bold text-vial-asphalt-dark mb-4">
            Revisión detallada
          </h3>
          <div className="space-y-4">
            {questions.map((question, idx) => {
              const userAnswer = answers[idx]
              const isCorrect = userAnswer === question.correctIndex

              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`p-4 rounded-xl border ${
                    isCorrect
                      ? 'border-vial-green bg-green-50'
                      : 'border-vial-red bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Indicador correcto/incorrecto */}
                    <span className="flex-shrink-0 mt-0.5">
                      {isCorrect ? (
                        <svg className="w-5 h-5 text-vial-green" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-vial-red" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>

                    <div className="flex-1 min-w-0">
                      {/* Número de pregunta + texto */}
                      <p className={`text-sm font-semibold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                        {idx + 1}. {question.question}
                      </p>

                      {/* Respuesta del usuario */}
                      {userAnswer !== null && (
                        <p className={`text-xs mb-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          Tu respuesta: {question.options[userAnswer]}
                        </p>
                      )}
                      {userAnswer === null && (
                        <p className="text-xs mb-1 text-red-700 italic">Sin respuesta (tiempo agotado)</p>
                      )}

                      {/* Respuesta correcta (si erró) */}
                      {!isCorrect && (
                        <p className="text-xs text-green-700 font-semibold mb-1">
                          Respuesta correcta: {question.options[question.correctIndex]}
                        </p>
                      )}

                      {/* Explicación */}
                      <p className={`text-xs leading-relaxed ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
