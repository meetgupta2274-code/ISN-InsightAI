import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['framer-motion', 'gsap', '@gsap/react'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'map-vendor': ['leaflet', 'react-leaflet'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['gsap', '@gsap/react', 'framer-motion', 'lottie-react'],
  },
})
