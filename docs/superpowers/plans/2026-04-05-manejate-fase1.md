# Manejate — Plan de Implementación Fase 1 (Web)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la plataforma web educativa gamificada "Manejate" para aprender normas de tránsito y aprobar el examen teórico de manejo en CABA.

**Architecture:** Next.js App Router con SSG para SEO. Contenido en MDX, datos de juegos en JSON, progreso en localStorage. 11 juegos como componentes React independientes. Sistema de gamificación (XP/niveles/badges) como contexto React con persistencia en localStorage.

**Tech Stack:** Next.js 14, TypeScript, React, Tailwind CSS, Framer Motion, MDX, Vitest

**Spec:** `docs/superpowers/specs/2026-04-05-manejate-design.md`

**Fase 2 (YouTube/Remotion):** Plan separado, se crea después de completar Fase 1.

**Reglas de código:**
- Comentarios en español
- Nunca inventar contenido de tránsito — solo del manual oficial
- UX: el usuario capta en 3 segundos qué es y cómo le resuelve un problema
- Mobile-first responsive
- Nunca hardcodear credenciales

---

## Estructura de archivos

```
manejate/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout raíz con Nav + Footer
│   │   ├── page.tsx                # Home
│   │   ├── lecciones/
│   │   │   ├── page.tsx            # Índice de lecciones (mapa progresivo)
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Lección individual (MDX)
│   │   ├── juegos/
│   │   │   ├── page.tsx            # Índice de juegos
│   │   │   └── [tipo]/
│   │   │       └── page.tsx        # Juego individual
│   │   ├── examenes/
│   │   │   ├── page.tsx            # Índice de exámenes
│   │   │   └── [nivel]/
│   │   │       └── page.tsx        # Examen por nivel
│   │   ├── progreso/
│   │   │   └── page.tsx            # Dashboard de progreso
│   │   └── blog/
│   │       ├── page.tsx            # Índice del blog
│   │       └── [slug]/
│   │           └── page.tsx        # Artículo individual
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx             # Navegación principal
│   │   │   ├── Footer.tsx          # Footer
│   │   │   └── MobileMenu.tsx      # Menú hamburguesa mobile
│   │   ├── ui/
│   │   │   ├── Button.tsx          # Botón reutilizable
│   │   │   ├── Card.tsx            # Card reutilizable
│   │   │   ├── Badge.tsx           # Badge visual
│   │   │   ├── ProgressBar.tsx     # Barra de progreso
│   │   │   ├── Timer.tsx           # Temporizador para exámenes
│   │   │   └── AdSlot.tsx          # Contenedor para AdSense
│   │   ├── home/
│   │   │   ├── Hero.tsx            # Hero section
│   │   │   ├── PathSelector.tsx    # Selector primera licencia / renovación
│   │   │   ├── GamesPreview.tsx    # Preview grilla de juegos
│   │   │   ├── StatsCounter.tsx    # Contadores animados
│   │   │   └── SEOBlock.tsx        # Bloque de texto SEO
│   │   ├── lecciones/
│   │   │   ├── LessonMap.tsx       # Mapa visual progresivo
│   │   │   ├── LessonNav.tsx       # Navegación anterior/siguiente
│   │   │   ├── MiniQuiz.tsx        # Mini-quiz al final de lección
│   │   │   └── KeyFact.tsx         # Card de dato clave
│   │   ├── juegos/
│   │   │   ├── GameWrapper.tsx     # Wrapper compartido (score, XP, tema)
│   │   │   ├── GameCard.tsx        # Card del juego en el índice
│   │   │   ├── Memory.tsx          # Juego Memory
│   │   │   ├── Quiz.tsx            # Juego Quiz/Trivia
│   │   │   ├── TrueOrFalse.tsx     # Juego Verdadero o Falso
│   │   │   ├── FillBlank.tsx       # Juego Completar la frase
│   │   │   ├── Crossword.tsx       # Juego Crucigrama
│   │   │   ├── WordSearch.tsx      # Juego Sopa de letras
│   │   │   ├── DragClassify.tsx    # Juego Arrastra y suelta
│   │   │   ├── Hangman.tsx         # Juego Ahorcado
│   │   │   ├── RoadSituation.tsx   # Juego Situaciones viales
│   │   │   ├── ExamSimulator.tsx   # Simulacro de examen
│   │   │   └── OrderSteps.tsx      # Juego Ordená los pasos
│   │   ├── examenes/
│   │   │   ├── ExamEngine.tsx      # Motor de examen (preguntas + timer)
│   │   │   └── ExamResult.tsx      # Pantalla de resultado
│   │   └── progreso/
│   │       ├── LevelDisplay.tsx    # Nivel actual + barra XP
│   │       ├── BadgeGrid.tsx       # Grilla de badges
│   │       ├── ExamHistory.tsx     # Historial de exámenes
│   │       └── WeakTopics.tsx      # Temas débiles
│   ├── lib/
│   │   ├── gamification.ts         # Lógica XP, niveles, badges
│   │   ├── progress.ts             # CRUD localStorage del progreso
│   │   ├── questions.ts            # Utilidades para cargar/filtrar preguntas
│   │   └── seo.ts                  # Generador de metadata por página
│   ├── context/
│   │   └── ProgressContext.tsx      # Context React para progreso global
│   └── types/
│       └── index.ts                # Tipos TypeScript compartidos
├── content/
│   └── lecciones/
│       ├── el-conductor-responsable.mdx
│       ├── prioridad-normativa.mdx
│       ├── semaforos-y-luces.mdx
│       ├── senales-reglamentarias.mdx
│       ├── senales-preventivas.mdx
│       ├── senales-informativas.mdx
│       ├── demarcacion-horizontal.mdx
│       ├── prioridad-de-paso.mdx
│       ├── giros-y-adelantamiento.mdx
│       ├── velocidades.mdx
│       ├── estacionamiento.mdx
│       └── conduccion-especial.mdx
├── content/
│   └── blog/
│       ├── como-aprobar-examen-teorico-caba.mdx
│       ├── errores-comunes-examen-manejo.mdx
│       ├── requisitos-licencia-conducir-caba.mdx
│       └── diferencia-licencia-profesional-particular.mdx
├── data/
│   ├── quiz.json                   # Preguntas de quiz (por tema)
│   ├── true-false.json             # Afirmaciones V/F (por tema)
│   ├── fill-blank.json             # Frases para completar (por tema)
│   ├── memory-pairs.json           # Pares señal-significado
│   ├── crossword.json              # Crucigramas (por tema)
│   ├── word-search.json            # Sopas de letras (por tema)
│   ├── signals.json                # Catálogo de señales con categoría
│   ├── hangman-words.json          # Palabras + definiciones
│   ├── road-situations.json        # Situaciones viales con SVG data
│   ├── order-steps.json            # Secuencias para ordenar
│   ├── lessons-meta.json           # Metadata de las 12 lecciones
│   └── games-meta.json             # Metadata de los 11 juegos
├── public/
│   ├── signals/                    # SVGs de señales de tránsito
│   └── og/                         # Imágenes OpenGraph por página
├── __tests__/
│   ├── lib/
│   │   ├── gamification.test.ts
│   │   ├── progress.test.ts
│   │   └── questions.test.ts
│   └── components/
│       └── juegos/
│           ├── Memory.test.tsx
│           ├── Quiz.test.tsx
│           └── ExamSimulator.test.tsx
├── tailwind.config.ts
├── next.config.mjs
├── vitest.config.ts
├── package.json
└── tsconfig.json
```

---

## MILESTONE 1: Fundación

### Task 1: Scaffold del proyecto Next.js

**Files:**
- Create: `package.json`, `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`, `vitest.config.ts`, `.gitignore`, `.env.example`

- [ ] **Step 1: Crear proyecto Next.js**

```bash
cd ~/Desktop/manejate
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Cuando pregunte opciones: Yes a TypeScript, ESLint, Tailwind, src/ directory, App Router. No a Turbopack.

- [ ] **Step 2: Instalar dependencias adicionales**

```bash
npm install framer-motion @next/mdx @mdx-js/loader @mdx-js/react next-mdx-remote gray-matter
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 3: Configurar Vitest**

