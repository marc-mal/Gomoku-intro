import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// `base: './'` —— GitHub Pages 的项目站点挂在 `/<repo>/` 子路径下，
// 相对路径能让 `index.html` 与 `public/shots/*.jpg` 在任意仓库名下都成立。
export default defineConfig({
  base: './',
  plugins: [vue()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
