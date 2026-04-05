'use client'

// === GAME WRAPPER — Contenedor compartido para todos los juegos ===
// Provee:
// - Encabezado con nombre del juego y filtro por lección
// - Reinicio automático al cambiar el filtro (gameKey++)
// - Pantalla de resultado al completar la partida (score, XP, botones)
// - Guarda el progreso con useProgress().recordGame

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProgress } from '@/context/ProgressContext'
import type { GameType } from '@/types'
import lessonsData from '../../../data/lessons-meta.json'

// Tipo de lección mínimo que necesitamos
interface LessonOption {
  id: number
  slug: string
  title: string
}

const lessons = lessonsData as LessonOption[]

// Props que GameWrapper pasa a sus hijos
export interface GameChildProps {
  // Slug de lección seleccionada, o '' para todas
  lessonFilter: string
  // Llamar cuando el juego termina: score en 0-100, xp ganado
  onGameComplete: (score: number, xp: number) => void
  // Reiniciar la partida sin cambiar filtro
  onRestart: () => void
  // Cambia cada vez que se reinicia o cambia filtro — fuerza remount de hijos
  gameKey: number
}

interface GameWrapperProps {
  // Tipo del juego (para recordGame)
  gameType: GameType
  // Nombre para mostrar en el encabezado
  gameName: string
  // Componente hijo que implementa el juego concreto
  children: (props: GameChildProps) => React.ReactNode
}

// Pantalla de resultado
function ResultScreen({
  score,
  xp,
  onPlayAgain,
  onBack,
}: {
  score: number
  xp: number
  onPlayAgain: () => void
  onBack: () => void
}) {
  // Determinar mensaje y color según score
  const passed = score >= 70
  const message = score >= 90
    ? '¡Excelente! Sos un experto vial.'
    : score >= 70
    ? '¡Muy bien! Seguí practicando.'
    : '¡Casi! Repasá y volvé a intentarlo.'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center gap-6 rounded-2xl border border-vial-gray-mid bg-white p-8 shadow-lg text-center"
    >
      {/* Ícono resultado */}
      <div className={[
        'flex h-20 w-20 items-center justify-center rounded-full',
        passed ? 'bg-vial-green/10' : 'bg-vial-red/10',
      ].join(' ')}>
        {passed ? (
          // Check verde
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d="M10 21l7 7 13-14" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          // X rojo
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d="M13 13l14 14M27 13L13 27" stroke="#C62828" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Score */}
      <div>
        <div className="text-5xl font-bold tracking-tight text-vial-asphalt-dark">
          {score}%
        </div>
        <p className="mt-2 text-base text-vial-asphalt-light">{message}</p>
      </div>

      {/* XP ganado */}
      <div className="flex items-center gap-2 rounded-xl bg-vial-yellow/10 px-5 py-2.5 text-sm font-semibold text-vial-yellow-dark">
        {/* Ícono estrella */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 1l1.8 3.6L14 5.7l-3 2.9.7 4.1L8 10.8 4.3 12.7l.7-4.1-3-2.9 4.2-.5L8 1z" fill="currentColor" />
        </svg>
        +{xp} XP ganados
      </div>

      {/* Botones de acción */}
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onPlayAgain}
          className="flex-1 rounded-xl bg-vial-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-vial-blue-light active:scale-95"
        >
          Jugar de nuevo
        </button>
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-xl border border-vial-gray-mid px-5 py-3 text-sm font-semibold text-vial-asphalt transition-colors hover:bg-vial-gray-light active:scale-95"
        >
          Volver a juegos
        </button>
      </div>
    </motion.div>
  )
}

export default function GameWrapper({ gameType, gameName, children }: GameWrapperProps) {
  const { recordGame } = useProgress()

  // Filtro de lección: '' significa todas las lecciones
  const [lessonFilter, setLessonFilter] = useState<string>('')
  // gameKey: incrementar fuerza el remount del componente hijo (reinicia el juego)
  const [gameKey, setGameKey] = useState(0)
  // Estado de la partida
  const [gameResult, setGameResult] = useState<{ score: number; xp: number } | null>(null)

  // Cambiar filtro de lección → reiniciar juego automáticamente
  function handleFilterChange(slug: string) {
    setLessonFilter(slug)
    setGameResult(null)
    setGameKey(k => k + 1)
  }

  // El juego hijo llama esto cuando termina
  const handleGameComplete = useCallback((score: number, xp: number) => {
    setGameResult({ score, xp })
    recordGame(gameType, score, xp)
  }, [gameType, recordGame])

  // Reiniciar sin cambiar filtro
  const handleRestart = useCallback(() => {
    setGameResult(null)
    setGameKey(k => k + 1)
  }, [])

  // Volver al índice de juegos
  function handleBack() {
    if (typeof window !== 'undefined') {
      window.location.href = '/juegos'
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Encabezado: nombre del juego + selector de lección */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Título del juego */}
        <div>
          <h1 className="text-2xl font-bold text-vial-asphalt-dark sm:text-3xl">
            {gameName}
          </h1>
        </div>

        {/* Filtro por lección */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="lesson-filter"
            className="shrink-0 text-sm font-medium text-vial-asphalt-light"
          >
            Filtrar por lección:
          </label>
          <select
            id="lesson-filter"
            value={lessonFilter}
            onChange={e => handleFilterChange(e.target.value)}
            className="rounded-xl border border-vial-gray-mid bg-white px-3 py-2 text-sm text-vial-asphalt shadow-sm transition-colors focus:border-vial-blue focus:outline-none focus:ring-2 focus:ring-vial-blue/20"
          >
            <option value="">Todas las lecciones</option>
            {lessons.map(lesson => (
              <option key={lesson.slug} value={lesson.slug}>
                {lesson.id}. {lesson.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contenido: pantalla de resultado o el juego en sí */}
      <AnimatePresence mode="wait">
        {gameResult ? (
          <ResultScreen
            key="result"
            score={gameResult.score}
            xp={gameResult.xp}
            onPlayAgain={handleRestart}
            onBack={handleBack}
          />
        ) : (
          <motion.div
            key={`game-${gameKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {children({
              lessonFilter,
              onGameComplete: handleGameComplete,
              onRestart: handleRestart,
              gameKey,
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
