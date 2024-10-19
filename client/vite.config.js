import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
  optimizeDeps: {
    include: ['jwt-decode'], // Ensure jwt-decode is pre-bundled for Vite
  },
  server: {
    open: true, // Automatically open the app in the browser
    port: 5173, // Custom port (adjust as needed)
  },
});