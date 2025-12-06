import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: Reemplaza esto con el nombre de tu repositorio
  base: '/React-JS/', 
})