'use client'

// === CLIENTE DE DRAG CLASSIFY ===

import GameWrapper from '@/components/juegos/GameWrapper'
import DragClassify from '@/components/juegos/DragClassify'

export default function DragClassifyPageClient() {
  return (
    <GameWrapper gameType="drag-classify" gameName="Clasificar Señales">
      {(props) => <DragClassify {...props} />}
    </GameWrapper>
  )
}
