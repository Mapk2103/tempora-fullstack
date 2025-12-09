import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración para deployment en Vercel
// VITE_API_URL debe estar configurada en las variables de entorno
export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  },
  server: {
    port: 3500,
    open: true
  }
})



