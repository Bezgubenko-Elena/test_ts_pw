import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
//  reporter: [['list'], ['html', { open: 'always' }]],
  reporter: [["allure-playwright"]],
  testDir: './tests',  // Директория, в которой находятся тесты
//  retries: 1,          // Количество повторов в случае падения теста
  workers: 2,          // Количество воркеров, которые будут использоваться для параллельных запусков
  use: {
    headless: true, // Запуск браузера в headless режиме
    viewport: { width: 1920, height: 1080 }, // Размер окна браузера
    ignoreHTTPSErrors: true, // Игнорирование ошибок сертификата HTTPS
    video: 'retain-on-failure', // Запись видео только если тест упал
    trace: 'on-first-retry', // Трассировка, если тест упал на первой попытке
  },
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json'},
        dependencies: ['setup'],
    }
    /*,
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json'},
        dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/user.json'},
        dependencies: ['setup'],
    },
    {
        name: 'Mobile Chrome',
        use: {
          ...devices['Pixel 5'],
          storageState: 'playwright/.auth/user.json'},
          dependencies: ['setup'],
      },
      {
        name: 'Mobile Safari',
        use: {
          ...devices['iPhone 12'],
          storageState: 'playwright/.auth/user.json'},
          dependencies: ['setup'],
      },*/
  ],
});