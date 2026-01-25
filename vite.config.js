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
  build: {
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['gsap', 'jquery']
        }
      }
    },
    target: 'es2015',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  },
  base: '/INT3-WALTER/'
})