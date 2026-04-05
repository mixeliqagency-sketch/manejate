'use client'

// === CLIENTE DE FILL BLANK ===

import GameWrapper from '@/components/juegos/GameWrapper'
import FillBlank from '@/components/juegos/FillBlank'

export default function FillBlankPageClient() {
  return (
    <GameWrapper gameType="fill-blank" gameName="Completar la Oración">
      {(props) => <FillBlank {...props} />}
    </GameWrapper>
  )
}
