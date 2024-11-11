// remote/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote',
      filename: 'authStore.js',
      remotes: {
        host: 'http://localhost:5173/dist/assets/authStore.js',
      },
      exposes: {
        './FlagTable': './src/components/Table/FlagTable.jsx',
      },
      shared: ['react', 'react-dom', 'zustand'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3002,
  },
});
