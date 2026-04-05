// === UTILIDADES PARA MANEJO DE PREGUNTAS Y DATOS DEL JUEGO ===

/**
 * Filtra un array de items por lessonSlug.
 * Si no se provee lessonSlug, devuelve todos los items.
 */
export function filterByLesson<T extends { lessonSlug: string }>(
  items: T[],
  lessonSlug?: string
): T[] {
  // Si no se especifica lección, devolver todos
  if (lessonSlug === undefined) {
    return items
  }
  // Filtrar por el slug de la lección indicada
  return items.filter((item) => item.lessonSlug === lessonSlug)
}

/**
 * Mezcla un array de forma aleatoria usando el algoritmo Fisher-Yates.
 * No muta el array original: devuelve una copia mezclada.
 */
export function shuffleArray<T>(array: T[]): T[] {
  // Crear una copia para no mutar el array original
  const shuffled = [...array]

  // Algoritmo Fisher-Yates: recorrer de atrás hacia adelante
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Elegir un índice aleatorio desde 0 hasta i (inclusive)
    const j = Math.floor(Math.random() * (i + 1))
    // Intercambiar los elementos en las posiciones i y j
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

/**
 * Selecciona `count` elementos aleatorios de un array.
 * Si count supera la cantidad disponible, devuelve todos los elementos mezclados.
 */
export function pickRandom<T>(array: T[], count: number): T[] {
  // Mezclar primero para asegurar aleatoriedad
  const shuffled = shuffleArray(array)
  // Tomar como máximo la cantidad disponible
  const safeCount = Math.min(count, shuffled.length)
  return shuffled.slice(0, safeCount)
}
