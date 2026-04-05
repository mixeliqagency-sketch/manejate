'use client'

// === CLIENTE DE EXAM SIMULATOR ===

import GameWrapper from '@/components/juegos/GameWrapper'
import ExamSimulator from '@/components/juegos/ExamSimulator'

export default function ExamSimulatorPageClient() {
  return (
    <GameWrapper gameType="exam-simulator" gameName="Simulacro de Examen">
      {(props) => <ExamSimulator {...props} />}
    </GameWrapper>
  )
}
