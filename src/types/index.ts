// === TIPOS COMPARTIDOS DE MANEJATE ===

// --- Lecciones ---
export interface Lesson {
  id: number
  slug: string
  title: string
  description: string
  topics: string[]
  icon: string
}

// --- Juegos ---
export type GameType =
  | 'memory'
  | 'quiz'
  | 'true-or-false'
  | 'fill-blank'
  | 'crossword'
  | 'word-search'
  | 'drag-classify'
  | 'hangman'
  | 'road-situation'
  | 'exam-simulator'
  | 'order-steps'

export interface GameMeta {
  type: GameType
  name: string
  description: string
  icon: string
  difficulty: 'facil' | 'medio' | 'dificil'
  xpReward: number
}

export interface QuizQuestion {
  id: string
  lessonSlug: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  source: string
}

export interface TrueFalseStatement {
  id: string
  lessonSlug: string
  statement: string
  isTrue: boolean
  explanation: string
  source: string
}

export interface FillBlankItem {
  id: string
  lessonSlug: string
  textBefore: string
  textAfter: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface MemoryPair {
  id: string
  lessonSlug: string
  signal: string
  signalLabel: string
  meaning: string
}

export interface CrosswordClue {
  id: string
  direction: 'horizontal' | 'vertical'
  row: number
  col: number
  answer: string
  clue: string
}

export interface CrosswordPuzzle {
  id: string
  lessonSlug: string
  gridSize: number
  clues: CrosswordClue[]
}

export interface WordSearchPuzzle {
  id: string
  lessonSlug: string
  gridSize: number
  words: { word: string; definition: string }[]
  grid: string[][]
}

export interface SignalItem {
  id: string
  name: string
  category: 'reglamentaria' | 'preventiva' | 'informativa' | 'transitoria'
  description: string
  svgPath: string
}

export interface HangmanWord {
  id: string
  lessonSlug: string
  word: string
  hint: string
}

export interface RoadSituation {
  id: string
  lessonSlug: string
  description: string
  svgScene: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface OrderStepsItem {
  id: string
  lessonSlug: string
  title: string
  steps: string[]
}

export type ExamLevel = 'facil' | 'medio' | 'dificil' | 'simulacro'

export interface ExamConfig {
  level: ExamLevel
  questionCount: number
  timePerQuestion: number | null
  totalTime: number | null
  showExplanations: 'immediate' | 'end' | 'end-detail'
  passingScore: number
}

export interface ExamResult {
  level: ExamLevel
  date: string
  score: number
  total: number
  percentage: number
  passed: boolean
  byLesson: Record<string, { correct: number; total: number }>
}

export interface UserProgress {
  xp: number
  level: number
  completedLessons: string[]
  badges: string[]
  gamesPlayed: Record<GameType, { played: number; bestScore: number }>
  examHistory: ExamResult[]
  streak: { current: number; lastDate: string }
  correctAnswersStreak: number
  totalCorrectAnswers: number
}

export interface LevelInfo {
  level: number
  name: string
  xpRequired: number
}

export interface BadgeInfo {
  id: string
  name: string
  description: string
  icon: string
  condition: string
}
