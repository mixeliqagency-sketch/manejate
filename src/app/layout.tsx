import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

// Fuente Inter — cargada desde Google Fonts vía next/font (sin FOUT)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Manejate',
    default: 'Manejate — Aprendé a manejar jugando',
  },
  description:
    'Plataforma gamificada para aprender las normas de tránsito de Buenos Aires (CABA). Lecciones, juegos interactivos y exámenes de práctica.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-vial-white text-vial-asphalt font-sans">
        {/* Barra de navegación superior */}
        <Nav />

        {/* Contenido principal de cada página */}
        <main className="flex-1">
          {children}
        </main>

        {/* Pie de página */}
        <Footer />
      </body>
    </html>
  )
}
