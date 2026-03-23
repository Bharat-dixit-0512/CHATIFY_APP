import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  theme: {
    extend: {
      animation: {
        // This matches the 'animate-border' class you used
        'border': 'border 4s linear infinite',
      },
      keyframes: {
        'border': {
          'to': { '--border-angle': '360deg' },
        },
      },
    },
  },
})
