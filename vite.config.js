import { defineConfig } from 'vite';

export default defineConfig({
  base: '/tienda-vite/',
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
