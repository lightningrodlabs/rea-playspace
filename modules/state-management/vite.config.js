import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    })
  ],
  build: {
    lib: {
      entry: {
        'state-management': resolve(__dirname, 'src/index.ts'),
        'fiber': resolve(__dirname, 'src/fiber.ts'),
        'state-machine': resolve(__dirname, 'src/state-machine.ts')
      },
      name: 'state-management',
    },
  }
});