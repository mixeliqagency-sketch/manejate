'use client'

// === WORD SEARCH — Sopa de letras simplificada ===
// Se genera una grilla de letras con 5-6 palabras ocultas horizontal y verticalmente.
// El usuario hace click en la primera y última letra de la palabra para seleccionarla.
// Cuando una palabra es encontrada, se resalta y se muestra su definición.

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pickRandom, shuffleArray } from '@/lib/questions'
import type { GameChildProps } from '@/components/juegos/GameWrapper'
import type { HangmanWord } from '@/types'
import hangmanData from '../../../data/hangman-words.json'

// Tamaño de la grilla
const GRID_SIZE = 12
// Palabras a esconder
const WORDS_COUNT = 5

// Posición en la grilla
interface Cell {
  row: number
  col: number
}

// Palabra colocada en la grilla con sus coordenadas
interface PlacedWord {
  word: string
  hint: string
  cells: Cell[]
  found: boolean
}

// Genera la grilla con palabras ocultas
function generateGrid(words: HangmanWord[]): { grid: string[][], placed: PlacedWord[] } {
  // Inicializar grilla con puntos
  const grid: string[][] = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill('.')
  )
  const placed: PlacedWord[] = []

  // Intentar colocar cada palabra
  for (const wordItem of words) {
    const word = wordItem.word.replace(/\s/g, '').toUpperCase()
    // Solo palabras que quepan en la grilla
    if (word.length > GRID_SIZE) continue

    let success = false
    // Intentar hasta 30 veces con orientaciones al azar
    for (let attempt = 0; attempt < 30 && !success; attempt++) {
      // Solo horizontal y vertical para simplificar
      const horizontal = Math.random() > 0.5
      let row: number, col: number

      if (horizontal) {
        row = Math.floor(Math.random() * GRID_SIZE)
        col = Math.floor(Math.random() * (GRID_SIZE - word.length + 1))
      } else {
        row = Math.floor(Math.random() * (GRID_SIZE - word.length + 1))
        col = Math.floor(Math.random() * GRID_SIZE)
      }

      // Verificar que no haya conflictos
      const cells: Cell[] = []
      let conflict = false
      for (let i = 0; i < word.length; i++) {
        const r = horizontal ? row : row + i
        const c = horizontal ? col + i : col
        if (grid[r][c] !== '.' && grid[r][c] !== word[i]) {
          conflict = true
          break
        }
        cells.push({ row: r, col: c })
      }

      if (!conflict) {
        // Colocar la palabra
        cells.forEach((cell, i) => {
          grid[cell.row][cell.col] = word[i]
        })
        placed.push({ word, hint: wordItem.hint, cells, found: false })
        success = true
      }
    }
  }

  // Rellenar celdas vacías con letras aleatorias
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === '.') {
        grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)]
      }
    }
  }

  return { grid, placed }
}

// Calcula si una selección (firstCell, lastCell) coincide con una palabra colocada
function findMatchingWord(
  first: Cell,
  last: Cell,
  placed: PlacedWord[]
): PlacedWord | null {
  for (const pw of placed) {
    if (pw.found) continue
    const firstMatch = pw.cells.some(c => c.row === first.row && c.col === first.col)
    const lastMatch = pw.cells.some(c => c.row === last.row && c.col === last.col)
    if (firstMatch && lastMatch && pw.cells.length > 1) {
      // Verificar que son el primer y último elemento del array
      const fIdx = pw.cells.findIndex(c => c.row === first.row && c.col === first.col)
      const lIdx = pw.cells.findIndex(c => c.row === last.row && c.col === last.col)
      if (
        (fIdx === 0 && lIdx === pw.cells.length - 1) ||
        (fIdx === pw.cells.length - 1 && lIdx === 0)
      ) {
        return pw
      }
    }
  }
  return null
}

// Colores para resaltar palabras encontradas
const FOUND_COLORS = [
  'bg-vial-green/20 text-vial-green font-bold',
  'bg-vial-blue/20 text-vial-blue font-bold',
  'bg-vial-yellow/20 text-vial-yellow-dark font-bold',
  'bg-purple-100 text-purple-700 font-bold',
  'bg-orange-100 text-orange-700 font-bold',
]

