'use client'

// === HANGMAN — Juego del ahorcado ===
// Palabra del código vial, mostrada como guiones bajos.
// Teclado clickeable A-Z para adivinar letras.
// SVG del ahorcado que avanza con cada error (6 partes = cabeza, cuerpo, brazo izq, brazo der, pierna izq, pierna der).
// Ganás cuando revelás todas las letras. Perdés a los 6 errores.

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { filterByLesson, pickRandom } from '@/lib/questions'
import type { GameChildProps } from '@/components/juegos/GameWrapper'
import type { HangmanWord } from '@/types'
import hangmanData from '../../../data/hangman-words.json'

const MAX_WRONG = 6
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// === SVG del Ahorcado ===
// Cada parte aparece cuando wrongCount supera cierto umbral
function HangmanDrawing({ wrongCount }: { wrongCount: number }) {
  return (
    <svg
      viewBox="0 0 120 140"
      className="w-40 h-40 mx-auto"
      aria-label={`Figura del ahorcado: ${wrongCount} errores`}
    >
      {/* Estructura (siempre visible) */}
      {/* Base */}
      <line x1="10" y1="130" x2="110" y2="130" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
      {/* Poste vertical */}
      <line x1="30" y1="130" x2="30" y2="10" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
      {/* Viga horizontal */}
      <line x1="30" y1="10" x2="80" y2="10" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
      {/* Cuerda */}
      <line x1="80" y1="10" x2="80" y2="30" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />

      {/* Cabeza (error 1) */}
      {wrongCount >= 1 && (
        <motion.circle
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          cx="80" cy="42" r="12"
          stroke="#C62828" strokeWidth="3" fill="none"
        />
      )}
      {/* Cuerpo (error 2) */}
      {wrongCount >= 2 && (
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          x1="80" y1="54" x2="80" y2="95"
          stroke="#C62828" strokeWidth="3" strokeLinecap="round"
        />
      )}
      {/* Brazo izquierdo (error 3) */}
      {wrongCount >= 3 && (
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          x1="80" y1="65" x2="60" y2="80"
          stroke="#C62828" strokeWidth="3" strokeLinecap="round"
        />
      )}
      {/* Brazo derecho (error 4) */}
      {wrongCount >= 4 && (
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          x1="80" y1="65" x2="100" y2="80"
          stroke="#C62828" strokeWidth="3" strokeLinecap="round"
        />
      )}
      {/* Pierna izquierda (error 5) */}
      {wrongCount >= 5 && (
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          x1="80" y1="95" x2="62" y2="115"
          stroke="#C62828" strokeWidth="3" strokeLinecap="round"
        />
      )}
      {/* Pierna derecha (error 6) */}
      {wrongCount >= 6 && (
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          x1="80" y1="95" x2="98" y2="115"
          stroke="#C62828" strokeWidth="3" strokeLinecap="round"
        />
      )}
    </svg>
  )
}

