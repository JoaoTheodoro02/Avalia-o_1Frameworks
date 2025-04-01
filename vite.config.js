import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify' // ✅ IMPORTANTE

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    vuetify({ autoImport: true }), // ✅ ESSENCIAL PRO CSS DO VUETIFY FUNCIONAR
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
