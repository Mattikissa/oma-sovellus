import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/porssisahko': {
        target: 'https://api.porssisahko.net',
        changeOrigin: true,
        rewrite: () => '/v1/latest-prices.json',
      },
    },
  },
})
