// === UTILIDAD PARA GENERACIÓN DE METADATA SEO ===
import type { Metadata } from 'next'

// URL base del sitio en producción
const BASE_URL = 'https://manejate.com.ar'

// Parámetros que acepta la función
interface GenerateMetadataParams {
  title: string
  description: string
  path: string
  ogImage?: string
}

/**
 * Genera el objeto Metadata de Next.js con configuración SEO completa.
 * Incluye título, descripción, URL canónica, OpenGraph y Twitter Card.
 */
export function generateMetadata({
  title,
  description,
  path,
  ogImage,
}: GenerateMetadataParams): Metadata {
  // Construir la URL canónica completa de la página
  const canonicalUrl = `${BASE_URL}${path}`

  // Imagen de Open Graph (por defecto usa la imagen general del sitio)
  const ogImageUrl = ogImage ?? `${BASE_URL}/og-image.png`

  return {
    title,
    description,

    // URL canónica para evitar contenido duplicado
    alternates: {
      canonical: canonicalUrl,
    },

    // Configuración de Open Graph (compartir en redes sociales)
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'es_AR',
      siteName: 'Manejate',
    },

    // Configuración de Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}
