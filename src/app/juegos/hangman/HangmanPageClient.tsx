'use client'

// === CLIENTE DE HANGMAN ===

import GameWrapper from '@/components/juegos/GameWrapper'
import Hangman from '@/components/juegos/Hangman'

export default function HangmanPageClient() {
  return (
    <GameWrapper gameType="hangman" gameName="El Ahorcado Vial">
      {(props) => <Hangman {...props} />}
    </GameWrapper>
  )
}
