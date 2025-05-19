import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  // base :'/MyResume/',
  plugins: [react(),],
})
