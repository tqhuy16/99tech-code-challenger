import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from "@svgr/rollup";
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [react(), tsconfigPaths(), svgr(),],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // includePaths: [path.resolve(__dirname, 'src')],
      }
    }
  }
});