export default function WordSearch({ lessonFilter, onGameComplete }: GameChildProps) {
  // Seleccionar palabras al montar
  const selectedWords = useMemo<HangmanWord[]>(() => {
    const all = hangmanData as HangmanWord[]
    // No filtrar por lección para asegurarse de tener suficientes palabras cortas
    const short = all.filter(w => w.word.replace(/\s/g, '').length <= GRID_SIZE)
    return pickRandom(short, WORDS_COUNT)
  }, [lessonFilter])

  // Generar grilla al montar
  const { grid, placed: initialPlaced } = useMemo(
    () => generateGrid(shuffleArray(selectedWords)),
    [selectedWords]
  )

  const [placedWords, setPlacedWords] = useState<PlacedWord[]>(initialPlaced)
  // Primer click del usuario (primera celda de la selección)
  const [firstCell, setFirstCell] = useState<Cell | null>(null)
  // Flash de error
  const [errorFlash, setErrorFlash] = useState(false)
  // Mensaje de la última palabra encontrada
  const [lastFound, setLastFound] = useState<string | null>(null)

  // Verificar si la celda está en alguna palabra encontrada (y retornar su índice)
  function getCellFoundIndex(row: number, col: number): number {
    return placedWords.findIndex(
      pw => pw.found && pw.cells.some(c => c.row === row && c.col === col)
    )
  }

  function isFirstSelected(row: number, col: number): boolean {
    return firstCell !== null && firstCell.row === row && firstCell.col === col
  }

  function handleCellClick(row: number, col: number) {
    const cell: Cell = { row, col }

    if (!firstCell) {
      // Primera celda seleccionada
      setFirstCell(cell)
      return
    }

    // Segunda celda: verificar si forma una palabra
    if (firstCell.row === row && firstCell.col === col) {
      // Click en la misma celda → deseleccionar
      setFirstCell(null)
      return
    }

    const match = findMatchingWord(firstCell, cell, placedWords)
    if (match) {
      // ¡Encontrada!
      const wordIndex = placedWords.findIndex(pw => pw.word === match.word)
      setPlacedWords(prev => prev.map((pw, i) => i === wordIndex ? { ...pw, found: true } : pw))
      setLastFound(match.word)
      setFirstCell(null)

      // Verificar si terminó
      const newFound = placedWords.filter(pw => pw.found || pw.word === match.word).length
      if (newFound === placedWords.length) {
        const score = 100
        setTimeout(() => onGameComplete(score, 25), 800)
      }
    } else {
      // No es un par válido → flash error y resetear
      setErrorFlash(true)
      setTimeout(() => {
        setErrorFlash(false)
        setFirstCell(null)
      }, 600)
    }
  }

  const totalFound = placedWords.filter(pw => pw.found).length

  return (
    <div className="flex flex-col gap-5">
      {/* Instrucción */}
      <div className="rounded-xl border border-vial-blue/20 bg-vial-blue/5 p-4">
        <p className="text-sm font-semibold text-vial-blue">
          Encontrá las {placedWords.length} palabras en la sopa de letras
        </p>
        <p className="mt-1 text-xs text-vial-asphalt-light">
          Hacé click en la primera letra de la palabra y luego en la última (horizontal o vertical).
        </p>
      </div>

      {/* Progreso */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-vial-asphalt-light">
          Encontradas: <strong className="text-vial-asphalt-dark">{totalFound}/{placedWords.length}</strong>
        </span>
        <AnimatePresence>
          {lastFound && (
            <motion.span
              key={lastFound}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-vial-green font-semibold text-xs"
            >
              ¡{lastFound} encontrada!
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Layout principal: grilla + lista de palabras */}
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
        {/* Grilla */}
        <div className={[
          'overflow-x-auto rounded-2xl border border-vial-gray-mid bg-white p-3 shadow-sm transition-all duration-200',
          errorFlash ? 'ring-2 ring-vial-red/40' : '',
        ].join(' ')}>
          <div
            className="grid gap-0.5"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
          >
            {grid.map((row, rIdx) =>
              row.map((letter, cIdx) => {
                const foundIdx = getCellFoundIndex(rIdx, cIdx)
                const isSelected = isFirstSelected(rIdx, cIdx)
                return (
                  <button
                    key={`${rIdx}-${cIdx}`}
                    type="button"
                    onClick={() => handleCellClick(rIdx, cIdx)}
                    aria-label={`Celda ${letter}`}
                    className={[
                      'flex h-7 w-7 items-center justify-center rounded text-xs font-mono font-bold transition-all duration-150',
                      foundIdx >= 0
                        ? FOUND_COLORS[foundIdx % FOUND_COLORS.length]
                        : isSelected
                        ? 'bg-vial-blue text-white ring-2 ring-vial-blue/40'
                        : 'text-vial-asphalt hover:bg-vial-gray-light cursor-pointer',
                    ].join(' ')}
                  >
                    {letter}
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Lista de palabras a encontrar */}
        <div className="flex flex-col gap-2 lg:w-64 shrink-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-vial-asphalt-light">
            Palabras a encontrar
          </p>
          {placedWords.map((pw, idx) => (
            <div
              key={pw.word}
              className={[
                'rounded-xl border px-3 py-2.5 text-sm transition-all duration-200',
                pw.found
                  ? 'border-vial-green/30 bg-vial-green/5'
                  : 'border-vial-gray-mid bg-white',
              ].join(' ')}
            >
              <div className="flex items-center gap-2">
                {pw.found ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
                    <path d="M2.5 7l3 3 6-6" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-vial-gray-mid text-xs text-vial-asphalt-light">
                    {idx + 1}
                  </span>
                )}
                <span className={[
                  'font-semibold',
                  pw.found ? 'text-vial-green line-through' : 'text-vial-asphalt-dark',
                ].join(' ')}>
                  {pw.found ? pw.word : '?????'}
                </span>
              </div>
              {pw.found && (
                <p className="mt-1 text-xs text-vial-asphalt-light leading-snug pl-6">
                  {pw.hint}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Instrucción de selección activa */}
      <AnimatePresence>
        {firstCell && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-lg bg-vial-blue/10 px-4 py-2 text-center text-sm text-vial-blue"
          >
            Primera letra seleccionada — ahora hacé click en la última letra de la palabra
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
