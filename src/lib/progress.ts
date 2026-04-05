// === GESTIÓN DEL PROGRESO DEL USUARIO EN MANEJATE ===
// Lee, escribe y actualiza el progreso del usuario usando localStorage.

import type { UserProgress, GameType } from '@/types'
import { getLevelForXP, checkNewBadges, XP_REWARDS } from '@/lib/gamification'

// Clave usada para guardar el progreso en localStorage
const STORAGE_KEY = 'manejate-progress'

// --- Progreso vacío inicial ---
// Se usa cuando el usuario entra por primera vez (sin datos guardados).
function createEmptyProgress(): UserProgress {
  return {
    xp: 0,
    level: 1,
    completedLessons: [],
    badges: [],
    gamesPlayed: {} as UserProgress['gamesPlayed'],
    examHistory: [],
    streak: { current: 0, lastDate: '' },
    correctAnswersStreak: 0,
    totalCorrectAnswers: 0,
  }
}

// --- Leer progreso desde localStorage ---
// Si no hay datos guardados, devuelve un progreso vacío.
export function getProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return createEmptyProgress()
    return JSON.parse(raw) as UserProgress
  } catch {
    // Si el JSON está corrupto, empezar desde cero
    return createEmptyProgress()
  }
}

// --- Guardar progreso en localStorage ---
export function saveProgress(progress: UserProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

// --- Agregar XP al progreso ---
// Suma el XP, recalcula el nivel y verifica si se ganaron nuevos badges.
export function addXP(progress: UserProgress, amount: number): UserProgress {
  const newXP = progress.xp + amount
  const newLevel = getLevelForXP(newXP)

  const updated: UserProgress = {
    ...progress,
    xp: newXP,
    level: newLevel.level,
  }

  // Verificar si se ganaron nuevos badges con el XP actualizado
  const newBadgeIds = checkNewBadges(updated)
  if (newBadgeIds.length > 0) {
    updated.badges = [...updated.badges, ...newBadgeIds]
  }

  return updated
}

// --- Completar una lección ---
// Agrega el slug a completedLessons (si no estaba ya) y suma 50 XP.
export function completeLesson(progress: UserProgress, slug: string): UserProgress {
  // Si ya estaba completada, no hacer nada
  if (progress.completedLessons.includes(slug)) {
    return progress
  }

  const withLesson: UserProgress = {
    ...progress,
    completedLessons: [...progress.completedLessons, slug],
  }

  // Sumar XP por completar la lección
  return addXP(withLesson, XP_REWARDS.completeLesson)
}

// --- Registrar una partida jugada ---
// Actualiza el historial de juegos y suma el XP ganado.
export function recordGame(
  progress: UserProgress,
  gameType: GameType,
  score: number,
  xpEarned: number
): UserProgress {
  const current = progress.gamesPlayed[gameType] ?? { played: 0, bestScore: 0 }
  const updatedGamesPlayed = {
    ...progress.gamesPlayed,
    [gameType]: {
      played: current.played + 1,
      bestScore: Math.max(current.bestScore, score),
    },
  }

  const withGame: UserProgress = {
    ...progress,
    gamesPlayed: updatedGamesPlayed,
  }

  return addXP(withGame, xpEarned)
}

// --- Actualizar la racha diaria ---
// Recibe la fecha de hoy en formato 'YYYY-MM-DD'.
// - Si ya se registró hoy → no hace nada (evita duplicar).
// - Si fue ayer → incrementa la racha.
// - Si pasó más de un día → resetea la racha a 1.
// - Sin historial previo → inicia racha en 1.
export function updateStreak(progress: UserProgress, today: string): UserProgress {
  const { lastDate, current } = progress.streak

  // Si ya se registró hoy, no modificar nada
  if (lastDate === today) {
    return progress
  }

  let newCurrent = 1 // Por defecto, empezar racha en 1

  if (lastDate) {
    // Calcular diferencia en días entre lastDate y today
    const last = new Date(lastDate)
    const todayDate = new Date(today)
    const diffMs = todayDate.getTime() - last.getTime()
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      // Día consecutivo → incrementar racha
      newCurrent = current + 1
    }
    // Si diffDays > 1, la racha se rompe y queda en 1
  }

  const updated: UserProgress = {
    ...progress,
    streak: { current: newCurrent, lastDate: today },
  }

  // Verificar si se ganó el badge de racha-7 u otros
  const newBadgeIds = checkNewBadges(updated)
  if (newBadgeIds.length > 0) {
    updated.badges = [...updated.badges, ...newBadgeIds]
  }

  return updated
}
