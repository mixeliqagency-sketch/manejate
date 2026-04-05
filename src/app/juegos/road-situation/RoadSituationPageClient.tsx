'use client'

// === CLIENTE DE ROAD SITUATION ===

import GameWrapper from '@/components/juegos/GameWrapper'
import RoadSituation from '@/components/juegos/RoadSituation'

export default function RoadSituationPageClient() {
  return (
    <GameWrapper gameType="road-situation" gameName="Situaciones Viales">
      {(props) => <RoadSituation {...props} />}
    </GameWrapper>
  )
}
