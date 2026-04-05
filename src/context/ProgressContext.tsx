'use client'
// === CONTEXTO GLOBAL DE PROGRESO DEL USUARIO ===
// Provee el estado de progreso a toda la app y lo sincroniza con localStorage.

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import type { UserProgress, GameType } from '@/types'
import {
  getProgress,
  saveProgress,
  addXP as addXPFn,
  completeLesson as completeLessonFn,
  recordGame as recordGameFn,
  updateStreak,
} from '@/lib/progress'

// --- Tipo del contexto ---
// Define qué valores y funciones estarán disponibles para toda la app.
interface ProgressContextValue {
  // Estado actual del progreso
  progress: UserProgress
  // Badges desbloqueados en esta sesión (para mostrar notificaciones)
  newBadges: string[]
  // Limpiar badges notificados (después de mostrarlos)
  clearNewBadges: () => void
  // Agregar XP manualmente
  addXP: (amount: number) => void
  // Marcar una lección como completada
  completeLesson: (slug: string) => void
  // Registrar una partida jugada
  recordGame: (gameType: GameType, score: number, xpEarned: number) => void
}

// --- Creación del contexto ---
const ProgressContext = createContext<ProgressContextValue | null>(null)

// --- Proveedor del contexto ---
// Envuelve la app y provee el estado de progreso a todos los componentes hijos.
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => getProgress())
  // Badges ganados en esta sesión, para mostrar notificaciones
  const [newBadges, setNewBadges] = useState<string[]>([])

  // Al montar el componente, actualizar la racha del día de hoy
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0] // formato YYYY-MM-DD
    setProgress(prev => {
      const updated = updateStreak(prev, today)
      // Detectar badges nuevos que se hayan ganado por la racha
      const gainedBadges = updated.badges.filter(b => !prev.badges.includes(b))
      if (gainedBadges.length > 0) {
        setNewBadges(prev => [...prev, ...gainedBadges])
      }
      return updated
    })
  }, [])

  // Cada vez que el progreso cambia, guardarlo en localStorage
  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  // --- Limpiar badges de notificación ---
  const clearNewBadges = useCallback(() => {
    setNewBadges([])
  }, [])

  // --- Agregar XP ---
  const addXP = useCallback((amount: number) => {
    setProgress(prev => {
      const updated = addXPFn(prev, amount)
      // Detectar badges nuevos
      const gainedBadges = updated.badges.filter(b => !prev.badges.includes(b))
      if (gainedBadges.length > 0) {
        setNewBadges(nb => [...nb, ...gainedBadges])
      }
      return updated
    })
  }, [])

  // --- Completar una lección ---
  const completeLesson = useCallback((slug: string) => {
    setProgress(prev => {
      const updated = completeLessonFn(prev, slug)
      // Detectar badges nuevos
      const gainedBadges = updated.badges.filter(b => !prev.badges.includes(b))
      if (gainedBadges.length > 0) {
        setNewBadges(nb => [...nb, ...gainedBadges])
      }
      return updated
    })
  }, [])

  // --- Registrar una partida ---
  const recordGame = useCallback((gameType: GameType, score: number, xpEarned: number) => {
    setProgress(prev => {
      const updated = recordGameFn(prev, gameType, score, xpEarned)
      // Detectar badges nuevos
      const gainedBadges = updated.badges.filter(b => !prev.badges.includes(b))
      if (gainedBadges.length > 0) {
        setNewBadges(nb => [...nb, ...gainedBadges])
      }
      return updated
    })
  }, [])

  return (
    <ProgressContext.Provider
      value={{
        progress,
        newBadges,
        clearNewBadges,
        addXP,
        completeLesson,
        recordGame,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

// --- Hook para consumir el contexto ---
// Lanza un error claro si se usa fuera del ProgressProvider.
export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) {
    throw new Error('useProgress debe usarse dentro de un <ProgressProvider>')
  }
  return ctx
}
