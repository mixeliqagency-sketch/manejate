'use client'

// === CLIENTE DE CROSSWORD ===

import GameWrapper from '@/components/juegos/GameWrapper'
import Crossword from '@/components/juegos/Crossword'

export default function CrosswordPageClient() {
  return (
    <GameWrapper gameType="crossword" gameName="Crucigrama Vial">
      {(props) => <Crossword {...props} />}
    </GameWrapper>
  )
}
