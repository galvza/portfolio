import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    passWithNoTests: true,
    include: ['tests/unit/**/*.{test,spec}.{ts,js}'],
    exclude: ['tests/integration/**', 'node_modules', 'dist'],
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/utils/**', 'src/i18n/**'],
      exclude: ['src/**/*.astro'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
      // astro:content é um módulo virtual do Astro — não existe fora do build.
      // Mapeamos para um stub que expõe z (Zod v3) e defineCollection passthrough.
      'astro:content': resolve(import.meta.dirname, './tests/__mocks__/astro-content.ts'),
    },
  },
});
