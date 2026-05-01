import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import handlebars from 'vite-plugin-handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: '.',
  publicDir: 'public',
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context: {
        siteName: 'Akademi Suit',
        phoneNumber: '0552 826 48 41',
        siteDescription: 'Akademi Suit - Premium Öğrenci Yurdu. Kız ve erkek öğrenci yurtları için güvenli, konforlu ve modern yaşam alanları.',
      },
      helpers: {
        or: (a, b) => a || b,
      },
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        yurt: resolve(__dirname, 'yurt.html'),
      },
    },
  },
  esbuild: {
    pure: ['console.log', 'console.info', 'console.debug', 'console.trace'],
  },
  server: {
    open: true,
    port: 3000,
  },
});

