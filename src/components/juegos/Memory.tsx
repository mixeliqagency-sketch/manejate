'use client'

// === MEMORY — Juego de pares de señales y significados ===
// Grilla de cartas boca abajo. Cada par: señal (label) + significado (meaning).
// Hacer click en dos cartas: si coinciden, se quedan visibles. Si no, se voltean.
// Niveles: fácil (6 pares), medio (10 pares), difícil (15 pares).

import { useMemo, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { filterByLesson, pickRandom, shuffleArray } from '@/lib/questions'
import type { GameChildProps } from '@/components/juegos/GameWrapper'
import type { MemoryPair } from '@/types'
import memoryData from '../../../data/memory-pairs.json'

// Niveles de dificultad: cantidad de pares
const DIFFICULTY_PAIRS = { facil: 6, medio: 10, dificil: 15 } as const
type Difficulty = keyof typeof DIFFICULTY_PAIRS

// Una carta en el tablero (puede ser del tipo "señal" o "significado")
interface Card {
  id: string        // Único por carta
  pairId: string    // Mismo pairId para las dos cartas del par
  type: 'signal' | 'meaning'
  text: string
}

// Colores por dificultad para el badge
const DIFF_COLORS: Record<Difficulty, string> = {
  facil: 'bg-vial-green/10 text-vial-green',
  medio: 'bg-vial-yellow/10 text-vial-yellow-dark',
  dificil: 'bg-vial-red/10 text-vial-red',
}

export default function Memory({ lessonFilter, onGameComplete }: GameChildProps) {
  // Dificultad seleccionada
  const [difficulty, setDifficulty] = useState<Difficulty>('medio')
  // Si el juego comenzó (seleccionando la dificultad primero)
  const [started, setStarted] = useState(false)

  // Cartas en el tablero (mezcladas)
  const cards = useMemo<Card[]>(() => {
    if (!started) return []
    const all = memoryData as MemoryPair[]
    const filtered = lessonFilter ? filterByLesson(all, lessonFilter) : all
    const pairs = pickRandom(filtered, DIFFICULTY_PAIRS[difficulty])
    // Crear dos cartas por par
    const cardList: Card[] = []
    pairs.forEach(pair => {
      cardList.push({ id: `${pair.id}-s`, pairId: pair.id, type: 'signal', text: pair.signalLabel })
      cardList.push({ id: `${pair.id}-m`, pairId: pair.id, type: 'meaning', text: pair.meaning })
    })
    return shuffleArray(cardList)
  }, [started, difficulty, lessonFilter])

  // IDs de cartas actualmente volteadas (máximo 2)
  const [flipped, setFlipped] = useState<string[]>([])
  // IDs de cartas ya emparejadas (se quedan visibles)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  // Bloqueo mientras se comparan dos cartas
  const [locked, setLocked] = useState(false)
  // Cantidad de intentos
  const [attempts, setAttempts] = useState(0)
  // Tiempo transcurrido en segundos
  const [elapsed, setElapsed] = useState(0)
  // Última carta que parpadeó en rojo (feedback de error)
  const [wrongFlash, setWrongFlash] = useState<string[]>([])

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Iniciar timer cuando comienza el juego
  useEffect(() => {
    if (!started) return
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [started])

  // Verificar si ganó
  useEffect(() => {
    if (!started || cards.length === 0) return
    if (matched.size === cards.length) {
      // Detener timer
      if (timerRef.current) clearInterval(timerRef.current)
      // Calcular score: basado en eficiencia de intentos
      const minAttempts = cards.length / 2  // Mínimo teórico = todos emparejados al primer intento
      const efficiency = Math.max(0, 1 - (attempts - minAttempts) / (minAttempts * 2))
      const score = Math.round(efficiency * 100)
      const xp = score >= 70 ? 20 : 10
      setTimeout(() => onGameComplete(score, xp), 800)
    }
  }, [matched, cards.length, started, attempts, onGameComplete])

  // Manejar click en carta
  function handleCardClick(cardId: string) {
    if (locked) return
    if (matched.has(cardId)) return
    if (flipped.includes(cardId)) return

    const newFlipped = [...flipped, cardId]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setAttempts(a => a + 1)
      setLocked(true)

      // Buscar las cartas para comparar pairId
      const [first, second] = newFlipped.map(id => cards.find(c => c.id === id)!)
      if (first.pairId === second.pairId) {
        // ¡Par correcto!
        setMatched(prev => new Set([...prev, first.id, second.id]))
        setFlipped([])
        setLocked(false)
      } else {
        // Error: mostrar flash rojo y voltear después de 1 segundo
        setWrongFlash(newFlipped)
        setTimeout(() => {
          setFlipped([])
          setWrongFlash([])
          setLocked(false)
        }, 1000)
      }
    }
  }

  // Formatear tiempo en mm:ss
  function formatTime(s: number): string {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  // Pantalla de selección de dificultad
  if (!started) {
    return (
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-vial-gray-mid bg-white p-8 text-center shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-vial-asphalt-dark">Elegí la dificultad</h2>
          <p className="mt-1 text-sm text-vial-asphalt-light">
            Encontrá todos los pares de señales y significados
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          {(Object.keys(DIFFICULTY_PAIRS) as Difficulty[]).map(diff => (
            <button
              key={diff}
              type="button"
              onClick={() => { setDifficulty(diff); setStarted(true) }}
              className={[
                'rounded-xl border-2 px-6 py-4 text-left transition-all duration-150 active:scale-95',
                difficulty === diff
                  ? 'border-vial-blue bg-vial-blue/5'
                  : 'border-vial-gray-mid hover:border-vial-blue/40',
              ].join(' ')}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold capitalize text-vial-asphalt-dark">{diff}</span>
                <span className={['rounded-full px-2.5 py-0.5 text-xs font-medium', DIFF_COLORS[diff]].join(' ')}>
                  {DIFFICULTY_PAIRS[diff]} pares
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Calcular columnas de la grilla según dificultad
  const gridCols = difficulty === 'facil' ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-4 sm:grid-cols-5'

  return (
    <div className="flex flex-col gap-5">
      {/* Estadísticas superiores */}
      <div className="flex items-center justify-between rounded-xl border border-vial-gray-mid bg-white px-4 py-3 text-sm shadow-sm">
        <span className="text-vial-asphalt-light">
          Pares: <strong className="text-vial-asphalt-dark">{matched.size / 2}/{cards.length / 2}</strong>
        </span>
        <span className="text-vial-asphalt-light">
          Intentos: <strong className="text-vial-asphalt-dark">{attempts}</strong>
        </span>
        <span className="text-vial-asphalt-light">
          Tiempo: <strong className="text-vial-asphalt-dark">{formatTime(elapsed)}</strong>
        </span>
      </div>

      {/* Grilla de cartas */}
      <div className={['grid gap-2.5', gridCols].join(' ')}>
        {cards.map(card => {
          const isFlipped = flipped.includes(card.id) || matched.has(card.id)
          const isMatched = matched.has(card.id)
          const isWrong = wrongFlash.includes(card.id)

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleCardClick(card.id)}
              disabled={isMatched || locked}
              aria-label={isFlipped ? card.text : 'Carta boca abajo'}
              className={[
                'relative aspect-square rounded-xl border-2 transition-all duration-200 overflow-hidden text-xs font-medium leading-tight p-2 flex items-center justify-center text-center',
                isMatched
                  ? 'border-vial-green bg-vial-green/10 text-vial-green cursor-default'
                  : isWrong
                  ? 'border-vial-red bg-vial-red/10 text-vial-red'
                  : isFlipped
                  ? 'border-vial-blue bg-vial-blue/5 text-vial-asphalt-dark cursor-default'
                  : 'border-vial-gray-mid bg-vial-gray-light text-transparent hover:border-vial-blue/40 hover:bg-vial-blue/5 cursor-pointer',
              ].join(' ')}
            >
              <AnimatePresence mode="wait">
                {isFlipped ? (
                  <motion.span
                    key="front"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={isMatched ? 'text-vial-green' : isWrong ? 'text-vial-red' : 'text-vial-asphalt-dark'}
                  >
                    {card.text}
                  </motion.span>
                ) : (
                  <motion.span
                    key="back"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-vial-gray-mid text-2xl select-none"
                    aria-hidden="true"
                  >
                    ?
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )
        })}
      </div>

      {/* Indicador de tipo: señal vs significado */}
      <div className="flex items-center justify-center gap-6 text-xs text-vial-asphalt-light">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded border-2 border-vial-blue bg-vial-blue/5 inline-block" />
          Señal / Concepto
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded border-2 border-vial-green bg-vial-green/10 inline-block" />
          Par encontrado
        </span>
      </div>
    </div>
  )
}
