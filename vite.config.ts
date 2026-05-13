import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Vite 8 + React 19 + Tailwind v4 + Vitest 4
export default defineConfig({
  base: '/engagement-party/',
  plugins: [react(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'es2022',
  },
  server: {
    port: 5173,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        lines: 0,
        branches: 0,
        functions: 0,
        statements: 0,
      },
      exclude: [
        'e2e/**',
        'playwright.config.ts',
        'vite.config.ts',
        'src/main.tsx',
        'src/test/**',
        '**/*.d.ts',
        '**/*.config.*',
      ],
    },
  },
})