export default function Hangman({ lessonFilter, onGameComplete }: GameChildProps) {
  // Seleccionar una palabra aleatoria
  const wordItem = useMemo<HangmanWord | null>(() => {
    const all = hangmanData as HangmanWord[]
    const filtered = lessonFilter ? filterByLesson(all, lessonFilter) : all
    const picked = pickRandom(filtered, 1)
    return picked.length > 0 ? picked[0] : null
  }, [lessonFilter])

  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set())
  const [gameOver, setGameOver] = useState(false)

  if (!wordItem) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-vial-gray-mid bg-white p-10 text-center">
        <span className="text-5xl" role="img" aria-label="Sin palabras">📭</span>
        <p className="text-lg font-semibold text-vial-asphalt-dark">
          No hay palabras para esta lección todavía.
        </p>
      </div>
    )
  }

  const word = wordItem.word.toUpperCase()
  // Solo contar letras únicas (ignorar espacios)
  const uniqueLetters = new Set(word.replace(/\s/g, '').split(''))

  // Letras mal adivinadas
  const wrongLetters = [...guessedLetters].filter(l => !word.includes(l))
  const wrongCount = wrongLetters.length

  // Verificar estado
  const isWon = [...uniqueLetters].every(l => guessedLetters.has(l))
  const isLost = wrongCount >= MAX_WRONG

  function handleLetterClick(letter: string) {
    if (gameOver || isWon || isLost) return
    if (guessedLetters.has(letter)) return

    const newGuessed = new Set(guessedLetters)
    newGuessed.add(letter)
    setGuessedLetters(newGuessed)

    const newWrong = [...newGuessed].filter(l => !word.includes(l)).length
    const newIsWon = [...uniqueLetters].every(l => newGuessed.has(l))
    const newIsLost = newWrong >= MAX_WRONG

    if (newIsWon || newIsLost) {
      setGameOver(true)
      setTimeout(() => {
        const score = newIsWon ? Math.max(40, Math.round((1 - newWrong / MAX_WRONG) * 100)) : 0
        const xp = newIsWon ? 20 : 5
        onGameComplete(score, xp)
      }, 1500)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Pista */}
      <div className="rounded-xl border border-vial-blue/20 bg-vial-blue/5 p-4 text-sm text-vial-asphalt-dark">
        <span className="font-semibold text-vial-blue">Pista: </span>
        {wordItem.hint}
      </div>

      {/* Layout: dibujo + palabra */}
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-vial-gray-mid bg-white p-6 shadow-sm">
        {/* SVG del ahorcado */}
        <HangmanDrawing wrongCount={wrongCount} />

        {/* Contador de errores */}
        <p className={[
          'text-sm font-semibold',
          wrongCount >= MAX_WRONG ? 'text-vial-red' : 'text-vial-asphalt-light',
        ].join(' ')}>
          Errores: {wrongCount} / {MAX_WRONG}
        </p>

        {/* Palabra como guiones */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {word.split('').map((letter, index) => {
            if (letter === ' ') {
              return <div key={index} className="w-4" />
            }
            const revealed = guessedLetters.has(letter) || isLost
            return (
              <div key={index} className="flex flex-col items-center gap-1">
                <AnimatePresence>
                  {revealed ? (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={[
                        'text-xl font-bold',
                        isLost && !guessedLetters.has(letter)
                          ? 'text-vial-red'
                          : 'text-vial-asphalt-dark',
                      ].join(' ')}
                    >
                      {letter}
                    </motion.span>
                  ) : (
                    <span className="text-xl font-bold text-transparent select-none">A</span>
                  )}
                </AnimatePresence>
                <div className={[
                  'h-0.5 w-7 rounded-full',
                  revealed && !isLost ? 'bg-vial-green' : isLost && !guessedLetters.has(letter) ? 'bg-vial-red' : 'bg-vial-asphalt-light',
                ].join(' ')} />
              </div>
            )
          })}
        </div>

        {/* Mensaje de resultado */}
        <AnimatePresence>
          {(isWon || isLost) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={[
                'rounded-xl px-6 py-3 text-center font-bold text-sm',
                isWon ? 'bg-vial-green/10 text-vial-green' : 'bg-vial-red/10 text-vial-red',
              ].join(' ')}
            >
              {isWon ? `¡Ganaste! La palabra era ${word}` : `¡Perdiste! La palabra era ${word}`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Teclado */}
      <div className="flex flex-wrap justify-center gap-1.5">
        {ALPHABET.map(letter => {
          const isGuessed = guessedLetters.has(letter)
          const isWrong = isGuessed && !word.includes(letter)
          const isCorrect = isGuessed && word.includes(letter)

          return (
            <button
              key={letter}
              type="button"
              onClick={() => handleLetterClick(letter)}
              disabled={isGuessed || isWon || isLost}
              aria-label={`Letra ${letter}`}
              className={[
                'flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold transition-all duration-150 active:scale-95',
                isWrong
                  ? 'bg-vial-red/10 text-vial-red border border-vial-red/20 cursor-default opacity-50'
                  : isCorrect
                  ? 'bg-vial-green/10 text-vial-green border border-vial-green/20 cursor-default'
                  : isWon || isLost
                  ? 'bg-vial-gray-light text-vial-asphalt-light border border-vial-gray-mid cursor-default opacity-50'
                  : 'bg-white border border-vial-gray-mid text-vial-asphalt-dark hover:border-vial-blue/40 hover:bg-vial-blue/5 cursor-pointer',
              ].join(' ')}
            >
              {letter}
            </button>
          )
        })}
      </div>
    </div>
  )
}
