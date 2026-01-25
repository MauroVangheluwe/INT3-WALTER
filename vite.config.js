import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [
    imagetools()
  ],
  server: {
    port: 5173,
    open: true
  },
  base: '/INT3-WALTER/'
})