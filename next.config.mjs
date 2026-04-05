import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permite archivos .mdx como páginas y componentes
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

// Envuelve la config con el soporte MDX
const withMDX = createMDX({
  // Opciones adicionales de MDX si se necesitan en el futuro
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
