'use client'

// === CLIENTE DEL MEMORY — Separado para poder exportar metadata desde page.tsx ===

import GameWrapper from '@/components/juegos/GameWrapper'
import Memory from '@/components/juegos/Memory'

export default function MemoryPageClient() {
  return (
    <GameWrapper gameType="memory" gameName="Memoria de Señales">
      {(props) => <Memory {...props} />}
    </GameWrapper>
  )
}
