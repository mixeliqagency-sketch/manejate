'use client'

// === RACHA Y ESTADÍSTICAS ===
// Muestra la racha actual, lecciones completadas, juegos jugados y exámenes aprobados.

import { useProgress } from '@/context/ProgressContext'

export default function StreakAndStats() {
  const { progress } = useProgress()
  const { streak, completedLessons, gamesPlayed, examHistory } = progress

  // Calcular total de partidas jugadas
  const totalGamesPlayed = Object.values(gamesPlayed ?? {}).reduce(
    (acc, game) => acc + (game?.played ?? 0),
    0
  )

  // Contar exámenes aprobados
  const examsApproved = examHistory.filter(e => e.passed).length
  const totalExams = examHistory.length

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

      {/* Racha */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-center">
        <div className="text-2xl mb-1">🔥</div>
        <p className="text-2xl font-black text-orange-600">{streak.current}</p>
        <p className="text-xs text-orange-500 font-medium">
          {streak.current === 1 ? 'día de racha' : 'días de racha'}
        </p>
        {streak.lastDate && (
          <p className="text-xs text-orange-400 mt-0.5">último: {streak.lastDate}</p>
        )}
      </div>

      {/* Lecciones completadas */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
        <div className="text-2xl mb-1">📖</div>
        <p className="text-2xl font-black text-green-700">{completedLessons.length}</p>
        <p className="text-xs text-green-600 font-medium">de 12 lecciones</p>
        <p className="text-xs text-green-500 mt-0.5">completadas</p>
      </div>

      {/* Juegos jugados */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
        <div className="text-2xl mb-1">🎮</div>
        <p className="text-2xl font-black text-vial-blue">{totalGamesPlayed}</p>
        <p className="text-xs text-blue-600 font-medium">
          {totalGamesPlayed === 1 ? 'partida jugada' : 'partidas jugadas'}
        </p>
        <p className="text-xs text-blue-400 mt-0.5">en total</p>
      </div>

      {/* Exámenes aprobados */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-center">
        <div className="text-2xl mb-1">🎓</div>
        <p className="text-2xl font-black text-purple-700">{examsApproved}</p>
        <p className="text-xs text-purple-600 font-medium">
          {examsApproved === 1 ? 'examen aprobado' : 'exámenes aprobados'}
        </p>
        {totalExams > 0 && (
          <p className="text-xs text-purple-400 mt-0.5">de {totalExams} intentos</p>
        )}
      </div>

    </div>
  )
}
