import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  envDir: '../environments',
  envPrefix: 'REA_PLAYSPACE_',
  server: {
      port: 8080
  },
  build: {
    rollupOptions: {
      external: [             
        /^node:.*/,
        /^tslib/,
        /^lit-html.*/
      ]
    }
  }
})
