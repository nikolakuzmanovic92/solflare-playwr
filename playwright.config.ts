import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  expect: { timeout: 10000 },
  retries: 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }]
  ],
  
  projects: [
    // API Tests
    {
      name: 'api',
      testMatch: '**/api/**/*.test.ts',
    },

    // Chrome Tests (headed)
    {
      name: 'chrome',
      testMatch: '**/ui/**/*.test.ts',
      use: { ...devices['Desktop Chrome'], headless: false }
    },

    // Chrome Headless
    {
      name: 'chrome-headless',
      testMatch: '**/ui/**/*.test.ts',
      use: { ...devices['Desktop Chrome'] }
    },

    // Firefox
    {
      name: 'firefox',
      testMatch: '**/ui/**/*.test.ts',
      use: { ...devices['Desktop Firefox'] }
    }
  ],

  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  workers: 10
});