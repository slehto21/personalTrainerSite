import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  base: '/personalTrainerApp/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})

