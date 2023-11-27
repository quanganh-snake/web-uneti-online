import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['/src/assets/*.{ico,jpg,jpeg,gif,svg,.png}'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      'Styles': path.resolve(__dirname, './src/Styles/')
    },
  },
})
