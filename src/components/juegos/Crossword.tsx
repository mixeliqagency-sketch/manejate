'use client'

// === CROSSWORD — Juego de definiciones (crucigrama simplificado) ===
// Muestra una lista de definiciones (pistas). El usuario escribe la palabra correcta.
// Al hacer click en "Verificar", se muestran cuáles están bien y cuáles mal.
// No es un crucigrama visual: es un juego de "adivinar la palabra por su definición".

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { filterByLesson, pickRandom } from '@/lib/questions'
import type { GameChildProps } from '@/components/juegos/GameWrapper'
import type { HangmanWord } from '@/types'
import hangmanData from '../../../data/hangman-words.json'

// Cantidad de palabras por ronda
const WORDS_PER_ROUND = 8

interface WordState {
  item: HangmanWord
  userAnswer: string
  // null = no verificado, true = correcto, false = incorrecto
  result: boolean | null
}

export default function Crossword({ lessonFilter, onGameComplete }: GameChildProps) {
  // Seleccionar palabras al montar
  const initialWords = useMemo<HangmanWord[]>(() => {
    const all = hangmanData as HangmanWord[]
    const filtered = lessonFilter ? filterByLesson(all, lessonFilter) : all
    return pickRandom(filtered, WORDS_PER_ROUND)
  }, [lessonFilter])

  const [wordStates, setWordStates] = useState<WordState[]>(() =>
    initialWords.map(item => ({ item, userAnswer: '', result: null }))
  )
  const [verified, setVerified] = useState(false)

  if (initialWords.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-vial-gray-mid bg-white p-10 text-center">
        <span className="text-5xl" role="img" aria-label="Sin palabras">📭</span>
        <p className="text-lg font-semibold text-vial-asphalt-dark">
          No hay palabras para esta lección todavía.
        </p>
      </div>
    )
  }

  // Actualizar la respuesta del usuario para una palabra
  function handleInput(index: number, value: string) {
    if (verified) return
    setWordStates(prev => prev.map((ws, i) =>
      i === index ? { ...ws, userAnswer: value.toUpperCase() } : ws
    ))
  }

  // Verificar todas las respuestas
  function handleVerify() {
    setWordStates(prev => prev.map(ws => ({
      ...ws,
      result: ws.userAnswer.trim().toUpperCase() === ws.item.word.toUpperCase(),
    })))
    setVerified(true)
  }

  // Calcular resultado final y llamar a onGameComplete
  function handleFinish() {
    const correct = wordStates.filter(ws => ws.result === true).length
    const score = Math.round((correct / wordStates.length) * 100)
    const xp = score >= 70 ? 20 : 10
    onGameComplete(score, xp)
  }

  const allAnswered = wordStates.every(ws => ws.userAnswer.trim() !== '')

  return (
    <div className="flex flex-col gap-6">
      {/* Instrucción */}
      <div className="rounded-xl border border-vial-blue/20 bg-vial-blue/5 p-4">
        <p className="text-sm font-semibold text-vial-blue">
          Leé cada definición y escribí la palabra correspondiente
        </p>
        <p className="mt-1 text-xs text-vial-asphalt-light">
          Escribí en MAYÚSCULAS o minúsculas, no importa. Cuando termines, hacé click en "Verificar".
        </p>
      </div>

      {/* Lista de palabras */}
      <div className="flex flex-col gap-4">
        {wordStates.map((ws, index) => (
          <motion.div
            key={ws.item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={[
              'rounded-2xl border p-4 transition-all duration-300',
              ws.result === true
                ? 'border-vial-green bg-vial-green/5'
                : ws.result === false
                ? 'border-vial-red bg-vial-red/5'
                : 'border-vial-gray-mid bg-white',
            ].join(' ')}
          >
            {/* Número y definición */}
            <div className="flex items-start gap-3 mb-3">
              <span className={[
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                ws.result === true
                  ? 'bg-vial-green text-white'
                  : ws.result === false
                  ? 'bg-vial-red text-white'
                  : 'bg-vial-blue/10 text-vial-blue',
              ].join(' ')}>
                {index + 1}
              </span>
              <p className="text-sm leading-snug text-vial-asphalt-dark pt-0.5">
                {ws.item.hint}
              </p>
            </div>

            {/* Input de respuesta */}
            <div className="flex items-center gap-3 pl-10">
              <input
                type="text"
                value={ws.userAnswer}
                onChange={e => handleInput(index, e.target.value)}
                disabled={verified}
                placeholder="Escribí la palabra..."
                aria-label={`Respuesta ${index + 1}`}
                className={[
                  'flex-1 rounded-xl border px-3 py-2 text-sm font-medium uppercase tracking-wider outline-none transition-all duration-200',
                  ws.result === true
                    ? 'border-vial-green bg-vial-green/5 text-vial-green'
                    : ws.result === false
                    ? 'border-vial-red bg-vial-red/5 text-vial-red'
                    : 'border-vial-gray-mid bg-white text-vial-asphalt-dark focus:border-vial-blue focus:ring-2 focus:ring-vial-blue/20',
                ].join(' ')}
              />

              {/* Feedback icon */}
              {ws.result !== null && (
                <span aria-hidden="true">
                  {ws.result ? (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M5 11l4.5 4.5L17 7" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <div className="text-xs text-vial-red font-medium">
                      → {ws.item.word}
                    </div>
                  )}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Botón verificar o terminar */}
      <div className="flex justify-end">
        <AnimatePresence mode="wait">
          {!verified ? (
            <motion.button
              key="verify"
              type="button"
              onClick={handleVerify}
              disabled={!allAnswered}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={[
                'rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 active:scale-95',
                allAnswered
                  ? 'bg-vial-blue hover:bg-vial-blue-light cursor-pointer'
                  : 'bg-vial-gray-mid cursor-not-allowed',
              ].join(' ')}
            >
              Verificar respuestas
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
