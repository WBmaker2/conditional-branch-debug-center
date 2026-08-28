import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// 개발은 /, 빌드·프리뷰는 GitHub Pages 하위 경로로 고정한다 (계획 §12 Task 0).
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/conditional-branch-debug-center/' : '/',
  plugins: [react()],
  preview: {
    port: 4173,
    strictPort: true,
  },
}));