Crear `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './__tests__/setup.ts',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

Crear `__tests__/setup.ts`:

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Configurar script de test en package.json**

Agregar en `scripts`:

```json
{
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 5: Crear .env.example**

```bash
# Manejate - Variables de entorno
# Copiar a .env.local y completar

# Google AdSense (cuando se apruebe)
NEXT_PUBLIC_ADSENSE_ID=

# n8n webhook para sync de progreso (opcional)
NEXT_PUBLIC_N8N_WEBHOOK_URL=
```

- [ ] **Step 6: Configurar .gitignore**

Agregar al `.gitignore` generado:

```
.env.local
.env
.superpowers/
```

- [ ] **Step 7: Verificar que corre**

```bash
npm run dev
```

Esperado: servidor en http://localhost:3000 sin errores.

- [ ] **Step 8: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold proyecto Manejate con Next.js, Tailwind, Vitest"
```

---

### Task 2: Sistema de tipos y configuración de diseño

**Files:**
- Create: `src/types/index.ts`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Definir tipos TypeScript**

Crear `src/types/index.ts`:

```typescript
// === TIPOS COMPARTIDOS DE MANEJATE ===

// --- Lecciones ---
export interface Lesson {
  id: number
  slug: string
  title: string
  description: string
  topics: string[]
  icon: string // nombre del SVG inline
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

// --- Preguntas ---
export interface QuizQuestion {
  id: string
  lessonSlug: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  source: string // referencia al manual
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
  signal: string // nombre SVG o emoji descriptivo
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
  grid: string[][] // grilla pre-generada
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
  svgScene: string // SVG inline de la situación
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface OrderStepsItem {
  id: string
  lessonSlug: string
  title: string
  steps: string[] // en orden correcto
}

// --- Exámenes ---
export type ExamLevel = 'facil' | 'medio' | 'dificil' | 'simulacro'

export interface ExamConfig {
  level: ExamLevel
  questionCount: number
  timePerQuestion: number | null // segundos, null = sin timer
  totalTime: number | null // segundos, null = sin timer global
  showExplanations: 'immediate' | 'end' | 'end-detail'
  passingScore: number // porcentaje
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

// --- Gamificación ---
export interface UserProgress {
  xp: number
  level: number
  completedLessons: string[] // slugs
  badges: string[] // badge ids
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
  condition: string // descripción legible de la condición
}
```

- [ ] **Step 2: Configurar Tailwind con la paleta de Manejate**

Modificar `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Manejate — basada en señalización vial
        vial: {
          blue: '#1565C0',
          'blue-light': '#1E88E5',
          'blue-dark': '#0D47A1',
          yellow: '#FFB300',
          'yellow-light': '#FFCA28',
          'yellow-dark': '#FF8F00',
          green: '#2E7D32',
          'green-light': '#43A047',
          red: '#C62828',
          'red-light': '#E53935',
          asphalt: '#37474F',
          'asphalt-light': '#546E7A',
          'asphalt-dark': '#263238',
          white: '#FAFAFA',
          'gray-light': '#F5F5F5',
          'gray-mid': '#E0E0E0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 3: Verificar build**

```bash
npm run build
```

Esperado: build exitoso sin errores.

- [ ] **Step 4: Commit**

```bash
git add src/types/index.ts tailwind.config.ts
git commit -m "feat: tipos TypeScript y paleta de colores Manejate"
```

---

### Task 3: Componentes UI base

**Files:**
- Create: `src/components/ui/Button.tsx`, `src/components/ui/Card.tsx`, `src/components/ui/ProgressBar.tsx`, `src/components/ui/Badge.tsx`, `src/components/ui/Timer.tsx`, `src/components/ui/AdSlot.tsx`

- [ ] **Step 1: Componente Button**

Crear `src/components/ui/Button.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit'
}

const variants = {
  primary: 'bg-vial-yellow text-vial-asphalt-dark hover:bg-vial-yellow-dark font-bold',
  secondary: 'bg-vial-blue text-white hover:bg-vial-blue-dark font-bold',
  success: 'bg-vial-green text-white hover:bg-vial-green-light font-bold',
  danger: 'bg-vial-red text-white hover:bg-vial-red-light font-bold',
  ghost: 'bg-transparent text-vial-blue hover:bg-vial-gray-light font-medium',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        ${variants[variant]} ${sizes[size]}
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer select-none
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}
```

- [ ] **Step 2: Componente Card**

Crear `src/components/ui/Card.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  hover?: boolean
}

export default function Card({ children, onClick, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.12)' } : undefined}
      className={`
        bg-white rounded-2xl border border-vial-gray-mid
        shadow-sm p-6 transition-all duration-200
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Componente ProgressBar**

Crear `src/components/ui/ProgressBar.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number // 0-100
  color?: 'blue' | 'green' | 'yellow'
  size?: 'sm' | 'md'
  showLabel?: boolean
  label?: string
}

const colors = {
  blue: 'bg-vial-blue',
  green: 'bg-vial-green',
  yellow: 'bg-vial-yellow',
}

export default function ProgressBar({
  value,
  color = 'blue',
  size = 'md',
  showLabel = false,
  label,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between mb-1 text-sm text-vial-asphalt-light">
          {label && <span>{label}</span>}
          {showLabel && <span>{Math.round(clamped)}%</span>}
        </div>
      )}
      <div className={`w-full bg-vial-gray-light rounded-full overflow-hidden ${size === 'sm' ? 'h-2' : 'h-3'}`}>
        <motion.div
          className={`h-full rounded-full ${colors[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Componente Badge**

Crear `src/components/ui/Badge.tsx`:

```tsx
interface BadgeProps {
  children: React.ReactNode
  variant?: 'blue' | 'green' | 'yellow' | 'red' | 'gray'
  size?: 'sm' | 'md'
}

const variants = {
  blue: 'bg-vial-blue/10 text-vial-blue',
  green: 'bg-vial-green/10 text-vial-green',
  yellow: 'bg-vial-yellow/20 text-vial-yellow-dark',
  red: 'bg-vial-red/10 text-vial-red',
  gray: 'bg-vial-gray-light text-vial-asphalt-light',
}

export default function Badge({ children, variant = 'blue', size = 'sm' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${variants[variant]}
        ${size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
      `}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 5: Componente Timer**

Crear `src/components/ui/Timer.tsx`:

```tsx
'use client'

import { useState, useEffect, useCallback } from 'react'

interface TimerProps {
  totalSeconds: number
  onTimeUp: () => void
  isRunning: boolean
  className?: string
}

export default function Timer({ totalSeconds, onTimeUp, isRunning, className = '' }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)

  useEffect(() => {
    setSecondsLeft(totalSeconds)
  }, [totalSeconds])

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, secondsLeft, onTimeUp])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const isLow = secondsLeft < 60

  return (
    <div
      className={`
        font-mono text-lg font-bold px-4 py-2 rounded-xl
        ${isLow ? 'bg-vial-red/10 text-vial-red animate-pulse' : 'bg-vial-gray-light text-vial-asphalt'}
        ${className}
      `}
    >
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  )
}
```

- [ ] **Step 6: Componente AdSlot**

Crear `src/components/ui/AdSlot.tsx`:

```tsx
// Placeholder para Google AdSense — se activa cuando se apruebe la cuenta
interface AdSlotProps {
  position: 'header' | 'between-lessons' | 'sidebar-results'
  className?: string
}

export default function AdSlot({ position, className = '' }: AdSlotProps) {
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

  // Sin AdSense configurado, no renderizar nada
  if (!adSenseId) return null

  return (
    <div
      className={`w-full flex items-center justify-center bg-vial-gray-light rounded-lg text-vial-asphalt-light text-xs py-2 ${className}`}
      data-ad-position={position}
    >
      {/* Aquí se inserta el script de AdSense cuando esté aprobado */}
      <span className="opacity-50">Espacio publicitario</span>
    </div>
  )
}
```

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/
git commit -m "feat: componentes UI base (Button, Card, ProgressBar, Badge, Timer, AdSlot)"
```

---

### Task 4: Layout — Nav, Footer, MobileMenu

**Files:**
- Create: `src/components/layout/Nav.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/MobileMenu.tsx`
- Modify: `src/app/layout.tsx`, `src/app/globals.css`

- [ ] **Step 1: Globals CSS con fuente Inter**

Modificar `src/app/globals.css` — reemplazar todo el contenido por:

```css
@import 'tailwindcss';

@theme {
  --font-sans: 'Inter', system-ui, sans-serif;
}

/* Scrollbar sutil */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #F5F5F5;
}
::-webkit-scrollbar-thumb {
  background: #E0E0E0;
  border-radius: 3px;
}

/* Selección de texto con color de marca */
::selection {
  background: #1565C0;
  color: white;
}
```

- [ ] **Step 2: Componente Nav**

Crear `src/components/layout/Nav.tsx`:

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileMenu from './MobileMenu'

const navLinks = [
  { href: '/lecciones', label: 'Lecciones' },
  { href: '/juegos', label: 'Juegos' },
  { href: '/examenes', label: 'Exámenes' },
  { href: '/progreso', label: 'Mi Progreso' },
  { href: '/blog', label: 'Blog' },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-vial-gray-mid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-vial-blue rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <span className="text-xl font-bold text-vial-asphalt-dark group-hover:text-vial-blue transition-colors">
              Manejate
            </span>
          </Link>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-vial-blue text-white'
                      : 'text-vial-asphalt hover:bg-vial-gray-light hover:text-vial-blue'
                    }
                  `}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Botón hamburguesa mobile */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-xl text-vial-asphalt hover:bg-vial-gray-light"
            aria-label="Abrir menú"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú mobile */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
        currentPath={pathname}
      />
    </nav>
  )
}
```

- [ ] **Step 3: Componente MobileMenu**

Crear `src/components/layout/MobileMenu.tsx`:

```tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: { href: string; label: string }[]
  currentPath: string
}

export default function MobileMenu({ isOpen, onClose, links, currentPath }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl"
          >
            <div className="p-6">
              {/* Botón cerrar */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl text-vial-asphalt hover:bg-vial-gray-light"
                aria-label="Cerrar menú"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Logo */}
              <div className="mb-8 mt-2">
                <span className="text-xl font-bold text-vial-asphalt-dark">Manejate</span>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-2">
                {links.map((link) => {
                  const isActive = currentPath.startsWith(link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className={`
                        px-4 py-3 rounded-xl text-base font-medium transition-all
                        ${isActive
                          ? 'bg-vial-blue text-white'
                          : 'text-vial-asphalt hover:bg-vial-gray-light'
                        }
                      `}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 4: Componente Footer**

Crear `src/components/layout/Footer.tsx`:

```tsx
import Link from 'next/link'

const footerSections = [
  {
    title: 'Aprender',
    links: [
      { href: '/lecciones', label: 'Lecciones' },
      { href: '/juegos', label: 'Juegos' },
      { href: '/examenes', label: 'Exámenes' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/progreso', label: 'Mi Progreso' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-vial-asphalt-dark text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Marca */}
          <div>
            <h3 className="text-lg font-bold mb-3">Manejate</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Aprendé a manejar jugando. Practicá gratis para el examen teórico de conducir en CABA.
            </p>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-vial-yellow transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Línea final */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            Contenido basado en el Manual del Conductor CABA 2019 (Ley 2148).
            No reemplaza la formación oficial.
          </p>
          <p className="text-xs text-gray-500">
            Un proyecto de Mixeliq
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: Layout raíz**

Modificar `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Manejate — Aprendé a manejar jugando',
    template: '%s | Manejate',
  },
  description:
    'Practicá gratis para el examen teórico de manejo en CABA. Juegos, lecciones y simulacros basados en el Manual del Conductor oficial.',
  metadataBase: new URL('https://manejate.com.ar'),
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Manejate',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <body className={`${inter.className} bg-vial-white text-vial-asphalt antialiased`}>
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 6: Verificar visualmente**

```bash
npm run dev
```

Abrir http://localhost:3000. Verificar: Nav con logo "Manejate", links de navegación, footer, responsive en mobile (menú hamburguesa).

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/ src/app/layout.tsx src/app/globals.css
git commit -m "feat: layout con Nav, Footer y MobileMenu responsive"
```

---

### Task 5: Motor de gamificación

**Files:**
- Create: `src/lib/gamification.ts`, `src/lib/progress.ts`, `src/context/ProgressContext.tsx`
- Create: `__tests__/lib/gamification.test.ts`, `__tests__/lib/progress.test.ts`

- [ ] **Step 1: Escribir tests de gamificación**

Crear `__tests__/lib/gamification.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import {
  LEVELS,
  BADGES,
  getLevelForXP,
  getXPForNextLevel,
  checkNewBadges,
} from '@/lib/gamification'
import type { UserProgress } from '@/types'

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

describe('getLevelForXP', () => {
  it('devuelve nivel 1 (Peatón) para 0 XP', () => {
    const level = getLevelForXP(0)
    expect(level.level).toBe(1)
    expect(level.name).toBe('Peatón')
  })

  it('devuelve nivel 3 (Aprendiz) para 500 XP', () => {
    const level = getLevelForXP(500)
    expect(level.level).toBe(3)
    expect(level.name).toBe('Aprendiz')
  })

  it('devuelve nivel 7 (Instructor) para 5000+ XP', () => {
    const level = getLevelForXP(9999)
    expect(level.level).toBe(7)
    expect(level.name).toBe('Instructor')
  })

  it('devuelve nivel 4 para XP entre 1000 y 1999', () => {
    const level = getLevelForXP(1500)
    expect(level.level).toBe(4)
  })
})

describe('getXPForNextLevel', () => {
  it('devuelve 200 para nivel 1 con 0 XP', () => {
    const { needed, progress } = getXPForNextLevel(0)
    expect(needed).toBe(200)
    expect(progress).toBe(0)
  })

  it('devuelve progreso parcial para XP intermedio', () => {
    const { needed, progress } = getXPForNextLevel(100)
    expect(needed).toBe(200)
    expect(progress).toBe(50) // 100/200 = 50%
  })

  it('devuelve 100% para nivel máximo', () => {
    const { progress } = getXPForNextLevel(9999)
    expect(progress).toBe(100)
  })
})

describe('checkNewBadges', () => {
  it('otorga badge "primera-leccion" al completar lección 1', () => {
    const progress: UserProgress = {
      ...emptyProgress,
      completedLessons: ['el-conductor-responsable'],
    }
    const newBadges = checkNewBadges(progress)
    expect(newBadges).toContain('primera-leccion')
  })

  it('otorga badge "estudioso" al completar las 12 lecciones', () => {
    const progress: UserProgress = {
      ...emptyProgress,
      completedLessons: [
        'el-conductor-responsable', 'prioridad-normativa', 'semaforos-y-luces',
        'senales-reglamentarias', 'senales-preventivas', 'senales-informativas',
        'demarcacion-horizontal', 'prioridad-de-paso', 'giros-y-adelantamiento',
        'velocidades', 'estacionamiento', 'conduccion-especial',
      ],
    }
    const newBadges = checkNewBadges(progress)
    expect(newBadges).toContain('estudioso')
  })

  it('otorga badge "racha-7" al tener 7 días de racha', () => {
    const progress: UserProgress = {
      ...emptyProgress,
      streak: { current: 7, lastDate: '2026-04-05' },
    }
    const newBadges = checkNewBadges(progress)
    expect(newBadges).toContain('racha-7')
  })

  it('no otorga badges ya obtenidos', () => {
    const progress: UserProgress = {
      ...emptyProgress,
      completedLessons: ['el-conductor-responsable'],
      badges: ['primera-leccion'],
    }
    const newBadges = checkNewBadges(progress)
    expect(newBadges).not.toContain('primera-leccion')
  })
})
```

- [ ] **Step 2: Correr tests para verificar que fallan**

```bash
npx vitest run __tests__/lib/gamification.test.ts
```

Esperado: FAIL — módulos no encontrados.

- [ ] **Step 3: Implementar gamificación**

Crear `src/lib/gamification.ts`:

```typescript
import type { UserProgress, LevelInfo, BadgeInfo, GameType } from '@/types'

// --- Niveles ---
export const LEVELS: LevelInfo[] = [
  { level: 1, name: 'Peatón', xpRequired: 0 },
  { level: 2, name: 'Acompañante', xpRequired: 200 },
  { level: 3, name: 'Aprendiz', xpRequired: 500 },
  { level: 4, name: 'Conductor Novato', xpRequired: 1000 },
  { level: 5, name: 'Conductor Seguro', xpRequired: 2000 },
  { level: 6, name: 'Conductor Experto', xpRequired: 3500 },
  { level: 7, name: 'Instructor', xpRequired: 5000 },
]

// --- Badges ---
export const BADGES: BadgeInfo[] = [
  { id: 'primera-leccion', name: 'Primera lección', description: 'Completar la lección 1', icon: '📖', condition: 'completedLessons includes el-conductor-responsable' },
  { id: 'memoria-acero', name: 'Memoria de acero', description: 'Ganar Memory sin errores', icon: '🧠', condition: 'memory bestScore = perfect' },
  { id: 'crucigrama-master', name: 'Crucigrama Master', description: 'Completar un crucigrama', icon: '✏️', condition: 'crossword played > 0' },
  { id: 'aprobado', name: 'Aprobado!', description: 'Aprobar el primer simulacro', icon: '🎓', condition: 'examHistory has passed simulacro' },
  { id: 'racha-7', name: 'Racha de 7', description: 'Entrar 7 días seguidos', icon: '🔥', condition: 'streak >= 7' },
  { id: 'sabelotodo', name: 'Sabelotodo', description: '50 respuestas correctas seguidas', icon: '🏆', condition: 'correctAnswersStreak >= 50' },
  { id: 'estudioso', name: 'Estudioso', description: 'Completar las 12 lecciones', icon: '📚', condition: 'completedLessons.length >= 12' },
  { id: 'completista', name: 'Completista', description: 'Jugar los 11 juegos al menos una vez', icon: '🎮', condition: 'all games played > 0' },
]

const ALL_LESSON_SLUGS = [
  'el-conductor-responsable', 'prioridad-normativa', 'semaforos-y-luces',
  'senales-reglamentarias', 'senales-preventivas', 'senales-informativas',
  'demarcacion-horizontal', 'prioridad-de-paso', 'giros-y-adelantamiento',
  'velocidades', 'estacionamiento', 'conduccion-especial',
]

const ALL_GAME_TYPES: GameType[] = [
  'memory', 'quiz', 'true-or-false', 'fill-blank', 'crossword',
  'word-search', 'drag-classify', 'hangman', 'road-situation',
  'exam-simulator', 'order-steps',
]

// Obtener nivel para una cantidad de XP
export function getLevelForXP(xp: number): LevelInfo {
  // Recorrer niveles de mayor a menor para encontrar el que corresponde
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) {
      return LEVELS[i]
    }
  }
  return LEVELS[0]
}

// Obtener progreso hacia el siguiente nivel
export function getXPForNextLevel(xp: number): { needed: number; progress: number } {
  const currentLevel = getLevelForXP(xp)
  const currentIndex = LEVELS.findIndex((l) => l.level === currentLevel.level)
  const nextLevel = LEVELS[currentIndex + 1]

  // Si ya es nivel máximo
  if (!nextLevel) {
    return { needed: currentLevel.xpRequired, progress: 100 }
  }

  const xpInCurrentLevel = xp - currentLevel.xpRequired
  const xpNeededForNext = nextLevel.xpRequired - currentLevel.xpRequired
  const progress = Math.round((xpInCurrentLevel / xpNeededForNext) * 100)

  return { needed: nextLevel.xpRequired, progress }
}

// Verificar qué badges nuevos se desbloquearon
export function checkNewBadges(progress: UserProgress): string[] {
  const newBadges: string[] = []

  const checks: Record<string, () => boolean> = {
    'primera-leccion': () => progress.completedLessons.includes('el-conductor-responsable'),
    'memoria-acero': () => progress.gamesPlayed?.memory?.bestScore === 100,
    'crucigrama-master': () => (progress.gamesPlayed?.crossword?.played ?? 0) > 0,
    'aprobado': () => progress.examHistory.some((e) => e.level === 'simulacro' && e.passed),
    'racha-7': () => progress.streak.current >= 7,
    'sabelotodo': () => progress.correctAnswersStreak >= 50,
    'estudioso': () => progress.completedLessons.length >= 12,
    'completista': () => ALL_GAME_TYPES.every((type) => (progress.gamesPlayed?.[type]?.played ?? 0) > 0),
  }

  for (const [badgeId, check] of Object.entries(checks)) {
    if (!progress.badges.includes(badgeId) && check()) {
      newBadges.push(badgeId)
    }
  }

  return newBadges
}

// XP por tipo de acción
export const XP_REWARDS = {
  completeLesson: 50,
  gameEasy: 10,
  gameMedium: 20,
  gameHard: 30,
  examFacil: 100,
  examMedio: 200,
  examDificil: 300,
  examSimulacro: 500,
  dailyStreak: 25,
} as const
```

- [ ] **Step 4: Correr tests de gamificación**

```bash
npx vitest run __tests__/lib/gamification.test.ts
```

Esperado: PASS — todos los tests verdes.

- [ ] **Step 5: Escribir tests de progress (localStorage)**

Crear `__tests__/lib/progress.test.ts`:

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getProgress, saveProgress, addXP, completeLesson, updateStreak } from '@/lib/progress'
import type { UserProgress } from '@/types'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(global, 'localStorage', { value: localStorageMock })

beforeEach(() => {
  localStorageMock.clear()
})

describe('getProgress', () => {
  it('devuelve progreso vacío si no hay datos guardados', () => {
    const progress = getProgress()
    expect(progress.xp).toBe(0)
    expect(progress.level).toBe(1)
    expect(progress.completedLessons).toEqual([])
    expect(progress.badges).toEqual([])
  })

  it('devuelve datos guardados si existen', () => {
    const saved: UserProgress = {
      xp: 500,
      level: 3,
      completedLessons: ['velocidades'],
      badges: ['primera-leccion'],
      gamesPlayed: {} as UserProgress['gamesPlayed'],
      examHistory: [],
      streak: { current: 3, lastDate: '2026-04-05' },
      correctAnswersStreak: 10,
      totalCorrectAnswers: 50,
    }
    localStorageMock.setItem('manejate-progress', JSON.stringify(saved))
    const progress = getProgress()
    expect(progress.xp).toBe(500)
    expect(progress.level).toBe(3)
  })
})

describe('addXP', () => {
  it('suma XP y actualiza nivel', () => {
    const progress = getProgress()
    const updated = addXP(progress, 250)
    expect(updated.xp).toBe(250)
    expect(updated.level).toBe(2) // 200 XP = nivel 2
  })
})

describe('completeLesson', () => {
  it('agrega lección y suma XP', () => {
    const progress = getProgress()
    const updated = completeLesson(progress, 'velocidades')
    expect(updated.completedLessons).toContain('velocidades')
    expect(updated.xp).toBe(50)
  })

  it('no duplica lecciones', () => {
    let progress = getProgress()
    progress = completeLesson(progress, 'velocidades')
    progress = completeLesson(progress, 'velocidades')
    expect(progress.completedLessons.filter((l) => l === 'velocidades')).toHaveLength(1)
    expect(progress.xp).toBe(50) // solo se sumó una vez
  })
})

describe('updateStreak', () => {
  it('incrementa racha si es un día nuevo consecutivo', () => {
    const progress = getProgress()
    progress.streak = { current: 3, lastDate: '2026-04-04' }
    const updated = updateStreak(progress, '2026-04-05')
    expect(updated.streak.current).toBe(4)
    expect(updated.streak.lastDate).toBe('2026-04-05')
  })

  it('resetea racha si se saltó un día', () => {
    const progress = getProgress()
    progress.streak = { current: 5, lastDate: '2026-04-03' }
    const updated = updateStreak(progress, '2026-04-05')
    expect(updated.streak.current).toBe(1)
  })

  it('no cambia si es el mismo día', () => {
    const progress = getProgress()
    progress.streak = { current: 3, lastDate: '2026-04-05' }
    const updated = updateStreak(progress, '2026-04-05')
    expect(updated.streak.current).toBe(3)
  })
})
```

- [ ] **Step 6: Correr tests para verificar que fallan**

```bash
npx vitest run __tests__/lib/progress.test.ts
```

Esperado: FAIL — módulo no encontrado.

- [ ] **Step 7: Implementar progress**

Crear `src/lib/progress.ts`:

```typescript
import type { UserProgress, GameType } from '@/types'
import { getLevelForXP, checkNewBadges, XP_REWARDS } from './gamification'

const STORAGE_KEY = 'manejate-progress'

// Progreso inicial vacío
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

// Leer progreso de localStorage
export function getProgress(): UserProgress {
  if (typeof window === 'undefined') return createEmptyProgress()

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return createEmptyProgress()
    return JSON.parse(stored) as UserProgress
  } catch {
    return createEmptyProgress()
  }
}

// Guardar progreso en localStorage
export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

// Sumar XP y recalcular nivel + badges
export function addXP(progress: UserProgress, amount: number): UserProgress {
  const newXP = progress.xp + amount
  const newLevel = getLevelForXP(newXP)
  const updated = { ...progress, xp: newXP, level: newLevel.level }
  const newBadges = checkNewBadges(updated)
  updated.badges = [...updated.badges, ...newBadges]
  return updated
}

// Completar una lección
export function completeLesson(progress: UserProgress, lessonSlug: string): UserProgress {
  if (progress.completedLessons.includes(lessonSlug)) return progress

  const updated = {
    ...progress,
    completedLessons: [...progress.completedLessons, lessonSlug],
  }
  return addXP(updated, XP_REWARDS.completeLesson)
}

// Registrar partida de juego
export function recordGame(
  progress: UserProgress,
  gameType: GameType,
  score: number,
  xpEarned: number
): UserProgress {
  const currentGame = progress.gamesPlayed[gameType] || { played: 0, bestScore: 0 }
  const updated = {
    ...progress,
    gamesPlayed: {
      ...progress.gamesPlayed,
      [gameType]: {
        played: currentGame.played + 1,
        bestScore: Math.max(currentGame.bestScore, score),
      },
    },
  }
  return addXP(updated, xpEarned)
}

// Actualizar racha diaria
export function updateStreak(progress: UserProgress, today: string): UserProgress {
  const { lastDate, current } = progress.streak

  // Mismo día: no cambiar
  if (lastDate === today) return progress

  // Calcular diferencia en días
  const lastDateObj = lastDate ? new Date(lastDate) : null
  const todayObj = new Date(today)
  const diffDays = lastDateObj
    ? Math.floor((todayObj.getTime() - lastDateObj.getTime()) / (1000 * 60 * 60 * 24))
    : 999

  const newStreak = diffDays === 1 ? current + 1 : 1
  const updated = {
    ...progress,
    streak: { current: newStreak, lastDate: today },
  }

  // Bonus XP por racha
  if (newStreak > 1) {
    return addXP(updated, XP_REWARDS.dailyStreak)
  }
  return updated
}
```

- [ ] **Step 8: Correr tests de progress**

```bash
npx vitest run __tests__/lib/progress.test.ts
```

Esperado: PASS — todos verdes.

- [ ] **Step 9: Crear ProgressContext**

Crear `src/context/ProgressContext.tsx`:

```tsx
'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { UserProgress, GameType } from '@/types'
import {
  getProgress,
  saveProgress,
  addXP as addXPUtil,
  completeLesson as completeLessonUtil,
  recordGame as recordGameUtil,
  updateStreak,
} from '@/lib/progress'

interface ProgressContextType {
  progress: UserProgress
  addXP: (amount: number) => void
  completeLesson: (slug: string) => void
  recordGame: (type: GameType, score: number, xp: number) => void
  newBadges: string[] // badges desbloqueados en esta sesión para mostrar notificación
  clearNewBadges: () => void
}

const ProgressContext = createContext<ProgressContextType | null>(null)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(getProgress)
  const [newBadges, setNewBadges] = useState<string[]>([])

  // Actualizar racha al montar
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setProgress((prev) => {
      const updated = updateStreak(prev, today)
      saveProgress(updated)
      return updated
    })
  }, [])

  // Guardar en localStorage cada vez que cambia
  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const addXP = useCallback((amount: number) => {
    setProgress((prev) => {
      const updated = addXPUtil(prev, amount)
      const badges = updated.badges.filter((b) => !prev.badges.includes(b))
      if (badges.length > 0) setNewBadges((prev) => [...prev, ...badges])
      return updated
    })
  }, [])

  const completeLesson = useCallback((slug: string) => {
    setProgress((prev) => {
      const updated = completeLessonUtil(prev, slug)
      const badges = updated.badges.filter((b) => !prev.badges.includes(b))
      if (badges.length > 0) setNewBadges((prev) => [...prev, ...badges])
      return updated
    })
  }, [])

  const recordGame = useCallback((type: GameType, score: number, xp: number) => {
    setProgress((prev) => {
      const updated = recordGameUtil(prev, type, score, xp)
      const badges = updated.badges.filter((b) => !prev.badges.includes(b))
      if (badges.length > 0) setNewBadges((prev) => [...prev, ...badges])
      return updated
    })
  }, [])

  const clearNewBadges = useCallback(() => setNewBadges([]), [])

  return (
    <ProgressContext.Provider value={{ progress, addXP, completeLesson, recordGame, newBadges, clearNewBadges }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress debe usarse dentro de ProgressProvider')
  return ctx
}
```

- [ ] **Step 10: Agregar ProgressProvider al layout**

Modificar `src/app/layout.tsx` — agregar import y wrappear children:

```tsx
import { ProgressProvider } from '@/context/ProgressContext'

// ... dentro del return, wrappear main:
<body className={`${inter.className} bg-vial-white text-vial-asphalt antialiased`}>
  <ProgressProvider>
    <Nav />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </ProgressProvider>
</body>
```

- [ ] **Step 11: Correr todos los tests**

```bash
npx vitest run
```

Esperado: todos los tests pasan.

- [ ] **Step 12: Commit**

```bash
git add src/lib/ src/context/ __tests__/ src/app/layout.tsx
git commit -m "feat: motor de gamificación (XP, niveles, badges) con tests y ProgressContext"
```

---

## MILESTONE 2: Datos y contenido

### Task 6: Archivos de datos JSON (preguntas, señales, juegos)

**Files:**
- Create: `data/lessons-meta.json`, `data/games-meta.json`, `data/quiz.json`, `data/true-false.json`, `data/fill-blank.json`, `data/memory-pairs.json`, `data/hangman-words.json`, `data/signals.json`, `data/order-steps.json`

**IMPORTANTE:** Todos los datos provienen del Manual del Conductor CABA 2019. Los textos deben copiarse o parafrasearse fielmente del manual en `Desktop/proyecto-youtube-reddit/docs/manual-transito-resumen.txt` y del PDF `Desktop/manual-transito-caba.pdf`. NUNCA inventar datos de tránsito.

- [ ] **Step 1: Metadata de lecciones**

Crear `data/lessons-meta.json`:

```json
[
  {
    "id": 1,
    "slug": "el-conductor-responsable",
    "title": "El conductor responsable",
    "description": "Cinturón de seguridad, uso del celular, alcohol al volante y las distracciones que debés evitar.",
    "topics": ["cinturón", "celular", "alcohol", "distracciones"],
    "icon": "shield"
  },
  {
    "id": 2,
    "slug": "prioridad-normativa",
    "title": "Prioridad normativa",
    "description": "El orden que manda en la calle: agente, señal transitoria, semáforo, señalización y ley.",
    "topics": ["prioridad", "agente de tránsito", "normas"],
    "icon": "scale"
  },
  {
    "id": 3,
    "slug": "semaforos-y-luces",
    "title": "Semáforos y luces",
    "description": "Tipos de semáforos, qué significa cada luz y cuándo podés o no avanzar.",
    "topics": ["semáforos", "luces", "verde", "rojo", "amarillo"],
    "icon": "traffic-light"
  },
  {
    "id": 4,
    "slug": "senales-reglamentarias",
    "title": "Señales reglamentarias",
    "description": "Las señales de prohibición, obligación y prioridad que debés respetar siempre.",
    "topics": ["PARE", "ceda el paso", "prohibido estacionar", "contramano"],
    "icon": "octagon"
  },
  {
    "id": 5,
    "slug": "senales-preventivas",
    "title": "Señales preventivas",
    "description": "Las señales amarillas que te avisan de curvas, cruces y peligros adelante.",
    "topics": ["curvas", "cruces", "peligro", "advertencia"],
    "icon": "triangle"
  },
  {
    "id": 6,
    "slug": "senales-informativas",
    "title": "Señales informativas",
    "description": "Las señales azules que te indican servicios, destinos y referencias útiles.",
    "topics": ["hospital", "estación de servicio", "destinos"],
    "icon": "info"
  },
  {
    "id": 7,
    "slug": "demarcacion-horizontal",
    "title": "Demarcación horizontal",
    "description": "Líneas en el piso, sendas peatonales, cordones de colores y qué significa cada marca.",
    "topics": ["líneas", "senda peatonal", "cordones", "isletas"],
    "icon": "road"
  },
  {
    "id": 8,
    "slug": "prioridad-de-paso",
    "title": "Prioridad de paso",
    "description": "Quién pasa primero en intersecciones, rotondas y ante vehículos de emergencia.",
    "topics": ["intersección", "rotonda", "emergencia", "derecha"],
    "icon": "merge"
  },
  {
    "id": 9,
    "slug": "giros-y-adelantamiento",
    "title": "Giros y adelantamiento",
    "description": "Cómo girar a la izquierda y derecha, y cuándo es seguro sobrepasar otro vehículo.",
    "topics": ["giro", "adelantamiento", "sobrepaso"],
    "icon": "turn"
  },
  {
    "id": 10,
    "slug": "velocidades",
    "title": "Velocidades",
    "description": "Velocidades máximas y mínimas según la zona: urbana, autopista, escolar.",
    "topics": ["velocidad máxima", "velocidad mínima", "zona escolar"],
    "icon": "gauge"
  },
  {
    "id": 11,
    "slug": "estacionamiento",
    "title": "Estacionamiento",
    "description": "Cómo estacionar en paralelo, a 45° y 90°, y dónde está prohibido.",
    "topics": ["paralelo", "45 grados", "prohibido estacionar"],
    "icon": "parking"
  },
  {
    "id": 12,
    "slug": "conduccion-especial",
    "title": "Conducción especial",
    "description": "Conducir en autopistas, con lluvia, niebla o de noche. Reglas especiales.",
    "topics": ["autopista", "lluvia", "niebla", "noche"],
    "icon": "cloud-rain"
  }
]
```

- [ ] **Step 2: Metadata de juegos**

Crear `data/games-meta.json`:

```json
[
  { "type": "memory", "name": "Memory", "description": "Emparejá señales con su significado", "icon": "brain", "difficulty": "facil", "xpReward": 15 },
  { "type": "quiz", "name": "Quiz", "description": "Preguntas de opción múltiple", "icon": "help-circle", "difficulty": "medio", "xpReward": 20 },
  { "type": "true-or-false", "name": "Verdadero o Falso", "description": "¿Es verdad o mentira?", "icon": "check-x", "difficulty": "facil", "xpReward": 10 },
  { "type": "fill-blank", "name": "Completar la frase", "description": "Rellenà el hueco en la regla", "icon": "text-cursor", "difficulty": "medio", "xpReward": 15 },
  { "type": "crossword", "name": "Crucigrama", "description": "Resolvé el crucigrama de tránsito", "icon": "grid", "difficulty": "dificil", "xpReward": 30 },
  { "type": "word-search", "name": "Sopa de letras", "description": "Encontrá los términos escondidos", "icon": "search", "difficulty": "medio", "xpReward": 20 },
  { "type": "drag-classify", "name": "Clasificador", "description": "Arrastrá cada señal a su categoría", "icon": "move", "difficulty": "medio", "xpReward": 20 },
  { "type": "hangman", "name": "Ahorcado", "description": "Adiviná el término de tránsito", "icon": "user", "difficulty": "facil", "xpReward": 10 },
  { "type": "road-situation", "name": "Situaciones viales", "description": "¿Qué harías en esta situación?", "icon": "map", "difficulty": "dificil", "xpReward": 25 },
  { "type": "exam-simulator", "name": "Simulacro", "description": "Examen igual al real", "icon": "clipboard", "difficulty": "dificil", "xpReward": 30 },
  { "type": "order-steps", "name": "Ordená los pasos", "description": "Poné los pasos en el orden correcto", "icon": "list-ordered", "difficulty": "medio", "xpReward": 15 }
]
```

- [ ] **Step 3: Datos de quiz (muestra — se expande leyendo el manual)**

Crear `data/quiz.json` con al menos 5 preguntas por tema, basadas estrictamente en el manual. Ejemplo inicial con las primeras lecciones:

```json
[
  {
    "id": "q001",
    "lessonSlug": "prioridad-normativa",
    "question": "¿Cuál es el orden de prioridad normativa de mayor a menor?",
    "options": [
      "Agente > Señal transitoria > Semáforo > Señalización > Ley",
      "Semáforo > Agente > Señalización > Ley > Señal transitoria",
      "Ley > Semáforo > Agente > Señalización > Señal transitoria",
      "Señalización > Semáforo > Agente > Señal transitoria > Ley"
    ],
    "correctIndex": 0,
    "explanation": "Según la Ley 2148, el orden de prioridad es: 1° Agente de tránsito, 2° Señales transitorias, 3° Semáforos, 4° Demarcación horizontal y señalización vertical, 5° Normas legales.",
    "source": "Manual del Conductor CABA, página 63-68"
  },
  {
    "id": "q002",
    "lessonSlug": "semaforos-y-luces",
    "question": "¿Qué debés hacer con luz amarilla del semáforo?",
    "options": [
      "Acelerar para cruzar antes de que cambie",
      "Detenerse si no se llega a transponer la encrucijada antes de la luz roja",
      "Frenar de golpe siempre",
      "Depende del horario del día"
    ],
    "correctIndex": 1,
    "explanation": "Con luz amarilla, debés detenerte si no llegás a cruzar la intersección antes de que cambie a rojo. Si ya estás cruzando, terminá de pasar.",
    "source": "Manual del Conductor CABA, página 64"
  },
  {
    "id": "q003",
    "lessonSlug": "semaforos-y-luces",
    "question": "¿Qué indica un semáforo con luz intermitente amarilla?",
    "options": [
      "Que el semáforo está roto",
      "Que hay que detenerse obligatoriamente",
      "Que hay que efectuar el cruce con precaución",
      "Que solo pueden pasar los peatones"
    ],
    "correctIndex": 2,
    "explanation": "La luz intermitente amarilla indica que se debe efectuar el cruce con precaución, prestando atención a los demás vehículos y peatones.",
    "source": "Manual del Conductor CABA, página 64"
  },
  {
    "id": "q004",
    "lessonSlug": "demarcacion-horizontal",
    "question": "¿Qué indica un cordón pintado de color amarillo?",
    "options": [
      "Prohibido estacionar y detenerse las 24 horas",
      "Prohibido estacionar las 24 horas, pero se permite la detención",
      "Estacionamiento exclusivo para motos",
      "Zona de carga y descarga"
    ],
    "correctIndex": 1,
    "explanation": "Los cordones amarillos indican la prohibición de estacionar durante las 24 horas, pero está permitida la detención de vehículos (parar brevemente).",
    "source": "Manual del Conductor CABA, página 67"
  },
  {
    "id": "q005",
    "lessonSlug": "demarcacion-horizontal",
    "question": "¿Qué indica un cordón pintado de color rojo?",
    "options": [
      "Estacionamiento exclusivo para emergencias",
      "Zona de carga y descarga",
      "Prohibido estacionar las 24 horas pero se permite la detención",
      "Prohibido estacionar y detenerse las 24 horas"
    ],
    "correctIndex": 3,
    "explanation": "Los cordones rojos indican la prohibición de estacionar Y detenerse durante las 24 horas. Es más restrictivo que el cordón amarillo.",
    "source": "Manual del Conductor CABA, página 67"
  },
  {
    "id": "q006",
    "lessonSlug": "senales-reglamentarias",
    "question": "¿Cómo se identifica visualmente una señal reglamentaria?",
    "options": [
      "Cuadrado amarillo con borde negro",
      "Círculo blanco con borde rojo y símbolo negro",
      "Rectángulo azul con texto blanco",
      "Triángulo naranja con borde negro"
    ],
    "correctIndex": 1,
    "explanation": "Las señales reglamentarias son generalmente un círculo blanco con borde rojo y símbolo negro, con excepción de PARE, CEDA EL PASO y CONTRAMANO que tienen formas especiales.",
    "source": "Manual del Conductor CABA, página 66"
  },
  {
    "id": "q007",
    "lessonSlug": "senales-preventivas",
    "question": "¿Qué forma y color tienen las señales preventivas?",
    "options": [
      "Círculo blanco con borde rojo",
      "Rectángulo azul con texto blanco",
      "Cuadrado amarillo con la diagonal vertical y borde negro",
      "Triángulo rojo invertido"
    ],
    "correctIndex": 2,
    "explanation": "Las señales preventivas tienen forma de cuadrado amarillo con la diagonal vertical (rombo) y borde y símbolo negro. Advierten sobre peligros.",
    "source": "Manual del Conductor CABA, página 66"
  },
  {
    "id": "q008",
    "lessonSlug": "prioridad-de-paso",
    "question": "¿A quién se debe ceder el paso en cualquier circunstancia?",
    "options": [
      "Al vehículo que viene por la derecha",
      "Al vehículo más grande",
      "A los vehículos de emergencia con sirenas/balizas encendidas",
      "Al vehículo que circula por avenida"
    ],
    "correctIndex": 2,
    "explanation": "En cualquier circunstancia se debe ceder el paso a los vehículos de emergencia (Policía, Bomberos, ambulancias) con señales lumínicas/sonoras encendidas.",
    "source": "Manual del Conductor CABA, página 67"
  },
  {
    "id": "q009",
    "lessonSlug": "el-conductor-responsable",
    "question": "¿Qué debe hacer un conductor si espera una llamada importante mientras conduce?",
    "options": [
      "Usar auriculares Bluetooth",
      "Atender con altavoz",
      "Colocar balizas, detenerse en lugar permitido, y luego atender",
      "Pedir al acompañante que conduzca"
    ],
    "correctIndex": 2,
    "explanation": "Tanto el uso del celular manipulándolo como con altavoz o auriculares son considerados riesgosos. Si se espera una llamada, hay que colocar balizas y detenerse en un lugar permitido.",
    "source": "Manual del Conductor CABA, página 63"
  },
  {
    "id": "q010",
    "lessonSlug": "demarcacion-horizontal",
    "question": "¿Qué indica una línea continua en la calzada?",
    "options": [
      "Que se puede traspasar con precaución",
      "Que no se la puede traspasar ni circular sobre ella",
      "Que indica el final de un carril",
      "Que es zona de estacionamiento"
    ],
    "correctIndex": 1,
    "explanation": "La línea continua indica que no se la puede traspasar ni circular sobre ella. La línea discontinua sí permite ser traspasada.",
    "source": "Manual del Conductor CABA, página 66"
  }
]
```

**NOTA PARA EL IMPLEMENTADOR:** Este es un set inicial de 10 preguntas. Se deben agregar al menos 5 preguntas por cada lección (60+ total) leyendo cuidadosamente el manual en `Desktop/proyecto-youtube-reddit/docs/manual-transito-resumen.txt` y el PDF en `Desktop/manual-transito-caba.pdf`. NUNCA inventar datos.

- [ ] **Step 4: Datos de verdadero/falso**

Crear `data/true-false.json`:

```json
[
  {
    "id": "tf001",
    "lessonSlug": "prioridad-normativa",
    "statement": "Las indicaciones de un agente de tránsito están por encima de cualquier señalización, incluso los semáforos.",
    "isTrue": true,
    "explanation": "Las órdenes del agente de tránsito son la prioridad normativa número 1, por encima de señales transitorias, semáforos y toda otra señalización.",
    "source": "Manual del Conductor CABA, página 63"
  },
  {
    "id": "tf002",
    "lessonSlug": "semaforos-y-luces",
    "statement": "Con luz verde del semáforo siempre se puede avanzar sin precaución.",
    "isTrue": false,
    "explanation": "Con luz verde se está habilitado a avanzar, pero NO se debe iniciar el cruce si no hay espacio suficiente al otro lado. También se debe permitir que termine de cruzar quien inició el paso antes del cambio de luz.",
    "source": "Manual del Conductor CABA, página 64"
  },
  {
    "id": "tf003",
    "lessonSlug": "el-conductor-responsable",
    "statement": "Usar el celular con altavoz mientras se conduce es seguro y está permitido.",
    "isTrue": false,
    "explanation": "Tanto manipular el celular como usarlo con altavoz o auriculares son considerados riesgosos al conducir, ya que la conversación distrae al conductor.",
    "source": "Manual del Conductor CABA, página 63"
  },
  {
    "id": "tf004",
    "lessonSlug": "demarcacion-horizontal",
    "statement": "Un cordón pintado de color anaranjado indica estacionamiento exclusivo para bicicletas y motos.",
    "isTrue": true,
    "explanation": "Los cordones anaranjados indican lugares destinados al estacionamiento exclusivo de ciclorodados (bicicletas) y motovehículos.",
    "source": "Manual del Conductor CABA, página 67"
  },
  {
    "id": "tf005",
    "lessonSlug": "semaforos-y-luces",
    "statement": "Con luz intermitente roja hay que detenerse y solo reiniciar la marcha cuando no exista riesgo.",
    "isTrue": true,
    "explanation": "La luz intermitente roja indica que se debe detener la marcha y solo reiniciarla cuando se tenga la certeza de que no existe riesgo.",
    "source": "Manual del Conductor CABA, página 64"
  },
  {
    "id": "tf006",
    "lessonSlug": "demarcacion-horizontal",
    "statement": "Las isletas en la calzada pueden usarse como senda peatonal cuando no hay paso de cebra cerca.",
    "isTrue": false,
    "explanation": "Las isletas canalizan el tránsito lateralmente. No se puede traspasar, circular sobre ellas, detenerse ni usarlas como senda peatonal ya que indican una situación de riesgo.",
    "source": "Manual del Conductor CABA, página 67"
  },
  {
    "id": "tf007",
    "lessonSlug": "senales-reglamentarias",
    "statement": "Las señales reglamentarias con fondo azul y borde rojo son de permiso con restricción.",
    "isTrue": true,
    "explanation": "Las señales reglamentarias con fondo azul y borde rojo indican un permiso pero con alguna restricción o condición.",
    "source": "Manual del Conductor CABA, página 66"
  },
  {
    "id": "tf008",
    "lessonSlug": "prioridad-normativa",
    "statement": "Las señales transitorias son de color naranja y tienen prioridad sobre la señalización habitual.",
    "isTrue": true,
    "explanation": "Las señales transitorias, de color predominante naranja, se usan para obras y mantenimiento. Tienen prioridad sobre la señalización habitual porque indican una situación temporal.",
    "source": "Manual del Conductor CABA, página 65"
  }
]
```

- [ ] **Step 5: Datos de completar la frase**

Crear `data/fill-blank.json`:

```json
[
  {
    "id": "fb001",
    "lessonSlug": "prioridad-de-paso",
    "textBefore": "En cualquier circunstancia se debe ceder el paso a los vehículos de",
    "textAfter": "con señales lumínicas y sonoras encendidas.",
    "options": ["transporte público", "emergencia", "carga pesada"],
    "correctIndex": 1,
    "explanation": "Se debe ceder siempre el paso a vehículos de emergencia (Policía, Bomberos, ambulancias) cuando tienen encendidas las sirenas y balizas."
  },
  {
    "id": "fb002",
    "lessonSlug": "demarcacion-horizontal",
    "textBefore": "La línea continua en la calzada indica que",
    "textAfter": ".",
    "options": ["se puede traspasar con precaución", "no se la puede traspasar ni circular sobre ella", "marca el fin de un carril"],
    "correctIndex": 1,
    "explanation": "La línea continua prohíbe traspasarla o circular sobre ella. Solo la línea discontinua permite ser traspasada."
  },
  {
    "id": "fb003",
    "lessonSlug": "semaforos-y-luces",
    "textBefore": "Con luz amarilla del semáforo, debés detenerte si no llegás a",
    "textAfter": "antes de la luz roja.",
    "options": ["frenar completamente", "transponer la encrucijada", "cambiar de carril"],
    "correctIndex": 1,
    "explanation": "Con luz amarilla debés detenerte si no llegás a cruzar la intersección (transponer la encrucijada) antes de que cambie a rojo."
  },
  {
    "id": "fb004",
    "lessonSlug": "prioridad-normativa",
    "textBefore": "El primer orden de prioridad normativa lo tienen las señales u órdenes de",
    "textAfter": ".",
    "options": ["los semáforos", "la autoridad de control", "las señales verticales"],
    "correctIndex": 1,
    "explanation": "La prioridad número 1 la tiene la autoridad de control (agentes de tránsito). Sus indicaciones están por encima de cualquier señalización."
  },
  {
    "id": "fb005",
    "lessonSlug": "senales-preventivas",
    "textBefore": "Las señales preventivas tienen forma de cuadrado amarillo con la",
    "textAfter": ", y borde y símbolo negro.",
    "options": ["diagonal horizontal", "diagonal vertical", "base inferior"],
    "correctIndex": 1,
    "explanation": "Las señales preventivas son cuadrados amarillos apoyados sobre una diagonal vertical (forma de rombo), con borde y símbolo negro."
  }
]
```

- [ ] **Step 6: Datos de memory pairs**

Crear `data/memory-pairs.json`:

```json
[
  { "id": "mp001", "lessonSlug": "senales-reglamentarias", "signal": "octagon-red", "signalLabel": "PARE", "meaning": "Detención obligatoria" },
  { "id": "mp002", "lessonSlug": "senales-reglamentarias", "signal": "triangle-inverted", "signalLabel": "CEDA EL PASO", "meaning": "Ceder el paso a otros vehículos" },
  { "id": "mp003", "lessonSlug": "senales-reglamentarias", "signal": "circle-no-parking", "signalLabel": "Prohibido estacionar", "meaning": "No se puede dejar el vehículo" },
  { "id": "mp004", "lessonSlug": "semaforos-y-luces", "signal": "light-red", "signalLabel": "Luz roja", "meaning": "Detenerse antes de la senda peatonal" },
  { "id": "mp005", "lessonSlug": "semaforos-y-luces", "signal": "light-yellow", "signalLabel": "Luz amarilla", "meaning": "Detenerse si no se transpone la encrucijada" },
  { "id": "mp006", "lessonSlug": "semaforos-y-luces", "signal": "light-green", "signalLabel": "Luz verde", "meaning": "Habilitado a avanzar con precaución" },
  { "id": "mp007", "lessonSlug": "demarcacion-horizontal", "signal": "curb-yellow", "signalLabel": "Cordón amarillo", "meaning": "Prohibido estacionar 24hs" },
  { "id": "mp008", "lessonSlug": "demarcacion-horizontal", "signal": "curb-red", "signalLabel": "Cordón rojo", "meaning": "Prohibido estacionar y detenerse 24hs" },
  { "id": "mp009", "lessonSlug": "demarcacion-horizontal", "signal": "curb-orange", "signalLabel": "Cordón anaranjado", "meaning": "Estacionamiento exclusivo motos y bicicletas" },
  { "id": "mp010", "lessonSlug": "senales-informativas", "signal": "square-blue", "signalLabel": "Señal informativa", "meaning": "Información de servicios, lugares o referencias" },
  { "id": "mp011", "lessonSlug": "demarcacion-horizontal", "signal": "solid-line", "signalLabel": "Línea continua", "meaning": "Prohibido traspasar o circular sobre ella" },
  { "id": "mp012", "lessonSlug": "demarcacion-horizontal", "signal": "dashed-line", "signalLabel": "Línea discontinua", "meaning": "Permitido traspasar" },
  { "id": "mp013", "lessonSlug": "prioridad-normativa", "signal": "cone-orange", "signalLabel": "Señal transitoria", "meaning": "Obras en la vía, prioridad sobre señalización habitual" },
  { "id": "mp014", "lessonSlug": "senales-reglamentarias", "signal": "circle-no-entry", "signalLabel": "CONTRAMANO", "meaning": "Prohibido ingresar" },
  { "id": "mp015", "lessonSlug": "demarcacion-horizontal", "signal": "crosswalk", "signalLabel": "Senda peatonal", "meaning": "Cruce exclusivo para peatones" }
]
```

- [ ] **Step 7: Datos de ahorcado**

Crear `data/hangman-words.json`:

```json
[
  { "id": "h001", "lessonSlug": "demarcacion-horizontal", "word": "SENDA PEATONAL", "hint": "Espacio en la vía con líneas blancas y negras para cruce de peatones" },
  { "id": "h002", "lessonSlug": "senales-reglamentarias", "word": "CONTRAMANO", "hint": "Señal que indica que está prohibido ingresar por esa vía" },
  { "id": "h003", "lessonSlug": "prioridad-normativa", "word": "SEMAFORO", "hint": "Señal luminosa que regula la circulación con colores" },
  { "id": "h004", "lessonSlug": "demarcacion-horizontal", "word": "ISLETA", "hint": "Marca en la calzada que canaliza el tránsito, prohibido circular sobre ella" },
  { "id": "h005", "lessonSlug": "el-conductor-responsable", "word": "CINTURON", "hint": "Elemento de seguridad obligatorio para conductor y pasajeros" },
  { "id": "h006", "lessonSlug": "prioridad-de-paso", "word": "ROTONDA", "hint": "Intersección circular donde se circula en un solo sentido" },
  { "id": "h007", "lessonSlug": "estacionamiento", "word": "BALIZA", "hint": "Luz intermitente que se enciende al detenerse en la vía" },
  { "id": "h008", "lessonSlug": "giros-y-adelantamiento", "word": "SOBREPASO", "hint": "Maniobra de adelantar a otro vehículo que circula en el mismo sentido" },
  { "id": "h009", "lessonSlug": "senales-preventivas", "word": "CURVA PELIGROSA", "hint": "Señal preventiva amarilla que advierte un cambio de dirección riesgoso" },
  { "id": "h010", "lessonSlug": "velocidades", "word": "VELOCIDAD MAXIMA", "hint": "Límite superior de rapidez permitida en una vía" }
]
```

- [ ] **Step 8: Datos de ordená los pasos**

Crear `data/order-steps.json`:

```json
[
  {
    "id": "os001",
    "lessonSlug": "el-conductor-responsable",
    "title": "¿Qué hacer antes de arrancar el auto?",
    "steps": [
      "Ajustar el asiento y los espejos retrovisores",
      "Abrocharse el cinturón de seguridad",
      "Verificar que todos los pasajeros tengan el cinturón puesto",
      "Guardar el celular en la guantera o ponerlo en modo avión",
      "Verificar espejos y puntos ciegos",
      "Iniciar la marcha"
    ]
  },
  {
    "id": "os002",
    "lessonSlug": "estacionamiento",
    "title": "Pasos para estacionar en paralelo",
    "steps": [
      "Ubicar un espacio libre de al menos 1.5 veces el largo del vehículo",
      "Colocar las luces de giro indicando la maniobra",
      "Ubicarse en paralelo al vehículo de adelante a unos 50 cm",
      "Girar el volante hacia el cordón y retroceder lentamente",
      "Cuando el auto forme 45° con el cordón, girar el volante en sentido contrario",
      "Enderezar el vehículo paralelo al cordón y a no más de 20 cm"
    ]
  },
  {
    "id": "os003",
    "lessonSlug": "giros-y-adelantamiento",
    "title": "Pasos para girar a la izquierda en una intersección",
    "steps": [
      "Señalizar con anticipación usando la luz de giro izquierda",
      "Ubicarse en el carril más próximo al centro de la calzada",
      "Reducir la velocidad al acercarse a la intersección",
      "Ceder el paso a los vehículos que vienen de frente",
      "Verificar que no haya peatones cruzando",
      "Completar el giro con precaución"
    ]
  },
  {
    "id": "os004",
    "lessonSlug": "prioridad-normativa",
    "title": "Orden de prioridad normativa (de mayor a menor)",
    "steps": [
      "Señales u órdenes de la autoridad de control",
      "Señales transitorias (color naranja, obras)",
      "Semáforos",
      "Demarcación horizontal y señalización vertical",
      "Normas legales de carácter general"
    ]
  }
]
```

- [ ] **Step 9: Datos de señales para clasificador**

Crear `data/signals.json`:

```json
[
  { "id": "s001", "name": "PARE", "category": "reglamentaria", "description": "Detención obligatoria", "svgPath": "octagon" },
  { "id": "s002", "name": "Ceda el paso", "category": "reglamentaria", "description": "Ceder el paso a otros vehículos", "svgPath": "triangle-inverted" },
  { "id": "s003", "name": "Contramano", "category": "reglamentaria", "description": "Prohibido ingresar", "svgPath": "circle-line" },
  { "id": "s004", "name": "Prohibido estacionar", "category": "reglamentaria", "description": "No se puede dejar el vehículo", "svgPath": "circle-e-cross" },
  { "id": "s005", "name": "Velocidad máxima 40", "category": "reglamentaria", "description": "No superar 40 km/h", "svgPath": "circle-40" },
  { "id": "s006", "name": "Curva peligrosa", "category": "preventiva", "description": "Advierte curva riesgosa adelante", "svgPath": "diamond-curve" },
  { "id": "s007", "name": "Cruce de peatones", "category": "preventiva", "description": "Advierte zona de cruce peatonal", "svgPath": "diamond-pedestrian" },
  { "id": "s008", "name": "Cruce ferroviario", "category": "preventiva", "description": "Advierte proximidad de vía de tren", "svgPath": "diamond-train" },
  { "id": "s009", "name": "Hospital", "category": "informativa", "description": "Indica presencia de centro de salud", "svgPath": "square-hospital" },
  { "id": "s010", "name": "Estación de servicio", "category": "informativa", "description": "Indica presencia de estación de combustible", "svgPath": "square-fuel" },
  { "id": "s011", "name": "Cono de obra", "category": "transitoria", "description": "Indica obras en la vía", "svgPath": "cone" },
  { "id": "s012", "name": "Desvío por obra", "category": "transitoria", "description": "Indica cambio de recorrido por obras", "svgPath": "diamond-detour" }
]
```

- [ ] **Step 10: Commit**

```bash
git add data/
git commit -m "feat: datos JSON de juegos basados en el Manual del Conductor CABA"
```

---

### Task 7: Utilidades de preguntas y SEO

**Files:**
- Create: `src/lib/questions.ts`, `src/lib/seo.ts`
- Create: `__tests__/lib/questions.test.ts`

- [ ] **Step 1: Test de utilidades de preguntas**

Crear `__tests__/lib/questions.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { filterByLesson, shuffleArray, pickRandom } from '@/lib/questions'

const items = [
  { id: '1', lessonSlug: 'velocidades' },
  { id: '2', lessonSlug: 'semaforos-y-luces' },
  { id: '3', lessonSlug: 'velocidades' },
  { id: '4', lessonSlug: 'estacionamiento' },
]

describe('filterByLesson', () => {
  it('filtra por slug de lección', () => {
    const result = filterByLesson(items, 'velocidades')
    expect(result).toHaveLength(2)
    expect(result.every((i) => i.lessonSlug === 'velocidades')).toBe(true)
  })

  it('devuelve todos si slug es undefined', () => {
    const result = filterByLesson(items, undefined)
    expect(result).toHaveLength(4)
  })
})

describe('shuffleArray', () => {
  it('devuelve un array del mismo tamaño', () => {
    const arr = [1, 2, 3, 4, 5]
    const shuffled = shuffleArray(arr)
    expect(shuffled).toHaveLength(5)
  })

  it('no muta el array original', () => {
    const arr = [1, 2, 3]
    const original = [...arr]
    shuffleArray(arr)
    expect(arr).toEqual(original)
  })
})

describe('pickRandom', () => {
  it('devuelve la cantidad solicitada', () => {
    const result = pickRandom(items, 2)
    expect(result).toHaveLength(2)
  })

  it('no devuelve más de los disponibles', () => {
    const result = pickRandom(items, 100)
    expect(result).toHaveLength(4)
  })
})
```

- [ ] **Step 2: Correr test para verificar que falla**

```bash
npx vitest run __tests__/lib/questions.test.ts
```

- [ ] **Step 3: Implementar utilidades**

Crear `src/lib/questions.ts`:

```typescript
// Filtrar items por lección
export function filterByLesson<T extends { lessonSlug: string }>(
  items: T[],
  lessonSlug: string | undefined
): T[] {
  if (!lessonSlug) return items
  return items.filter((item) => item.lessonSlug === lessonSlug)
}

// Mezclar array (Fisher-Yates) sin mutar el original
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Seleccionar N elementos aleatorios
export function pickRandom<T>(array: T[], count: number): T[] {
  return shuffleArray(array).slice(0, count)
}
```

- [ ] **Step 4: Correr test**

```bash
npx vitest run __tests__/lib/questions.test.ts
```

Esperado: PASS

- [ ] **Step 5: Utilidad SEO**

Crear `src/lib/seo.ts`:

```typescript
import type { Metadata } from 'next'

interface SEOParams {
  title: string
  description: string
  path: string
  ogImage?: string
}

const BASE_URL = 'https://manejate.com.ar'

export function generateMetadata({ title, description, path, ogImage }: SEOParams): Metadata {
  const url = `${BASE_URL}${path}`
  const image = ogImage || `${BASE_URL}/og/default.png`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630 }],
      type: 'website',
      locale: 'es_AR',
      siteName: 'Manejate',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/questions.ts src/lib/seo.ts __tests__/lib/questions.test.ts
git commit -m "feat: utilidades de preguntas (filter, shuffle, pick) y generador SEO"
```

---

## MILESTONE 3: Páginas principales

### Task 8: Home page

**Files:**
- Create: `src/components/home/Hero.tsx`, `src/components/home/PathSelector.tsx`, `src/components/home/GamesPreview.tsx`, `src/components/home/StatsCounter.tsx`, `src/components/home/SEOBlock.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Componente Hero**

Crear `src/components/home/Hero.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-vial-blue via-vial-blue-dark to-vial-asphalt-dark">
      {/* Patrón decorativo de fondo — líneas de carretera */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-white" />
        <div className="absolute top-1/2 left-0 right-0 flex gap-8 justify-center">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-12 h-1 bg-white" />
          ))}
        </div>
        <div className="absolute top-3/4 left-0 right-0 h-1 bg-white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="text-center">
          {/* Badge superior */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="inline-block bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full border border-white/20 mb-6">
              Basado en el Manual Oficial de CABA
            </span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Aprendé a manejar
            <span className="block text-vial-yellow">jugando.</span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10"
          >
            Practicá gratis para el examen teórico de conducir en CABA.
            Lecciones, juegos y simulacros que te preparan de verdad.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/lecciones">
              <Button variant="primary" size="lg">
                Empezar ahora
              </Button>
            </Link>
            <Link href="/examenes">
              <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                Hacer simulacro
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Componente PathSelector**

Crear `src/components/home/PathSelector.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Link from 'next/link'

export default function PathSelector() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/lecciones?camino=primera">
          <Card className="text-center p-8 border-2 border-transparent hover:border-vial-blue">
            <div className="text-4xl mb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="1.5" className="mx-auto">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-vial-asphalt-dark mb-2">Primera licencia</h3>
            <p className="text-sm text-vial-asphalt-light">
              Nunca manejé. Quiero aprender todo desde cero.
            </p>
          </Card>
        </Link>

        <Link href="/lecciones?camino=renovacion">
          <Card className="text-center p-8 border-2 border-transparent hover:border-vial-green">
            <div className="text-4xl mb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="1.5" className="mx-auto">
                <path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round"/>
                <path d="M21 3v5h-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-vial-asphalt-dark mb-2">Renovación / Repaso</h3>
            <p className="text-sm text-vial-asphalt-light">
              Ya manejo pero necesito repasar para el examen.
            </p>
          </Card>
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Componente GamesPreview**

Crear `src/components/home/GamesPreview.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Link from 'next/link'
import gamesMeta from '@/../data/games-meta.json'

const gameIcons: Record<string, string> = {
  memory: '🧠', quiz: '❓', 'true-or-false': '✅', 'fill-blank': '✏️',
  crossword: '📝', 'word-search': '🔍', 'drag-classify': '🎯',
  hangman: '💀', 'road-situation': '🚗', 'exam-simulator': '📋',
  'order-steps': '📑',
}

export default function GamesPreview() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-vial-asphalt-dark mb-3">
          11 juegos para aprender
        </h2>
        <p className="text-vial-asphalt-light max-w-xl mx-auto">
          Cada persona aprende distinto. Elegí el juego que más te guste y aprendé las normas de tránsito mientras te divertís.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {gamesMeta.map((game, index) => (
          <motion.div
            key={game.type}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/juegos/${game.type}`}>
              <Card className="text-center p-4 h-full">
                <span className="text-3xl block mb-2">{gameIcons[game.type] || '🎮'}</span>
                <h3 className="text-sm font-bold text-vial-asphalt-dark">{game.name}</h3>
                <p className="text-xs text-vial-asphalt-light mt-1">{game.description}</p>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link href="/juegos" className="text-vial-blue font-medium hover:underline">
          Ver todos los juegos
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Componente StatsCounter**

Crear `src/components/home/StatsCounter.tsx`:

```tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

function AnimatedNumber({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const increment = target / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return <span ref={ref}>{count.toLocaleString('es-AR')}</span>
}

const stats = [
  { label: 'Preguntas de práctica', value: 200, suffix: '+' },
  { label: 'Juegos disponibles', value: 11, suffix: '' },
  { label: 'Lecciones del manual', value: 12, suffix: '' },
  { label: 'Simulacros de examen', value: 4, suffix: ' niveles' },
]

export default function StatsCounter() {
  return (
    <section className="bg-vial-gray-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-vial-blue">
                <AnimatedNumber target={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-sm text-vial-asphalt-light mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Componente SEOBlock**

Crear `src/components/home/SEOBlock.tsx`:

```tsx
export default function SEOBlock() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-bold text-vial-asphalt-dark mb-6">
        ¿Cómo es el examen teórico de manejo en CABA?
      </h2>
      <div className="prose prose-lg text-vial-asphalt leading-relaxed space-y-4">
        <p>
          El examen teórico de conducir en la Ciudad de Buenos Aires evalúa tus conocimientos sobre
          las normas de tránsito establecidas en la <strong>Ley 2148</strong> y el Manual del Conductor.
          Consiste en preguntas de opción múltiple sobre señales de tránsito, prioridades de paso,
          velocidades permitidas, estacionamiento y conducción segura.
        </p>
        <p>
          En <strong>Manejate</strong> podés practicar con simulacros que replican el formato real del examen,
          aprender con lecciones basadas en el manual oficial, y reforzar tus conocimientos con 11 juegos
          interactivos diseñados para que aprendas sin aburrirte.
        </p>
        <p>
          Todo el contenido está basado en el <strong>Manual del Conductor de CABA 2019</strong> y la
          legislación vigente. No reemplaza la formación oficial, pero es la mejor herramienta
          complementaria para llegar preparado al examen.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Ensamblar page.tsx del Home**

Modificar `src/app/page.tsx`:

```tsx
import Hero from '@/components/home/Hero'
import PathSelector from '@/components/home/PathSelector'
import GamesPreview from '@/components/home/GamesPreview'
import StatsCounter from '@/components/home/StatsCounter'
import SEOBlock from '@/components/home/SEOBlock'
import AdSlot from '@/components/ui/AdSlot'

export default function Home() {
  return (
    <>
      <Hero />
      <PathSelector />
      <AdSlot position="header" className="max-w-4xl mx-auto mt-10" />
      <GamesPreview />
      <StatsCounter />
      <SEOBlock />
    </>
  )
}
```

- [ ] **Step 7: Verificar visualmente**

```bash
npm run dev
```

Abrir http://localhost:3000. Verificar: Hero con gradiente azul, selector de camino, grilla de juegos, contadores animados, bloque SEO, responsive.

- [ ] **Step 8: Commit**

```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat: Home page con Hero, selector de camino, preview de juegos y bloque SEO"
```

---

### Task 9: GameWrapper compartido

**Files:**
- Create: `src/components/juegos/GameWrapper.tsx`, `src/components/juegos/GameCard.tsx`

- [ ] **Step 1: GameWrapper — envoltorio compartido para todos los juegos**

Crear `src/components/juegos/GameWrapper.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import { useProgress } from '@/context/ProgressContext'
import type { GameType } from '@/types'
import lessonsMeta from '@/../data/lessons-meta.json'

interface GameWrapperProps {
  gameType: GameType
  gameName: string
  children: (props: {
    lessonFilter: string | undefined
    onGameComplete: (score: number, xpEarned: number) => void
    onRestart: () => void
    gameKey: number
  }) => React.ReactNode
}

export default function GameWrapper({ gameType, gameName, children }: GameWrapperProps) {
  const [lessonFilter, setLessonFilter] = useState<string | undefined>(undefined)
  const [gameKey, setGameKey] = useState(0) // para forzar restart
  const [result, setResult] = useState<{ score: number; xp: number } | null>(null)
  const { recordGame } = useProgress()

  const handleGameComplete = (score: number, xpEarned: number) => {
    recordGame(gameType, score, xpEarned)
    setResult({ score, xp: xpEarned })
  }

  const handleRestart = () => {
    setResult(null)
    setGameKey((prev) => prev + 1)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabecera del juego */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-vial-asphalt-dark">{gameName}</h1>

        {/* Filtro por tema */}
        <select
          value={lessonFilter || ''}
          onChange={(e) => {
            setLessonFilter(e.target.value || undefined)
            handleRestart()
          }}
          className="px-4 py-2 rounded-xl border border-vial-gray-mid bg-white text-sm text-vial-asphalt focus:border-vial-blue focus:outline-none"
        >
          <option value="">Todos los temas</option>
          {lessonsMeta.map((lesson) => (
            <option key={lesson.slug} value={lesson.slug}>
              {lesson.title}
            </option>
          ))}
        </select>
      </div>

      {/* Resultado */}
      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">{result.score >= 70 ? '🎉' : '💪'}</div>
            <h2 className="text-2xl font-bold text-vial-asphalt-dark mb-2">
              {result.score >= 70 ? '¡Muy bien!' : '¡Seguí practicando!'}
            </h2>
            <p className="text-vial-asphalt-light mb-2">
              Puntaje: <span className="font-bold text-vial-blue">{result.score}%</span>
            </p>
            <p className="text-sm text-vial-green font-medium mb-6">+{result.xp} XP</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleRestart}>Jugar de nuevo</Button>
              <Button variant="ghost" onClick={() => window.history.back()}>
                Volver a juegos
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={gameKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
```

- [ ] **Step 2: GameCard para el índice de juegos**

Crear `src/components/juegos/GameCard.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Link from 'next/link'
import type { GameMeta } from '@/types'

const gameEmojis: Record<string, string> = {
  memory: '🧠', quiz: '❓', 'true-or-false': '✅', 'fill-blank': '✏️',
  crossword: '📝', 'word-search': '🔍', 'drag-classify': '🎯',
  hangman: '💀', 'road-situation': '🚗', 'exam-simulator': '📋',
  'order-steps': '📑',
}

const difficultyColors = {
  facil: 'green' as const,
  medio: 'yellow' as const,
  dificil: 'red' as const,
}

const difficultyLabels = {
  facil: 'Fácil',
  medio: 'Medio',
  dificil: 'Difícil',
}

export default function GameCard({ game, index }: { game: GameMeta; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/juegos/${game.type}`}>
        <Card className="h-full p-6">
          <div className="flex items-start justify-between mb-3">
            <span className="text-3xl">{gameEmojis[game.type] || '🎮'}</span>
            <Badge variant={difficultyColors[game.difficulty]}>
              {difficultyLabels[game.difficulty]}
            </Badge>
          </div>
          <h3 className="text-lg font-bold text-vial-asphalt-dark mb-1">{game.name}</h3>
          <p className="text-sm text-vial-asphalt-light">{game.description}</p>
          <div className="mt-3 text-xs text-vial-green font-medium">+{game.xpReward} XP</div>
        </Card>
      </Link>
    </motion.div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/juegos/GameWrapper.tsx src/components/juegos/GameCard.tsx
git commit -m "feat: GameWrapper compartido y GameCard para índice de juegos"
```

---

## MILESTONE 4: Juegos (Tasks 10-20)

**NOTA:** Cada juego sigue el mismo patrón: componente React dentro de `src/components/juegos/`, usa GameWrapper, importa datos del JSON correspondiente, reporta score y XP al completar.

### Task 10: Juego Quiz

**Files:**
- Create: `src/components/juegos/Quiz.tsx`
- Create: `src/app/juegos/quiz/page.tsx`

- [ ] **Step 1: Componente Quiz**

Crear `src/components/juegos/Quiz.tsx`:

```tsx
'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import { filterByLesson, shuffleArray, pickRandom } from '@/lib/questions'
import quizData from '@/../data/quiz.json'
import type { QuizQuestion } from '@/types'

interface QuizProps {
  lessonFilter: string | undefined
  onGameComplete: (score: number, xpEarned: number) => void
  gameKey: number
}

const QUESTIONS_PER_ROUND = 10

export default function Quiz({ lessonFilter, onGameComplete, gameKey }: QuizProps) {
  const questions = useMemo(() => {
    const filtered = filterByLesson(quizData as QuizQuestion[], lessonFilter)
    return pickRandom(filtered, QUESTIONS_PER_ROUND)
  }, [lessonFilter, gameKey])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)

  const current = questions[currentIndex]

  if (!current) {
    return (
      <div className="text-center py-12 text-vial-asphalt-light">
        No hay preguntas disponibles para este tema. Probá con otro filtro.
      </div>
    )
  }

  const handleSelect = (optionIndex: number) => {
    if (selectedOption !== null) return // ya respondió
    setSelectedOption(optionIndex)
    setShowExplanation(true)
    if (optionIndex === current.correctIndex) {
      setCorrectCount((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      const score = Math.round((correctCount + (selectedOption === current.correctIndex ? 0 : 0)) / questions.length * 100)
      // Recalcular score final incluyendo la última respuesta
      const finalCorrect = correctCount + (selectedOption === current.correctIndex ? 1 : 0)
      const finalScore = Math.round((finalCorrect / questions.length) * 100)
      const xp = finalScore >= 70 ? 20 : 10
      onGameComplete(finalScore, xp)
      return
    }
    setCurrentIndex((prev) => prev + 1)
    setSelectedOption(null)
    setShowExplanation(false)
    if (selectedOption === current.correctIndex) {
      // correctCount ya se incrementó en handleSelect
    }
  }

  const progress = ((currentIndex) / questions.length) * 100

  return (
    <div>
      {/* Barra de progreso */}
      <div className="w-full bg-vial-gray-light rounded-full h-2 mb-6">
        <div
          className="h-2 rounded-full bg-vial-blue transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Contador */}
      <div className="text-sm text-vial-asphalt-light mb-4">
        Pregunta {currentIndex + 1} de {questions.length}
      </div>

      {/* Pregunta */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h2 className="text-xl font-bold text-vial-asphalt-dark mb-6">
            {current.question}
          </h2>

          {/* Opciones */}
          <div className="space-y-3 mb-6">
            {current.options.map((option, i) => {
              let optionStyle = 'border-vial-gray-mid hover:border-vial-blue bg-white'
              if (selectedOption !== null) {
                if (i === current.correctIndex) {
                  optionStyle = 'border-vial-green bg-vial-green/5 text-vial-green'
                } else if (i === selectedOption && i !== current.correctIndex) {
                  optionStyle = 'border-vial-red bg-vial-red/5 text-vial-red'
                } else {
                  optionStyle = 'border-vial-gray-mid bg-white opacity-50'
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={selectedOption !== null}
                  className={`
                    w-full text-left px-5 py-4 rounded-xl border-2 transition-all
                    ${optionStyle}
                    ${selectedOption === null ? 'cursor-pointer' : 'cursor-default'}
                  `}
                >
                  <span className="font-medium">{String.fromCharCode(65 + i)}.</span> {option}
                </button>
              )
            })}
          </div>

          {/* Explicación */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-vial-blue/5 border border-vial-blue/20 rounded-xl p-4 mb-6"
            >
              <p className="text-sm text-vial-asphalt">{current.explanation}</p>
              <p className="text-xs text-vial-asphalt-light mt-2">{current.source}</p>
            </motion.div>
          )}

          {/* Botón siguiente */}
          {selectedOption !== null && (
            <div className="flex justify-end">
              <Button onClick={handleNext}>
                {currentIndex + 1 >= questions.length ? 'Ver resultado' : 'Siguiente'}
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2: Página del juego Quiz**

Crear `src/app/juegos/quiz/page.tsx`:

```tsx
import { generateMetadata as seo } from '@/lib/seo'
import GameWrapper from '@/components/juegos/GameWrapper'
import Quiz from '@/components/juegos/Quiz'

export const metadata = seo({
  title: 'Quiz de Tránsito — Preguntas del examen de manejo CABA',
  description: 'Practicá con preguntas de opción múltiple basadas en el Manual del Conductor de CABA. Feedback inmediato y explicaciones.',
  path: '/juegos/quiz',
})

export default function QuizPage() {
  return (
    <GameWrapper gameType="quiz" gameName="Quiz de Tránsito">
      {(props) => <Quiz {...props} />}
    </GameWrapper>
  )
}
```

- [ ] **Step 3: Verificar**

```bash
npm run dev
```

Abrir http://localhost:3000/juegos/quiz. Verificar: preguntas se muestran, opciones clickeables, feedback de color, explicación, score al final.

- [ ] **Step 4: Commit**

```bash
git add src/components/juegos/Quiz.tsx src/app/juegos/quiz/
git commit -m "feat: juego Quiz con preguntas de opción múltiple y feedback"
```

---

### Task 11: Juego Verdadero o Falso

**Files:**
- Create: `src/components/juegos/TrueOrFalse.tsx`, `src/app/juegos/true-or-false/page.tsx`

- [ ] **Step 1: Componente TrueOrFalse**

Crear `src/components/juegos/TrueOrFalse.tsx`:

```tsx
'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import { filterByLesson, pickRandom } from '@/lib/questions'
import tfData from '@/../data/true-false.json'
import type { TrueFalseStatement } from '@/types'

interface TrueOrFalseProps {
  lessonFilter: string | undefined
  onGameComplete: (score: number, xpEarned: number) => void
  gameKey: number
}

const STATEMENTS_PER_ROUND = 15

export default function TrueOrFalse({ lessonFilter, onGameComplete, gameKey }: TrueOrFalseProps) {
  const statements = useMemo(() => {
    const filtered = filterByLesson(tfData as TrueFalseStatement[], lessonFilter)
    return pickRandom(filtered, STATEMENTS_PER_ROUND)
  }, [lessonFilter, gameKey])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState<boolean | null>(null)
  const [correctCount, setCorrectCount] = useState(0)

  const current = statements[currentIndex]

  if (!current) {
    return <div className="text-center py-12 text-vial-asphalt-light">No hay afirmaciones disponibles para este tema.</div>
  }

  const handleAnswer = (userAnswer: boolean) => {
    if (answer !== null) return
    setAnswer(userAnswer)
    if (userAnswer === current.isTrue) {
      setCorrectCount((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    const isLast = currentIndex + 1 >= statements.length
    if (isLast) {
      const finalCorrect = correctCount + (answer === current.isTrue ? 1 : 0)
      const score = Math.round((finalCorrect / statements.length) * 100)
      onGameComplete(score, score >= 70 ? 10 : 5)
      return
    }
    setCurrentIndex((prev) => prev + 1)
    setAnswer(null)
  }

  const isCorrect = answer === current.isTrue
  const progress = (currentIndex / statements.length) * 100

  return (
    <div>
      <div className="w-full bg-vial-gray-light rounded-full h-2 mb-6">
        <div className="h-2 rounded-full bg-vial-blue transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div className="text-sm text-vial-asphalt-light mb-4">
        {currentIndex + 1} de {statements.length}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <div className="bg-white rounded-2xl border border-vial-gray-mid p-8 mb-6 text-center">
            <p className="text-lg font-medium text-vial-asphalt-dark leading-relaxed">
              "{current.statement}"
            </p>
          </div>

          {answer === null ? (
            <div className="flex gap-4 justify-center">
              <Button variant="success" size="lg" onClick={() => handleAnswer(true)} className="min-w-[140px]">
                Verdadero
              </Button>
              <Button variant="danger" size="lg" onClick={() => handleAnswer(false)} className="min-w-[140px]">
                Falso
              </Button>
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center p-4 rounded-xl mb-4 ${isCorrect ? 'bg-vial-green/10 text-vial-green' : 'bg-vial-red/10 text-vial-red'}`}
              >
                <span className="text-2xl block mb-1">{isCorrect ? '✓' : '✗'}</span>
                <span className="font-bold">{isCorrect ? '¡Correcto!' : 'Incorrecto'}</span>
                <span className="block text-sm mt-1">La respuesta es: {current.isTrue ? 'Verdadero' : 'Falso'}</span>
              </motion.div>

              <div className="bg-vial-blue/5 border border-vial-blue/20 rounded-xl p-4 mb-6">
                <p className="text-sm text-vial-asphalt">{current.explanation}</p>
                <p className="text-xs text-vial-asphalt-light mt-2">{current.source}</p>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleNext}>
                  {currentIndex + 1 >= statements.length ? 'Ver resultado' : 'Siguiente'}
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2: Página**

Crear `src/app/juegos/true-or-false/page.tsx`:

```tsx
import { generateMetadata as seo } from '@/lib/seo'
import GameWrapper from '@/components/juegos/GameWrapper'
import TrueOrFalse from '@/components/juegos/TrueOrFalse'

export const metadata = seo({
  title: 'Verdadero o Falso — Normas de tránsito CABA',
  description: '¿Sabés qué es verdad y qué no sobre las normas de tránsito? Practicá con afirmaciones del Manual del Conductor.',
  path: '/juegos/true-or-false',
})

export default function TrueOrFalsePage() {
  return (
    <GameWrapper gameType="true-or-false" gameName="Verdadero o Falso">
      {(props) => <TrueOrFalse {...props} />}
    </GameWrapper>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/juegos/TrueOrFalse.tsx src/app/juegos/true-or-false/
git commit -m "feat: juego Verdadero o Falso con feedback y explicaciones"
```

---

### Tasks 12-20: Juegos restantes

**Los juegos restantes siguen el mismo patrón exacto que Quiz y TrueOrFalse. Cada uno:**
1. Crea el componente en `src/components/juegos/[Nombre].tsx`
2. Crea la página en `src/app/juegos/[tipo]/page.tsx`
3. Importa datos del JSON correspondiente
4. Usa `GameWrapper` para el wrapper compartido
5. Reporta score + XP via `onGameComplete`

**Task 12:** Memory (`Memory.tsx`) — Grilla de cartas con flip animation (Framer Motion). Match señal con significado.
**Task 13:** Completar la frase (`FillBlank.tsx`) — Similar a Quiz pero con texto partido y hueco.
**Task 14:** Crucigrama (`Crossword.tsx`) — Grilla CSS Grid con inputs por celda. Validación por palabra.
**Task 15:** Sopa de letras (`WordSearch.tsx`) — Grilla de letras, selección por drag/click.
**Task 16:** Arrastra y suelta (`DragClassify.tsx`) — Drag & drop nativo HTML5 + touch events.
**Task 17:** Ahorcado (`Hangman.tsx`) — SVG progresivo del muñeco + teclado de letras.
**Task 18:** Situaciones viales (`RoadSituation.tsx`) — SVG inline de intersección + preguntas.
**Task 19:** Simulacro de examen (`ExamSimulator.tsx`) — Usa Timer, 30 preguntas, sin volver atrás.
**Task 20:** Ordená los pasos (`OrderSteps.tsx`) — Drag & drop para reordenar lista.

**Cada task sigue estos steps:**
1. Crear componente con la mecánica del juego
2. Crear page.tsx con metadata SEO
3. Verificar visualmente
4. Commit

**IMPORTANTE PARA EL IMPLEMENTADOR:** Cada juego debe implementarse completamente funcional. La mecánica de cada uno está detallada en la sección 4 del spec (`docs/superpowers/specs/2026-04-05-manejate-design.md`). Referirse al spec para las reglas exactas de cada juego.

---

## MILESTONE 5: Índices y navegación

### Task 21: Página índice de juegos

**Files:**
- Create: `src/app/juegos/page.tsx`

- [ ] **Step 1: Página índice**

Crear `src/app/juegos/page.tsx`:

```tsx
import { generateMetadata as seo } from '@/lib/seo'
import GameCard from '@/components/juegos/GameCard'
import gamesMeta from '@/../data/games-meta.json'
import type { GameMeta } from '@/types'

export const metadata = seo({
  title: 'Juegos para aprender a manejar — 11 juegos gratis',
  description: 'Memory, crucigramas, quiz, sopa de letras y más. 11 juegos gratuitos para aprender las normas de tránsito de CABA jugando.',
  path: '/juegos',
})

export default function JuegosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-vial-asphalt-dark mb-3">Juegos</h1>
        <p className="text-vial-asphalt-light max-w-xl mx-auto">
          Elegí el juego que más te guste. Todos están basados en el Manual del Conductor de CABA y te dan puntos de experiencia.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(gamesMeta as GameMeta[]).map((game, index) => (
          <GameCard key={game.type} game={game} index={index} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/juegos/page.tsx
git commit -m "feat: página índice de juegos con grilla de GameCards"
```

---

### Task 22: Sistema de lecciones (MDX)

**Files:**
- Create: `src/app/lecciones/page.tsx`, `src/app/lecciones/[slug]/page.tsx`
- Create: `src/components/lecciones/LessonMap.tsx`, `src/components/lecciones/LessonNav.tsx`, `src/components/lecciones/MiniQuiz.tsx`, `src/components/lecciones/KeyFact.tsx`
- Create: `content/lecciones/el-conductor-responsable.mdx` (primera lección como modelo)
- Modify: `next.config.mjs`

- [ ] **Step 1: Configurar MDX en Next.js**

Modificar `next.config.mjs`:

```javascript
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

export default withMDX(nextConfig)
```

- [ ] **Step 2: Componente KeyFact**

Crear `src/components/lecciones/KeyFact.tsx`:

```tsx
interface KeyFactProps {
  children: React.ReactNode
  type?: 'info' | 'warning' | 'danger'
}

const styles = {
  info: 'bg-vial-blue/5 border-vial-blue/30 text-vial-blue',
  warning: 'bg-vial-yellow/10 border-vial-yellow/30 text-vial-yellow-dark',
  danger: 'bg-vial-red/5 border-vial-red/30 text-vial-red',
}

const icons = {
  info: 'ℹ️',
  warning: '⚠️',
  danger: '🚨',
}

export default function KeyFact({ children, type = 'info' }: KeyFactProps) {
  return (
    <div className={`border-l-4 rounded-r-xl p-4 my-6 ${styles[type]}`}>
      <div className="flex gap-3">
        <span className="text-lg">{icons[type]}</span>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Componente MiniQuiz**

Crear `src/components/lecciones/MiniQuiz.tsx`:

```tsx
'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import type { QuizQuestion } from '@/types'

export default function MiniQuiz({ questions }: { questions: QuizQuestion[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = questions[currentIndex]

  if (finished) {
    return (
      <div className="bg-vial-green/5 border border-vial-green/20 rounded-2xl p-6 my-8 text-center">
        <div className="text-3xl mb-2">{score === questions.length ? '🏆' : '👍'}</div>
        <p className="font-bold text-vial-asphalt-dark">
          {score} de {questions.length} correctas
        </p>
      </div>
    )
  }

  if (!q) return null

  const handleSelect = (i: number) => {
    if (selected !== null) return
    setSelected(i)
    if (i === q.correctIndex) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrentIndex((i) => i + 1)
      setSelected(null)
    }
  }

  return (
    <div className="bg-white border border-vial-gray-mid rounded-2xl p-6 my-8">
      <h3 className="text-sm font-bold text-vial-blue uppercase tracking-wider mb-4">
        Mini-quiz — Pregunta {currentIndex + 1} de {questions.length}
      </h3>
      <p className="font-medium text-vial-asphalt-dark mb-4">{q.question}</p>
      <div className="space-y-2 mb-4">
        {q.options.map((opt, i) => {
          let style = 'border-vial-gray-mid hover:border-vial-blue'
          if (selected !== null) {
            if (i === q.correctIndex) style = 'border-vial-green bg-vial-green/5'
            else if (i === selected) style = 'border-vial-red bg-vial-red/5'
            else style = 'border-vial-gray-mid opacity-50'
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} disabled={selected !== null}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${style}`}>
              {opt}
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <div className="flex justify-between items-center">
          <p className="text-xs text-vial-asphalt-light">{q.explanation}</p>
          <Button size="sm" onClick={handleNext}>
            {currentIndex + 1 >= questions.length ? 'Terminar' : 'Siguiente'}
          </Button>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Componente LessonNav**

Crear `src/components/lecciones/LessonNav.tsx`:

```tsx
import Link from 'next/link'
import lessonsMeta from '@/../data/lessons-meta.json'

export default function LessonNav({ currentSlug }: { currentSlug: string }) {
  const currentIndex = lessonsMeta.findIndex((l) => l.slug === currentSlug)
  const prev = currentIndex > 0 ? lessonsMeta[currentIndex - 1] : null
  const next = currentIndex < lessonsMeta.length - 1 ? lessonsMeta[currentIndex + 1] : null

  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-vial-gray-mid">
      {prev ? (
        <Link href={`/lecciones/${prev.slug}`} className="text-sm text-vial-blue hover:underline">
          ← {prev.title}
        </Link>
      ) : <div />}
      {next ? (
        <Link href={`/lecciones/${next.slug}`} className="text-sm text-vial-blue hover:underline">
          {next.title} →
        </Link>
      ) : <div />}
    </div>
  )
}
```

- [ ] **Step 5: Componente LessonMap para la página índice**

Crear `src/components/lecciones/LessonMap.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import { useProgress } from '@/context/ProgressContext'
import lessonsMeta from '@/../data/lessons-meta.json'

export default function LessonMap() {
  const { progress } = useProgress()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {lessonsMeta.map((lesson, index) => {
        const isCompleted = progress.completedLessons.includes(lesson.slug)
        return (
          <motion.div
            key={lesson.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/lecciones/${lesson.slug}`}>
              <Card className="h-full p-5">
                <div className="flex items-start gap-3">
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold
                    ${isCompleted ? 'bg-vial-green text-white' : 'bg-vial-gray-light text-vial-asphalt-light'}
                  `}>
                    {isCompleted ? '✓' : lesson.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-vial-asphalt-dark text-sm">{lesson.title}</h3>
                    <p className="text-xs text-vial-asphalt-light mt-1">{lesson.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 6: Página índice de lecciones**

Crear `src/app/lecciones/page.tsx`:

```tsx
import { generateMetadata as seo } from '@/lib/seo'
import LessonMap from '@/components/lecciones/LessonMap'

export const metadata = seo({
  title: 'Lecciones del Manual del Conductor CABA — Aprendé a manejar',
  description: '12 lecciones basadas en el Manual del Conductor de CABA. Señales, semáforos, prioridades, velocidades y más. Contenido oficial.',
  path: '/lecciones',
})

export default function LeccionesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-vial-asphalt-dark mb-3">Lecciones</h1>
        <p className="text-vial-asphalt-light max-w-xl mx-auto">
          12 lecciones basadas en el Manual del Conductor de CABA. Seguí el camino recomendado o elegí el tema que necesites repasar.
        </p>
      </div>
      <LessonMap />
    </div>
  )
}
```

- [ ] **Step 7: Primera lección modelo (MDX)**

Crear `content/lecciones/el-conductor-responsable.mdx`:

**IMPORTANTE:** El contenido de esta lección debe escribirse leyendo las páginas 60-63 del manual (`Desktop/manual-transito-caba.pdf`). El implementador debe leer el manual y reescribir el contenido de forma clara y amigable, sin inventar nada.

```mdx
---
title: "El conductor responsable"
description: "Cinturón de seguridad, uso del celular, alcohol al volante y las distracciones que debés evitar al manejar."
lesson: 1
slug: "el-conductor-responsable"
---

# El conductor responsable

Antes de pensar en señales, semáforos o prioridades, lo primero que necesitás saber es cómo ser un conductor responsable. Esto significa entender que cuando manejás, tu vida y la de los demás dependen de tus decisiones.

## Cinturón de seguridad

El cinturón de seguridad es **obligatorio** para el conductor y todos los ocupantes del vehículo. Debe estar correctamente ajustado **antes de iniciar la marcha**.

<KeyFact type="danger">
El cinturón de seguridad debe abrocharse ANTES de arrancar. Intentar abrocharlo mientras se conduce es una distracción peligrosa.
</KeyFact>

## El celular al volante

Tanto manipular el celular como usarlo con altavoz o auriculares son considerados **riesgosos** al conducir. La conversación telefónica distrae al conductor porque deja de tener en primer plano el tránsito.

### ¿Qué hacer si necesitás atender una llamada?

1. Dejá que el acompañante atienda
2. Apagá el celular o ponelo en modo avión antes de manejar
3. Guardalo en la guantera o el baúl
4. Si es urgente: **colocá las balizas y detente en un lugar permitido**

<KeyFact type="warning">
Ni siquiera el manos libres es seguro. La distracción no es solo manipular el teléfono — es la conversación misma la que te saca el foco del camino.
</KeyFact>

## Otras distracciones

Mientras conducís, evitá:
- Cambiar de radio o CD
- Maquillarte
- Mirar a los demás ocupantes
- Intentar quitarte un abrigo
- Buscar dinero antes de un peaje
- Estirarte para buscar algo en la guantera

Todo esto debe hacerse **con el vehículo detenido**, nunca en movimiento.
```

**NOTA:** El implementador debe crear las 11 lecciones restantes siguiendo este mismo formato, extrayendo contenido del manual oficial.

- [ ] **Step 8: Página de lección individual (dinámica)**

Crear `src/app/lecciones/[slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import { generateMetadata as seo } from '@/lib/seo'
import LessonNav from '@/components/lecciones/LessonNav'
import lessonsMeta from '@/../data/lessons-meta.json'
import type { Metadata } from 'next'

// Generar las rutas estáticas
export function generateStaticParams() {
  return lessonsMeta.map((lesson) => ({ slug: lesson.slug }))
}

// Metadata dinámica
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const lesson = lessonsMeta.find((l) => l.slug === params.slug)
  if (!lesson) return {}
  return seo({
    title: `${lesson.title} — Lección ${lesson.id}`,
    description: lesson.description,
    path: `/lecciones/${lesson.slug}`,
  })
}

export default async function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = lessonsMeta.find((l) => l.slug === params.slug)
  if (!lesson) notFound()

  // Importar MDX dinámicamente
  let Content
  try {
    const mdxModule = await import(`@/../content/lecciones/${params.slug}.mdx`)
    Content = mdxModule.default
  } catch {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <span className="text-sm text-vial-blue font-medium">Lección {lesson.id} de 12</span>
        <h1 className="text-3xl font-bold text-vial-asphalt-dark mt-2">{lesson.title}</h1>
        <p className="text-vial-asphalt-light mt-2">{lesson.description}</p>
      </div>

      <article className="prose prose-lg max-w-none prose-headings:text-vial-asphalt-dark prose-p:text-vial-asphalt prose-a:text-vial-blue">
        <Content />
      </article>

      <LessonNav currentSlug={params.slug} />
    </div>
  )
}
```

- [ ] **Step 9: Commit**

```bash
git add src/components/lecciones/ src/app/lecciones/ content/lecciones/ next.config.mjs
git commit -m "feat: sistema de lecciones MDX con índice, navegación y primera lección"
```

---

### Task 23: Sistema de exámenes

**Files:**
- Create: `src/components/examenes/ExamEngine.tsx`, `src/components/examenes/ExamResult.tsx`
- Create: `src/app/examenes/page.tsx`, `src/app/examenes/[nivel]/page.tsx`

- [ ] **Step 1: ExamEngine**

Crear `src/components/examenes/ExamEngine.tsx`:

```tsx
'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import Timer from '@/components/ui/Timer'
import Button from '@/components/ui/Button'
import ExamResult from './ExamResult'
import { pickRandom } from '@/lib/questions'
import { useProgress } from '@/context/ProgressContext'
import { XP_REWARDS } from '@/lib/gamification'
import quizData from '@/../data/quiz.json'
import type { ExamConfig, ExamResult as ExamResultType, QuizQuestion } from '@/types'

const EXAM_CONFIGS: Record<string, ExamConfig> = {
  facil: { level: 'facil', questionCount: 10, timePerQuestion: null, totalTime: null, showExplanations: 'immediate', passingScore: 60 },
  medio: { level: 'medio', questionCount: 20, timePerQuestion: 30, totalTime: null, showExplanations: 'end', passingScore: 60 },
  dificil: { level: 'dificil', questionCount: 30, timePerQuestion: 20, totalTime: null, showExplanations: 'end', passingScore: 70 },
  simulacro: { level: 'simulacro', questionCount: 30, totalTime: 2700, timePerQuestion: null, showExplanations: 'end-detail', passingScore: 70 },
}

export default function ExamEngine({ nivel }: { nivel: string }) {
  const config = EXAM_CONFIGS[nivel]
  const { addXP, progress } = useProgress()

  const questions = useMemo(() => {
    return pickRandom(quizData as QuizQuestion[], config.questionCount)
  }, [config.questionCount])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [timerRunning, setTimerRunning] = useState(true)

  const current = questions[currentIndex]

  const handleTimeUp = useCallback(() => {
    setTimerRunning(false)
    finishExam()
  }, [])

  const handleSelect = (optionIndex: number) => {
    if (selectedOption !== null && config.showExplanations === 'immediate') return
    setSelectedOption(optionIndex)
    const newAnswers = [...answers]
    newAnswers[currentIndex] = optionIndex
    setAnswers(newAnswers)

    if (config.showExplanations !== 'immediate') {
      // En modos sin explicación inmediata, avanzar automáticamente
      setTimeout(() => {
        if (currentIndex + 1 >= questions.length) {
          finishExam(newAnswers)
        } else {
          setCurrentIndex((i) => i + 1)
          setSelectedOption(null)
        }
      }, 500)
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      const finalAnswers = [...answers]
      finalAnswers[currentIndex] = selectedOption
      finishExam(finalAnswers)
    } else {
      setCurrentIndex((i) => i + 1)
      setSelectedOption(null)
    }
  }

  const finishExam = (finalAnswers?: (number | null)[]) => {
    const ans = finalAnswers || answers
    const correct = ans.filter((a, i) => a === questions[i].correctIndex).length
    const percentage = Math.round((correct / questions.length) * 100)
    const passed = percentage >= config.passingScore

    const xpKey = `exam${config.level.charAt(0).toUpperCase() + config.level.slice(1)}` as keyof typeof XP_REWARDS
    if (passed && XP_REWARDS[xpKey]) {
      addXP(XP_REWARDS[xpKey])
    }

    setTimerRunning(false)
    setShowResult(true)
  }

  if (showResult) {
    const correct = answers.filter((a, i) => a === questions[i].correctIndex).length
    const percentage = Math.round((correct / questions.length) * 100)
    return (
      <ExamResult
        score={correct}
        total={questions.length}
        percentage={percentage}
        passed={percentage >= config.passingScore}
        nivel={nivel}
        questions={questions}
        answers={answers}
        showDetails={config.showExplanations === 'end-detail'}
      />
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header con timer */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-vial-asphalt-light">
          Pregunta {currentIndex + 1} de {questions.length}
        </span>
        {config.totalTime && (
          <Timer totalSeconds={config.totalTime} onTimeUp={handleTimeUp} isRunning={timerRunning} />
        )}
        {config.timePerQuestion && (
          <Timer
            key={currentIndex}
            totalSeconds={config.timePerQuestion}
            onTimeUp={handleNext}
            isRunning={timerRunning}
          />
        )}
      </div>

      {/* Barra de progreso */}
      <div className="w-full bg-vial-gray-light rounded-full h-2 mb-8">
        <div className="h-2 rounded-full bg-vial-blue transition-all" style={{ width: `${(currentIndex / questions.length) * 100}%` }} />
      </div>

      {/* Pregunta */}
      <h2 className="text-xl font-bold text-vial-asphalt-dark mb-6">{current.question}</h2>

      <div className="space-y-3">
        {current.options.map((option, i) => {
          let style = 'border-vial-gray-mid hover:border-vial-blue bg-white cursor-pointer'
          if (selectedOption === i) {
            if (config.showExplanations === 'immediate') {
              style = i === current.correctIndex
                ? 'border-vial-green bg-vial-green/5'
                : 'border-vial-red bg-vial-red/5'
            } else {
              style = 'border-vial-blue bg-vial-blue/5'
            }
          }
          return (
            <button key={i} onClick={() => handleSelect(i)}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${style}`}>
              <span className="font-medium">{String.fromCharCode(65 + i)}.</span> {option}
            </button>
          )
        })}
      </div>

      {/* Explicación inmediata (solo nivel fácil) */}
      {config.showExplanations === 'immediate' && selectedOption !== null && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-vial-blue/5 border border-vial-blue/20 rounded-xl p-4 mt-4">
          <p className="text-sm text-vial-asphalt">{current.explanation}</p>
          <div className="flex justify-end mt-3">
            <Button size="sm" onClick={handleNext}>
              {currentIndex + 1 >= questions.length ? 'Ver resultado' : 'Siguiente'}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: ExamResult**

Crear `src/components/examenes/ExamResult.tsx`:

```tsx
'use client'

import Button from '@/components/ui/Button'
import Link from 'next/link'
import type { QuizQuestion } from '@/types'

interface ExamResultProps {
  score: number
  total: number
  percentage: number
  passed: boolean
  nivel: string
  questions: QuizQuestion[]
  answers: (number | null)[]
  showDetails: boolean
}

export default function ExamResult({
  score, total, percentage, passed, nivel, questions, answers, showDetails,
}: ExamResultProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Resultado principal */}
      <div className="text-center mb-10">
        <div className="text-6xl mb-4">{passed ? '🎉' : '📚'}</div>
        <h1 className={`text-4xl font-bold mb-2 ${passed ? 'text-vial-green' : 'text-vial-red'}`}>
          {passed ? '¡Aprobado!' : 'No aprobado'}
        </h1>
        <p className="text-xl text-vial-asphalt">
          {score} de {total} correctas ({percentage}%)
        </p>
      </div>

      {/* Detalle por pregunta (solo en simulacro) */}
      {showDetails && (
        <div className="space-y-4 mb-10">
          <h2 className="text-lg font-bold text-vial-asphalt-dark">Revisión detallada</h2>
          {questions.map((q, i) => {
            const userAnswer = answers[i]
            const isCorrect = userAnswer === q.correctIndex
            return (
              <div key={q.id} className={`p-4 rounded-xl border ${isCorrect ? 'border-vial-green/30 bg-vial-green/5' : 'border-vial-red/30 bg-vial-red/5'}`}>
                <p className="font-medium text-sm text-vial-asphalt-dark mb-1">{i + 1}. {q.question}</p>
                {!isCorrect && (
                  <p className="text-xs text-vial-red">Tu respuesta: {userAnswer !== null ? q.options[userAnswer] : 'Sin respuesta'}</p>
                )}
                <p className="text-xs text-vial-green">Correcta: {q.options[q.correctIndex]}</p>
                <p className="text-xs text-vial-asphalt-light mt-1">{q.explanation}</p>
              </div>
            )
          })}
        </div>
      )}

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href={`/examenes/${nivel}`}>
          <Button>Reintentar</Button>
        </Link>
        <Link href="/examenes">
          <Button variant="ghost">Otro nivel</Button>
        </Link>
        {!passed && (
          <Link href="/lecciones">
            <Button variant="secondary">Repasar lecciones</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Página índice de exámenes**

Crear `src/app/examenes/page.tsx`:

```tsx
import { generateMetadata as seo } from '@/lib/seo'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Link from 'next/link'

export const metadata = seo({
  title: 'Exámenes de manejo CABA — Simulacro del examen teórico',
  description: 'Practicá con exámenes de 4 niveles de dificultad. Simulacro real del examen teórico de conducir en CABA con timer y puntaje.',
  path: '/examenes',
})

const levels = [
  { nivel: 'facil', name: 'Fácil', description: '10 preguntas, sin timer, explicaciones inmediatas', badge: 'green', emoji: '🟢' },
  { nivel: 'medio', name: 'Medio', description: '20 preguntas, 30 seg/pregunta', badge: 'yellow', emoji: '🟡' },
  { nivel: 'dificil', name: 'Difícil', description: '30 preguntas, 20 seg/pregunta', badge: 'red', emoji: '🔴' },
  { nivel: 'simulacro', name: 'Simulacro Real', description: '30 preguntas, 45 min total, 70% para aprobar', badge: 'blue', emoji: '📋' },
]

export default function ExamenesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-vial-asphalt-dark mb-3">Exámenes</h1>
        <p className="text-vial-asphalt-light max-w-xl mx-auto">
          4 niveles de dificultad. Empezá por el fácil y avanzá hasta el simulacro real del examen teórico de CABA.
        </p>
      </div>

      <div className="space-y-4">
        {levels.map((level) => (
          <Link key={level.nivel} href={`/examenes/${level.nivel}`}>
            <Card className="p-6 flex items-center gap-4 mb-4">
              <span className="text-3xl">{level.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-vial-asphalt-dark">{level.name}</h3>
                  <Badge variant={level.badge as 'green' | 'yellow' | 'red' | 'blue'}>{level.nivel}</Badge>
                </div>
                <p className="text-sm text-vial-asphalt-light">{level.description}</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-vial-asphalt-light">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Página de examen por nivel**

Crear `src/app/examenes/[nivel]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import { generateMetadata as seo } from '@/lib/seo'
import ExamEngine from '@/components/examenes/ExamEngine'
import type { Metadata } from 'next'

const validLevels = ['facil', 'medio', 'dificil', 'simulacro']
const levelNames: Record<string, string> = {
  facil: 'Fácil',
  medio: 'Medio',
  dificil: 'Difícil',
  simulacro: 'Simulacro Real',
}

export function generateStaticParams() {
  return validLevels.map((nivel) => ({ nivel }))
}

export async function generateMetadata({ params }: { params: { nivel: string } }): Promise<Metadata> {
  if (!validLevels.includes(params.nivel)) return {}
  return seo({
    title: `Examen ${levelNames[params.nivel]} — Simulacro manejo CABA`,
    description: `Practicá con el examen de nivel ${levelNames[params.nivel]} basado en el Manual del Conductor de CABA.`,
    path: `/examenes/${params.nivel}`,
  })
}

export default function ExamPage({ params }: { params: { nivel: string } }) {
  if (!validLevels.includes(params.nivel)) notFound()
  return <ExamEngine nivel={params.nivel} />
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/examenes/ src/app/examenes/
git commit -m "feat: sistema de exámenes con 4 niveles, timer y pantalla de resultados"
```

---

### Task 24: Página de progreso

**Files:**
- Create: `src/app/progreso/page.tsx`, `src/components/progreso/LevelDisplay.tsx`, `src/components/progreso/BadgeGrid.tsx`

- [ ] **Step 1: LevelDisplay**

Crear `src/components/progreso/LevelDisplay.tsx`:

```tsx
'use client'

import ProgressBar from '@/components/ui/ProgressBar'
import { useProgress } from '@/context/ProgressContext'
import { getLevelForXP, getXPForNextLevel, LEVELS } from '@/lib/gamification'

export default function LevelDisplay() {
  const { progress } = useProgress()
  const level = getLevelForXP(progress.xp)
  const { needed, progress: pct } = getXPForNextLevel(progress.xp)
  const nextLevel = LEVELS.find((l) => l.level === level.level + 1)

  return (
    <div className="bg-white rounded-2xl border border-vial-gray-mid p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-vial-blue flex items-center justify-center text-2xl font-bold text-white">
          {level.level}
        </div>
        <div>
          <h2 className="text-xl font-bold text-vial-asphalt-dark">{level.name}</h2>
          <p className="text-sm text-vial-asphalt-light">{progress.xp} XP total</p>
        </div>
      </div>
      {nextLevel ? (
        <ProgressBar
          value={pct}
          color="blue"
          showLabel
          label={`${progress.xp - level.xpRequired} / ${nextLevel.xpRequired - level.xpRequired} XP para ${nextLevel.name}`}
        />
      ) : (
        <p className="text-sm text-vial-green font-medium">¡Nivel máximo alcanzado!</p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: BadgeGrid**

Crear `src/components/progreso/BadgeGrid.tsx`:

```tsx
'use client'

import { useProgress } from '@/context/ProgressContext'
import { BADGES } from '@/lib/gamification'

export default function BadgeGrid() {
  const { progress } = useProgress()

  return (
    <div className="bg-white rounded-2xl border border-vial-gray-mid p-6">
      <h3 className="font-bold text-vial-asphalt-dark mb-4">Badges</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {BADGES.map((badge) => {
          const earned = progress.badges.includes(badge.id)
          return (
            <div
              key={badge.id}
              className={`text-center p-3 rounded-xl transition-all ${earned ? 'bg-vial-yellow/10' : 'bg-vial-gray-light opacity-50'}`}
            >
              <span className="text-2xl block mb-1">{badge.icon}</span>
              <span className="text-xs font-medium text-vial-asphalt-dark block">{badge.name}</span>
              {!earned && <span className="text-xs text-vial-asphalt-light">{badge.description}</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Página de progreso**

Crear `src/app/progreso/page.tsx`:

```tsx
import { generateMetadata as seo } from '@/lib/seo'
import LevelDisplay from '@/components/progreso/LevelDisplay'
import BadgeGrid from '@/components/progreso/BadgeGrid'

export const metadata = seo({
  title: 'Mi Progreso — Manejate',
  description: 'Mirá tu nivel, badges, lecciones completadas y resultados de exámenes.',
  path: '/progreso',
})

export default function ProgresoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-vial-asphalt-dark mb-8">Mi Progreso</h1>
      <div className="space-y-6">
        <LevelDisplay />
        <BadgeGrid />
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/progreso/ src/app/progreso/
git commit -m "feat: página de progreso con nivel, XP y badges"
```

---

## MILESTONE 6: Blog y SEO final

### Task 25: Blog y SEO

**Files:**
- Create: `src/app/blog/page.tsx`, primer artículo MDX
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`

- [ ] **Step 1: Página índice del blog**

Crear `src/app/blog/page.tsx`:

```tsx
import { generateMetadata as seo } from '@/lib/seo'
import Card from '@/components/ui/Card'
import Link from 'next/link'

export const metadata = seo({
  title: 'Blog — Consejos para el examen de manejo en CABA',
  description: 'Artículos con tips, requisitos y consejos para aprobar el examen teórico de conducir en CABA.',
  path: '/blog',
})

const articles = [
  {
    slug: 'como-aprobar-examen-teorico-caba',
    title: 'Cómo es el examen teórico de manejo en CABA 2026',
    excerpt: 'Todo lo que necesitás saber sobre el examen: formato, temas, duración y tips para aprobar.',
    date: '2026-04-05',
  },
  {
    slug: 'errores-comunes-examen-manejo',
    title: '10 errores más comunes en el examen de manejo',
    excerpt: 'Los errores que más se repiten y cómo evitarlos.',
    date: '2026-04-05',
  },
  {
    slug: 'requisitos-licencia-conducir-caba',
    title: 'Requisitos para sacar la licencia de conducir en CABA',
    excerpt: 'Documentos, turnos, costos y pasos para tramitar tu licencia.',
    date: '2026-04-05',
  },
]

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-vial-asphalt-dark mb-8">Blog</h1>
      <div className="space-y-4">
        {articles.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`}>
            <Card className="p-6 mb-4">
              <h2 className="text-lg font-bold text-vial-asphalt-dark mb-1">{article.title}</h2>
              <p className="text-sm text-vial-asphalt-light">{article.excerpt}</p>
              <span className="text-xs text-vial-asphalt-light mt-2 block">{article.date}</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Sitemap**

Crear `src/app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next'
import lessonsMeta from '@/../data/lessons-meta.json'
import gamesMeta from '@/../data/games-meta.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://manejate.com.ar'

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${base}/lecciones`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/juegos`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/examenes`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/progreso`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
  ]

  const lessons = lessonsMeta.map((l) => ({
    url: `${base}/lecciones/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const games = gamesMeta.map((g) => ({
    url: `${base}/juegos/${g.type}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const exams = ['facil', 'medio', 'dificil', 'simulacro'].map((n) => ({
    url: `${base}/examenes/${n}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...lessons, ...games, ...exams]
}
```

- [ ] **Step 3: Robots.txt**

Crear `src/app/robots.ts`:

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://manejate.com.ar/sitemap.xml',
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/blog/ src/app/sitemap.ts src/app/robots.ts
git commit -m "feat: blog, sitemap.xml y robots.txt para SEO"
```

---

### Task 26: Build final, deploy y verificación

- [ ] **Step 1: Correr todos los tests**

```bash
npx vitest run
```

Esperado: todos pasan.

- [ ] **Step 2: Build de producción**

```bash
npm run build
```

Esperado: build exitoso sin errores.

- [ ] **Step 3: Preguntar a Pablo sobre repo**

Preguntar: ¿Opción 1 (mismo repo de PRUEBA `proyectos-claude`, nueva carpeta) u Opción 2 (repo propio para PROYECTOS SERIOS)?

- [ ] **Step 4: Push a GitHub**

```bash
git remote add origin https://github.com/mixeliqagency-sketch/manejate.git
git push -u origin main
```

- [ ] **Step 5: Deploy a Vercel**

```bash
npx vercel --prod
```

- [ ] **Step 6: Verificar deploy**

Abrir la URL de Vercel y verificar:
- Home carga en <2 segundos
- Nav y footer responsivos
- Lecciones navegables
- Al menos un juego funciona (Quiz)
- Exámenes con timer
- Progreso se guarda en localStorage
- SEO: ver código fuente, verificar title y meta description

- [ ] **Step 7: Commit final si hubo ajustes**

```bash
git add -A
git commit -m "fix: ajustes post-deploy"
git push
```
