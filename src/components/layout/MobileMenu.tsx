'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

interface NavLink {
  href: string
  label: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: NavLink[]
  isActive: (href: string) => boolean
}

export default function MobileMenu({ isOpen, onClose, links, isActive }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay oscuro semitransparente */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel deslizante desde la derecha */}
          <motion.div
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-2xl"
          >
            {/* Cabecera del panel */}
            <div className="flex items-center justify-between border-b border-vial-gray-mid px-5 py-4">
              {/* Logo dentro del menú mobile */}
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-vial-blue">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <circle cx="9" cy="9" r="6" stroke="white" strokeWidth="2" fill="none" />
                    <path d="M9 5v4l2.5 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-lg font-bold tracking-tight text-vial-asphalt">
                  Manejate
                </span>
              </div>

              {/* Botón cerrar (X) */}
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-vial-asphalt hover:bg-vial-gray-light transition-colors"
                aria-label="Cerrar menú"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Links de navegación */}
            <nav className="flex flex-col gap-1 px-3 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={[
                    'w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 text-left',
                    isActive(link.href)
                      ? 'bg-vial-blue text-white'
                      : 'text-vial-asphalt hover:bg-vial-gray-light',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
