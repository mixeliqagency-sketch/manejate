import { describe, it, expect } from 'vitest'
import { LEVELS, BADGES, getLevelForXP, getXPForNextLevel, checkNewBadges } from '@/lib/gamification'
import type { UserProgress } from '@/types'

// Progreso vacío para reutilizar en los tests
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

// --- Tests de LEVELS y BADGES ---

describe('LEVELS', () => {
  it('tiene 7 niveles definidos', () => {
    expect(LEVELS).toHaveLength(7)
  })

  it('el primer nivel es Peatón con 0 XP requerido', () => {
    expect(LEVELS[0]).toEqual({ level: 1, name: 'Peatón', xpRequired: 0 })
  })

  it('el último nivel es Instructor con 5000 XP requerido', () => {
    expect(LEVELS[6]).toEqual({ level: 7, name: 'Instructor', xpRequired: 5000 })
  })
})

describe('BADGES', () => {
  it('tiene 8 badges definidos', () => {
    expect(BADGES).toHaveLength(8)
  })

  it('todos los badges tienen id, name, description, icon y condition', () => {
    for (const badge of BADGES) {
      expect(badge).toHaveProperty('id')
      expect(badge).toHaveProperty('name')
      expect(badge).toHaveProperty('description')
      expect(badge).toHaveProperty('icon')
      expect(badge).toHaveProperty('condition')
    }
  })

  it('incluye el badge primera-leccion', () => {
    const badge = BADGES.find(b => b.id === 'primera-leccion')
    expect(badge).toBeDefined()
  })
})

// --- Tests de getLevelForXP ---

describe('getLevelForXP', () => {
  it('0 XP → nivel 1 Peatón', () => {
    const result = getLevelForXP(0)
    expect(result.level).toBe(1)
    expect(result.name).toBe('Peatón')
  })

  it('100 XP → nivel 1 Peatón (debajo de 200)', () => {
    const result = getLevelForXP(100)
    expect(result.level).toBe(1)
    expect(result.name).toBe('Peatón')
  })

  it('200 XP → nivel 2 Acompañante', () => {
    const result = getLevelForXP(200)
    expect(result.level).toBe(2)
    expect(result.name).toBe('Acompañante')
  })

  it('500 XP → nivel 3 Aprendiz', () => {
    const result = getLevelForXP(500)
    expect(result.level).toBe(3)
    expect(result.name).toBe('Aprendiz')
  })

  it('1000 XP → nivel 4 Conductor Novato', () => {
    const result = getLevelForXP(1000)
    expect(result.level).toBe(4)
    expect(result.name).toBe('Conductor Novato')
  })

  it('1500 XP → nivel 4 Conductor Novato (entre 1000 y 2000)', () => {
    const result = getLevelForXP(1500)
    expect(result.level).toBe(4)
  })

  it('5000+ XP → nivel 7 Instructor', () => {
    const result = getLevelForXP(5000)
    expect(result.level).toBe(7)
    expect(result.name).toBe('Instructor')
  })

  it('XP muy alto → sigue siendo nivel 7 (máximo)', () => {
    const result = getLevelForXP(99999)
    expect(result.level).toBe(7)
  })
})

// --- Tests de getXPForNextLevel ---

describe('getXPForNextLevel', () => {
  it('0 XP → needed=200, progress=0%', () => {
    const result = getXPForNextLevel(0)
    expect(result.needed).toBe(200)
    expect(result.progress).toBe(0)
  })

  it('100 XP → needed=200, progress=50%', () => {
    const result = getXPForNextLevel(100)
    expect(result.needed).toBe(200)
    expect(result.progress).toBe(50)
  })

  it('500 XP → needed=1000 (nivel 3→4), progress=0%', () => {
    const result = getXPForNextLevel(500)
    expect(result.needed).toBe(1000)
    expect(result.progress).toBe(0)
  })

  it('750 XP → progreso parcial entre nivel 3 y 4', () => {
    const result = getXPForNextLevel(750)
    // Nivel 3 necesita 500, nivel 4 necesita 1000. Diferencia = 500. XP en nivel = 250. Progress = 50%
    expect(result.needed).toBe(1000)
    expect(result.progress).toBe(50)
  })

  it('9999 XP → nivel máximo, progress=100%', () => {
    const result = getXPForNextLevel(9999)
    expect(result.progress).toBe(100)
  })
})

// --- Tests de checkNewBadges ---

describe('checkNewBadges', () => {
  it('sin progreso → no otorga badges', () => {
    const newBadges = checkNewBadges(emptyProgress)
    expect(newBadges).toHaveLength(0)
  })

  it('completedLessons incluye el-conductor-responsable → otorga primera-leccion', () => {
    const progress: UserProgress = {
      ...emptyProgress,
      completedLessons: ['el-conductor-responsable'],
    }
    const newBadges = checkNewBadges(progress)
    expect(newBadges).toContain('primera-leccion')
  })

  it('cualquier leccion completada → otorga primera-leccion', () => {
    const progress: UserProgress = {
      ...emptyProgress,
      completedLessons: ['cualquier-leccion'],
    }
    const newBadges = checkNewBadges(progress)
    expect(newBadges).toContain('primera-leccion')
  })

  it('12 lecciones completadas → otorga estudioso', () => {
    const progress: UserProgress = {
      ...emptyProgress,
      completedLessons: Array.from({ length: 12 }, (_, i) => `leccion-${i}`),
    }
    const newBadges = checkNewBadges(progress)
    expect(newBadges).toContain('estudioso')
  })

  it('menos de 12 lecciones → no otorga estudioso', () => {
    const progress: UserProgress = {
      ...emptyProgress,
      completedLessons: Array.from({ length: 5 }, (_, i) => `leccion-${i}`),
    }
    const newBadges = checkNewBadges(progress)
    expect(newBadges).not.toContain('estudioso')
  })

  it('streak.current >= 7 → otorga racha-7', () => {
    const progress: UserProgress = {
      ...emptyProgress,
      streak: { current: 7, lastDate: '2026-04-05' },
    }
    const newBadges = checkNewBadges(progress)
    expect(newBadges).toContain('racha-7')
  })

  it('streak.current < 7 → no otorga racha-7', () => {
    const progress: UserProgress = {
      ...emptyProgress,
      streak: { current: 6, lastDate: '2026-04-05' },
    }
    const newBadges = checkNewBadges(progress)
    expect(newBadges).not.toContain('racha-7')
  })

  it('ya tiene el badge → no lo vuelve a otorgar', () => {
    const progress: UserProgress = {
      ...emptyProgress,
      completedLessons: ['el-conductor-responsable'],
      badges: ['primera-leccion'],
    }
    const newBadges = checkNewBadges(progress)
    expect(newBadges).not.toContain('primera-leccion')
  })

  it('ya tiene racha-7 → no lo vuelve a otorgar aunque streak >= 7', () => {
    const progress: UserProgress = {
      ...emptyProgress,
      streak: { current: 10, lastDate: '2026-04-05' },
      badges: ['racha-7'],
    }
    const newBadges = checkNewBadges(progress)
    expect(newBadges).not.toContain('racha-7')
  })
})
