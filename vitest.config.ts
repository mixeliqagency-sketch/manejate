import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    // Simular el entorno del navegador con jsdom
    environment: 'jsdom',
    // Archivo de setup que se ejecuta antes de cada test
    setupFiles: ['./__tests__/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      // Alias @/ apunta a src/ igual que en Next.js
      '@': path.resolve(__dirname, './src'),
    },
  },
})
