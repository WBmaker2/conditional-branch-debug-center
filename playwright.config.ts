import { defineConfig } from '@playwright/test';

// GitHub Pages와 같은 하위 경로에서 프리뷰 서버를 검증한다 (계획 §12 Task 8).
const BASE = '/conditional-branch-debug-center/';

export default defineConfig({
  testDir: 'e2e',
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: `http://127.0.0.1:4180${BASE}`,
    viewport: { width: 1280, height: 800 },
  },
  webServer: {
    command: 'npm run preview',
    url: `http://127.0.0.1:4180${BASE}`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
