import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['/src/assets/*.{ico,jpg,jpeg,gif,svg,.png}'],
  server: {
    forceHttps: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      Styles: path.resolve(__dirname, './src/assets/Styles/'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/assets/Styles/Mixins/mixins' as *;
                        @use '@/assets/Styles/Mixins/var' as *;
                        @use '@/assets/Styles/Commons/var' as *;`,
      },
    },
    exclude: ['src/assets/Styles/**/*.scss'],
  },
})
