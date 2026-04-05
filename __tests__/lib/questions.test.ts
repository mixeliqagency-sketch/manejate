// === TESTS PARA LAS UTILIDADES DE PREGUNTAS ===
import { describe, it, expect } from 'vitest'
import { filterByLesson, shuffleArray, pickRandom } from '@/lib/questions'

// Datos de ejemplo para los tests
const sampleItems = [
  { id: '1', lessonSlug: 'semaforos-y-luces', text: 'Item A' },
  { id: '2', lessonSlug: 'semaforos-y-luces', text: 'Item B' },
  { id: '3', lessonSlug: 'velocidades', text: 'Item C' },
  { id: '4', lessonSlug: 'estacionamiento', text: 'Item D' },
  { id: '5', lessonSlug: 'velocidades', text: 'Item E' },
]

// ─────────────────────────────────────────────
// filterByLesson
// ─────────────────────────────────────────────
describe('filterByLesson', () => {
  it('devuelve solo los items que coinciden con el lessonSlug indicado', () => {
    const result = filterByLesson(sampleItems, 'semaforos-y-luces')
    expect(result).toHaveLength(2)
    expect(result.every((item) => item.lessonSlug === 'semaforos-y-luces')).toBe(true)
  })

  it('devuelve todos los items cuando no se provee lessonSlug', () => {
    const result = filterByLesson(sampleItems)
    expect(result).toHaveLength(sampleItems.length)
  })

  it('devuelve todos los items cuando lessonSlug es undefined explícito', () => {
    const result = filterByLesson(sampleItems, undefined)
    expect(result).toHaveLength(sampleItems.length)
  })

  it('devuelve un array vacío cuando no hay items con el slug indicado', () => {
    const result = filterByLesson(sampleItems, 'slug-inexistente')
    expect(result).toHaveLength(0)
  })

  it('devuelve todos los items de una lección con múltiples entradas', () => {
    const result = filterByLesson(sampleItems, 'velocidades')
    expect(result).toHaveLength(2)
    expect(result.map((i) => i.id)).toEqual(['3', '5'])
  })

  it('devuelve un array vacío cuando el input es un array vacío', () => {
    const result = filterByLesson([], 'velocidades')
    expect(result).toHaveLength(0)
  })
})

// ─────────────────────────────────────────────
// shuffleArray
// ─────────────────────────────────────────────
describe('shuffleArray', () => {
  it('devuelve un array con la misma cantidad de elementos', () => {
    const original = [1, 2, 3, 4, 5]
    const result = shuffleArray(original)
    expect(result).toHaveLength(original.length)
  })

  it('no muta el array original', () => {
    const original = [1, 2, 3, 4, 5]
    const originalCopy = [...original]
    shuffleArray(original)
    expect(original).toEqual(originalCopy)
  })

  it('el resultado contiene los mismos elementos que el original', () => {
    const original = [10, 20, 30, 40, 50]
    const result = shuffleArray(original)
    // Ordenar ambos para comparar sin importar el orden
    expect(result.sort()).toEqual(original.sort())
  })

  it('devuelve un array vacío cuando el input es vacío', () => {
    expect(shuffleArray([])).toEqual([])
  })

  it('devuelve el mismo elemento cuando el array tiene un solo item', () => {
    expect(shuffleArray(['solo'])).toEqual(['solo'])
  })

  it('funciona con arrays de objetos', () => {
    const original = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const result = shuffleArray(original)
    expect(result).toHaveLength(3)
    // Los objetos deben ser los mismos (misma referencia)
    const resultIds = result.map((o) => o.id).sort()
    expect(resultIds).toEqual([1, 2, 3])
  })
})

// ─────────────────────────────────────────────
// pickRandom
// ─────────────────────────────────────────────
describe('pickRandom', () => {
  it('devuelve la cantidad exacta de elementos solicitada', () => {
    const result = pickRandom(sampleItems, 3)
    expect(result).toHaveLength(3)
  })

  it('devuelve todos los elementos cuando count es igual al largo del array', () => {
    const result = pickRandom(sampleItems, sampleItems.length)
    expect(result).toHaveLength(sampleItems.length)
  })

  it('limita el resultado al tamaño disponible si count supera la cantidad', () => {
    const result = pickRandom(sampleItems, 100)
    expect(result).toHaveLength(sampleItems.length)
  })

  it('devuelve un array vacío cuando count es 0', () => {
    const result = pickRandom(sampleItems, 0)
    expect(result).toHaveLength(0)
  })

  it('devuelve un array vacío cuando el input es vacío', () => {
    const result = pickRandom([], 5)
    expect(result).toHaveLength(0)
  })

  it('los elementos devueltos son un subconjunto del array original', () => {
    const original = [1, 2, 3, 4, 5]
    const result = pickRandom(original, 3)
    result.forEach((item) => {
      expect(original).toContain(item)
    })
  })

  it('no hay elementos duplicados en el resultado', () => {
    const original = [1, 2, 3, 4, 5]
    const result = pickRandom(original, 5)
    const unique = new Set(result)
    expect(unique.size).toBe(result.length)
  })
})
