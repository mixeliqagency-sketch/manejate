'use client'

// === CLIENTE DE ORDER STEPS ===

import GameWrapper from '@/components/juegos/GameWrapper'
import OrderSteps from '@/components/juegos/OrderSteps'

export default function OrderStepsPageClient() {
  return (
    <GameWrapper gameType="order-steps" gameName="Ordenar los Pasos">
      {(props) => <OrderSteps {...props} />}
    </GameWrapper>
  )
}
