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
      '/api/lohidata': {
        target: 'https://data.ssb.no',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/lohidata/, '/api/pxwebapi/v2/tables/03024/data'),
      },
    },
  },
})
