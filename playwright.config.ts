import { defineConfig, devices } from '@playwright/test';

const PORT = 4322;

/**
 * E2E against the production build (`astro build` + `astro preview`).
 * Uses the system Microsoft Edge (channel "msedge") so no browser download is required;
 * set PW_CHANNEL=chromium to use Playwright's bundled Chromium instead (`npx playwright install chromium`).
 */
export default defineConfig({
  testDir: 'tests/e2e',
  outputDir: 'test-results/artifacts',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel: process.env.PW_CHANNEL === 'chromium' ? undefined : 'msedge',
    locale: 'es-AR',
  },
  webServer: {
    command: `npx astro preview --port ${PORT}`,
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Edge'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'], channel: process.env.PW_CHANNEL === 'chromium' ? undefined : 'msedge' } },
  ],
});
