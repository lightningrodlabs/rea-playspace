import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    })
  ],
  envDir: '../environments',
  envPrefix: 'REA_PLAYSPACE_',
  server: {
      port: 8080
  },
  build: {
    lib: {
      entry: {
        'app': resolve(__dirname, 'src/App.tsx'),
        'data': resolve(__dirname, 'src/data/index.ts')
      },
      name: 'app',
    },
    rollupOptions: {
      external: [             
        /^node:.*/,
        'react',
        'react-dom'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    }
  }
});
