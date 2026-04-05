'use client'

// === BOTÓN COMPLETAR LECCIÓN ===
// Llama a useProgress().completeLesson(slug) cuando se hace clic.
// Una vez completada, cambia de apariencia (no se puede des-completar).

import { motion } from 'framer-motion'
import { useProgress } from '@/context/ProgressContext'

interface CompleteLessonButtonProps {
  slug: string
}

export default function CompleteLessonButton({ slug }: CompleteLessonButtonProps) {
  const { progress, completeLesson } = useProgress()

  const isCompleted = progress.completedLessons.includes(slug)

  return (
    <motion.button
      onClick={() => {
        if (!isCompleted) completeLesson(slug)
      }}
      whileTap={!isCompleted ? { scale: 0.97 } : {}}
      className={[
        'w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-base transition-all duration-200',
        isCompleted
          ? 'bg-vial-green text-white cursor-default'
          : 'bg-vial-blue text-white hover:bg-blue-700 cursor-pointer',
      ].join(' ')}
      disabled={isCompleted}
    >
      {isCompleted ? (
        <span className="flex items-center justify-center gap-2">
          {/* Tilde de completado */}
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Lección completada (+50 XP)
        </span>
      ) : (
        'Marcar como completada (+50 XP)'
      )}
    </motion.button>
  )
}
