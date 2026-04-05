'use client'

// === CLIENTE DE WORD SEARCH ===

import GameWrapper from '@/components/juegos/GameWrapper'
import WordSearch from '@/components/juegos/WordSearch'

export default function WordSearchPageClient() {
  return (
    <GameWrapper gameType="word-search" gameName="Sopa de Letras Vial">
      {(props) => <WordSearch {...props} />}
    </GameWrapper>
  )
}
