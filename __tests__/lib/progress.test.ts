import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getProgress, saveProgress, addXP, completeLesson, updateStreak, recordGame } from '@/lib/progress'
import type { UserProgress } from '@/types'

// Mock de localStorage para correr en jsdom
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

// Reemplazar el localStorage global antes de cada test
beforeEach(() => {
  Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock,
    writable: true,
  })
  localStorageMock.clear()
})

// Progreso vacío de referencia
const emptyProgress: UserProgress = {
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

// --- Tests de getProgress ---

describe('getProgress', () => {
  it('devuelve progreso vacío si no hay nada guardado', () => {
    const progress = getProgress()
    expect(progress.xp).toBe(0)
    expect(progress.level).toBe(1)
    expect(progress.completedLessons).toHaveLength(0)
    expect(progress.badges).toHaveLength(0)
  })

  it('devuelve el progreso guardado si existe', () => {
    const saved: UserProgress = {
      ...emptyProgress,
      xp: 500,
      level: 3,
      completedLessons: ['leccion-1'],
    }
    localStorageMock.setItem('manejate-progress', JSON.stringify(saved))
    const progress = getProgress()
    expect(progress.xp).toBe(500)
    expect(progress.level).toBe(3)
    expect(progress.completedLessons).toContain('leccion-1')
  })
})

// --- Tests de saveProgress ---

describe('saveProgress', () => {
  it('guarda el progreso en localStorage', () => {
    const progress: UserProgress = { ...emptyProgress, xp: 100 }
    saveProgress(progress)
    const raw = localStorageMock.getItem('manejate-progress')
    expect(raw).not.toBeNull()
    const parsed = JSON.parse(raw!)
    expect(parsed.xp).toBe(100)
  })
})

// --- Tests de addXP ---

describe('addXP', () => {
  it('suma XP correctamente', () => {
    const result = addXP(emptyProgress, 100)
    expect(result.xp).toBe(100)
  })

  it('recalcula el nivel cuando se acumula suficiente XP', () => {
    // 200 XP necesarios para pasar al nivel 2
    const result = addXP(emptyProgress, 200)
    expect(result.level).toBe(2)
  })

  it('no baja el nivel si ya tenía XP previo', () => {
    const progress: UserProgress = { ...emptyProgress, xp: 400, level: 2 }
    const result = addXP(progress, 100)
    expect(result.xp).toBe(500)
    expect(result.level).toBe(3)
  })

  it('no retorna XP negativo si amount es 0', () => {
    const result = addXP(emptyProgress, 0)
    expect(result.xp).toBe(0)
  })
})

// --- Tests de completeLesson ---

describe('completeLesson', () => {
  it('agrega el slug a completedLessons', () => {
    const result = completeLesson(emptyProgress, 'senales-de-transito')
    expect(result.completedLessons).toContain('senales-de-transito')
  })

  it('agrega 50 XP al completar una lección', () => {
    const result = completeLesson(emptyProgress, 'senales-de-transito')
    expect(result.xp).toBe(50)
  })

  it('no duplica la lección si ya estaba completada', () => {
    const progress: UserProgress = {
      ...emptyProgress,
      completedLessons: ['senales-de-transito'],
      xp: 50,
    }
    const result = completeLesson(progress, 'senales-de-transito')
    expect(result.completedLessons).toHaveLength(1)
    // No debe sumar más XP si ya estaba completada
    expect(result.xp).toBe(50)
  })

  it('puede completar múltiples lecciones distintas', () => {
    let progress = completeLesson(emptyProgress, 'leccion-1')
    progress = completeLesson(progress, 'leccion-2')
    expect(progress.completedLessons).toHaveLength(2)
    expect(progress.xp).toBe(100)
  })
})

// --- Tests de updateStreak ---

describe('updateStreak', () => {
  it('no modifica el streak si ya se registró hoy', () => {
    const today = '2026-04-05'
    const progress: UserProgress = {
      ...emptyProgress,
      streak: { current: 3, lastDate: today },
    }
    const result = updateStreak(progress, today)
    expect(result.streak.current).toBe(3)
  })

  it('incrementa el streak si fue ayer', () => {
    const progress: UserProgress = {
      ...emptyProgress,
      streak: { current: 3, lastDate: '2026-04-04' },
    }
    const result = updateStreak(progress, '2026-04-05')
    expect(result.streak.current).toBe(4)
    expect(result.streak.lastDate).toBe('2026-04-05')
  })

  it('resetea el streak si se saltó más de un día', () => {
    const progress: UserProgress = {
      ...emptyProgress,
      streak: { current: 5, lastDate: '2026-04-01' },
    }
    const result = updateStreak(progress, '2026-04-05')
    expect(result.streak.current).toBe(1)
    expect(result.streak.lastDate).toBe('2026-04-05')
  })

  it('inicia el streak en 1 si no había registro previo', () => {
    const result = updateStreak(emptyProgress, '2026-04-05')
    expect(result.streak.current).toBe(1)
    expect(result.streak.lastDate).toBe('2026-04-05')
  })
})
