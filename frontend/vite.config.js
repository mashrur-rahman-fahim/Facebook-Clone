import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for the build
    emptyOutDir: true, // Clear the output directory before building
  },
  base: '/', // Set the base path for your app (use '/' for root)
});