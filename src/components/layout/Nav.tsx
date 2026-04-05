'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileMenu from './MobileMenu'

// Navegación principal del sitio
const navLinks = [
  { href: '/lecciones', label: 'Lecciones' },
  { href: '/juegos', label: 'Juegos' },
  { href: '/examenes', label: 'Exámenes' },
  { href: '/progreso', label: 'Mi Progreso' },
  { href: '/blog', label: 'Blog' },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Detecta si el link está activo según el pathname actual
  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-vial-gray-mid bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo izquierda */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            {/* Ícono cuadrado azul con señal de tránsito */}
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-vial-blue">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="6" stroke="white" strokeWidth="2" fill="none" />
                <path d="M9 5v4l2.5 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-lg font-bold tracking-tight text-vial-asphalt">
              Manejate
            </span>
          </Link>

          {/* Links de escritorio — ocultos en mobile */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-150',
                  isActive(link.href)
                    ? 'bg-vial-blue text-white'
                    : 'text-vial-asphalt hover:bg-vial-gray-light',
                ].join(' ')}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Botón hamburguesa — solo en mobile */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-vial-asphalt hover:bg-vial-gray-light transition-colors"
            aria-label="Abrir menú"
            onClick={() => setMobileOpen(true)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Menú mobile */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
        isActive={isActive}
      />
    </>
  )
}
