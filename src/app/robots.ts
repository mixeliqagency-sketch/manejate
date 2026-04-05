// === ROBOTS.TXT DINÁMICO ===
// Permite a todos los crawlers indexar el sitio.
// Next.js lo sirve automáticamente en /robots.txt

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://manejate.com.ar/sitemap.xml',
  }
}
