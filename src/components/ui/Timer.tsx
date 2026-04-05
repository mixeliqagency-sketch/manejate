'use client'

// Timer de cuenta regresiva. Muestra MM:SS.
// Pulsa en rojo cuando quedan menos de 60 segundos.

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TimerProps {
  totalSeconds: number
  onTimeUp?: () => void
  isRunning?: boolean
  className?: string
}

// Convierte segundos totales a formato MM:SS
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function Timer({
  totalSeconds,
  onTimeUp,
  isRunning = true,
  className = '',
}: TimerProps) {
  const [remaining, setRemaining] = useState(totalSeconds)
  const onTimeUpRef = useRef(onTimeUp)

  // Mantener la referencia actualizada sin reiniciar el efecto
  useEffect(() => {
    onTimeUpRef.current = onTimeUp
  }, [onTimeUp])

  // Reiniciar si cambia el total de segundos
  useEffect(() => {
    setRemaining(totalSeconds)
  }, [totalSeconds])

  useEffect(() => {
    if (!isRunning) return
    if (remaining <= 0) {
      onTimeUpRef.current?.()
      return
    }

    const timer = setTimeout(() => setRemaining((r) => r - 1), 1000)
    return () => clearTimeout(timer)
  }, [remaining, isRunning])

  // Alerta visual: rojo + pulso cuando quedan menos de 60 segundos
  const isLow = remaining < 60 && remaining > 0

  return (
    <motion.div
      className={[
        'inline-flex items-center justify-center font-mono font-bold rounded-xl px-4 py-2 text-xl select-none transition-colors duration-300',
        isLow
          ? 'bg-vial-red text-vial-white'
          : 'bg-vial-gray-light text-vial-asphalt-dark border border-vial-gray-mid',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      animate={isLow ? { scale: [1, 1.05, 1] } : { scale: 1 }}
      transition={isLow ? { repeat: Infinity, duration: 1, ease: 'easeInOut' } : {}}
    >
      {formatTime(remaining)}
    </motion.div>
  )
}
