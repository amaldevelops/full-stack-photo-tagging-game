import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:"https://www.amalk.au/full-stack-photo-tagging-game",
  plugins: [react()],
})
