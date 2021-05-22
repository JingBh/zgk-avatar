// noinspection JSUnusedGlobalSymbols

import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: /assets\/images\/.*/,
  plugins: [
    createVuePlugin(),
    legacy()
  ]
})
