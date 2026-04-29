import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  root: '.',
  server: {
    port: 3000,
    open: false
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
