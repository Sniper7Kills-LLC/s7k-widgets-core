import * as path from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({ rollupTypes: true })
  ],
  build: {
    cssCodeSplit: true,
    commonjsOptions: {
      esmExternals: ['vue']
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: "src/main.ts",
      name: 'widgets-core',
      formats: ["es", "cjs", "umd"],
      fileName: format => `widgets-core.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that should not be bundled
      // into your library
      input: {
        main: path.resolve(__dirname, "src/main.ts")
      },
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'main.css') return 'widgets-core.css';
          return assetInfo.name || 'default-filename';
        },
        exports: "named",
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})