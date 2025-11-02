import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'lemana-pro-quiz',
  server: {
    port: 9000,
  },
})
