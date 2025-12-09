import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración para deployment en Vercel
export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 3500,
    open: true
  }
})



