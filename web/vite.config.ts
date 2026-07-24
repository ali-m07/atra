import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project Pages: /atra/ — set VITE_BASE_PATH=/atra/ in CI. Local/Go serve: /
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
      },
    },
  },
})
