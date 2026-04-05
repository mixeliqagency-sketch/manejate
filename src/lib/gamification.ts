// === MOTOR DE GAMIFICACIÓN DE MANEJATE ===
// Este módulo define los niveles, badges y lógica de progreso del usuario.

import type { LevelInfo, BadgeInfo, UserProgress } from '@/types'

// --- Niveles del sistema ---
// Cada nivel tiene un nombre temático y la cantidad de XP necesaria para alcanzarlo.
export const LEVELS: LevelInfo[] = [
  { level: 1, name: 'Peatón',           xpRequired: 0 },
  { level: 2, name: 'Acompañante',      xpRequired: 200 },
  { level: 3, name: 'Aprendiz',         xpRequired: 500 },
  { level: 4, name: 'Conductor Novato', xpRequired: 1000 },
  { level: 5, name: 'Conductor Seguro', xpRequired: 2000 },
  { level: 6, name: 'Conductor Experto',xpRequired: 3500 },
  { level: 7, name: 'Instructor',       xpRequired: 5000 },
]

// --- Badges disponibles ---
// Cada badge tiene una condición textual (usada para mostrar al usuario cómo ganarlo).
export const BADGES: BadgeInfo[] = [
  {
    id: 'primera-leccion',
    name: 'Primera Lección',
    description: 'Completaste tu primera lección.',
    icon: '📖',
    condition: 'Completar al menos 1 lección.',
  },
  {
    id: 'memoria-acero',
    name: 'Memoria de Acero',
    description: 'Completaste el juego de memoria.',
    icon: '🧠',
    condition: 'Jugar al menos una partida de Memoria.',
  },
  {
    id: 'crucigrama-master',
    name: 'Crucigrama Master',
    description: 'Completaste un crucigrama.',
    icon: '🔤',
    condition: 'Completar un crucigrama.',
  },
  {
    id: 'aprobado',
    name: '¡Aprobado!',
    description: 'Aprobaste tu primer examen.',
    icon: '🎓',
    condition: 'Aprobar al menos un examen.',
  },
  {
    id: 'racha-7',
    name: 'Racha Imparable',
    description: 'Estudiaste 7 días seguidos.',
    icon: '🔥',
    condition: 'Mantener una racha de 7 días.',
  },
  {
    id: 'sabelotodo',
    name: 'Sabelotodo',
    description: 'Respondiste 50 preguntas correctas.',
    icon: '⭐',
    condition: 'Acumular 50 respuestas correctas.',
  },
  {
    id: 'estudioso',
    name: 'Estudioso',
    description: 'Completaste 12 lecciones.',
    icon: '📚',
    condition: 'Completar 12 lecciones.',
  },
  {
    id: 'completista',
    name: 'Completista',
    description: 'Jugaste todos los tipos de juegos.',
    icon: '🏆',
    condition: 'Jugar al menos una partida de cada tipo de juego.',
  },
]

// --- Recompensas de XP por actividad ---
export const XP_REWARDS = {
  completeLesson: 50,
  gameEasy:       10,
  gameMedium:     20,
  gameHard:       30,
  examFacil:      100,
  examMedio:      200,
  examDificil:    300,
  examSimulacro:  500,
  dailyStreak:    25,
} as const

// --- Obtener el nivel correspondiente a cierta cantidad de XP ---
// Devuelve el nivel más alto que el usuario puede tener con ese XP.
export function getLevelForXP(xp: number): LevelInfo {
  // Recorremos los niveles de mayor a menor para encontrar el primero que aplica
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) {
      return LEVELS[i]
    }
  }
  // Por defecto, nivel 1
  return LEVELS[0]
}

// --- Calcular cuánto XP falta para el próximo nivel ---
// Devuelve el XP del próximo nivel y el porcentaje de progreso en el nivel actual.
export function getXPForNextLevel(xp: number): { needed: number; progress: number } {
  const currentLevel = getLevelForXP(xp)

  // Si ya estamos en el nivel máximo, retornar 100% de progreso
  if (currentLevel.level === LEVELS.length) {
    return { needed: currentLevel.xpRequired, progress: 100 }
  }

  // Encontrar el siguiente nivel
  const nextLevel = LEVELS[currentLevel.level] // el array está en base 0, el nivel en base 1

  // XP dentro del nivel actual (desde el inicio del nivel hasta ahora)
  const xpInCurrentLevel = xp - currentLevel.xpRequired
  // Total de XP necesario para pasar de este nivel al próximo
  const xpNeededForNext = nextLevel.xpRequired - currentLevel.xpRequired
  // Progreso como porcentaje (0-100)
  const progress = Math.min(100, Math.floor((xpInCurrentLevel / xpNeededForNext) * 100))

  return {
    needed: nextLevel.xpRequired,
    progress,
  }
}

// --- Verificar qué badges nuevos se desbloquearon ---
// Compara las condiciones actuales del usuario con los badges que ya tiene.
// Devuelve un array con los IDs de los badges nuevos (no incluidos en progress.badges).
export function checkNewBadges(progress: UserProgress): string[] {
  const newBadges: string[] = []

  // Helper para agregar solo si el usuario no lo tiene ya
  const grantIfNew = (badgeId: string) => {
    if (!progress.badges.includes(badgeId)) {
      newBadges.push(badgeId)
    }
  }

  // primera-leccion: completó al menos 1 lección
  if (progress.completedLessons.length >= 1) {
    grantIfNew('primera-leccion')
  }

  // estudioso: completó 12 o más lecciones
  if (progress.completedLessons.length >= 12) {
    grantIfNew('estudioso')
  }

  // racha-7: tiene una racha de 7 o más días
  if (progress.streak.current >= 7) {
    grantIfNew('racha-7')
  }

  // aprobado: aprobó al menos un examen
  if (progress.examHistory.some(exam => exam.passed)) {
    grantIfNew('aprobado')
  }

  // sabelotodo: acumuló 50 respuestas correctas
  if (progress.totalCorrectAnswers >= 50) {
    grantIfNew('sabelotodo')
  }

  // memoria-acero: jugó al menos una partida de memoria
  if (progress.gamesPlayed?.memory?.played >= 1) {
    grantIfNew('memoria-acero')
  }

  // crucigrama-master: jugó al menos una partida de crucigrama
  if (progress.gamesPlayed?.crossword?.played >= 1) {
    grantIfNew('crucigrama-master')
  }

  // completista: jugó todos los tipos de juegos (al menos 1 partida de cada uno)
  const gameTypes: Array<keyof UserProgress['gamesPlayed']> = [
    'memory', 'quiz', 'true-or-false', 'fill-blank', 'crossword',
    'word-search', 'drag-classify', 'hangman', 'road-situation',
    'exam-simulator', 'order-steps',
  ]
  const playedAll = gameTypes.every(
    type => progress.gamesPlayed?.[type]?.played >= 1
  )
  if (playedAll) {
    grantIfNew('completista')
  }

  return newBadges
}
