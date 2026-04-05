'use client'

// Placeholder para espacios publicitarios de Google AdSense.
// Solo se renderiza si la variable de entorno NEXT_PUBLIC_ADSENSE_ID está definida.
// Muestra un espacio discreto con texto "Espacio publicitario" hasta que AdSense cargue.

type AdPosition = 'header' | 'between-lessons' | 'sidebar-results'

interface AdSlotProps {
  position: AdPosition
  className?: string
}

// Altura mínima por posición para reservar espacio y evitar layout shifts
const heightByPosition: Record<AdPosition, string> = {
  header: 'min-h-[90px]',
  'between-lessons': 'min-h-[250px]',
  'sidebar-results': 'min-h-[600px]',
}

export default function AdSlot({ position, className = '' }: AdSlotProps) {
  // Si no hay ID de AdSense configurado, no renderizar nada
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID
  if (!adsenseId) return null

  return (
    <div
      className={[
        'w-full flex items-center justify-center bg-vial-gray-light border border-vial-gray-mid rounded-xl overflow-hidden',
        heightByPosition[position],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-ad-position={position}
      aria-label="Espacio publicitario"
    >
      {/* Texto sutil mientras carga el anuncio */}
      <span className="text-xs text-vial-asphalt-light select-none">
        Espacio publicitario
      </span>
    </div>
  )
}
