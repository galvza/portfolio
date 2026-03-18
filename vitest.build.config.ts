import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

/**
 * Configuração Vitest para testes de integração (build).
 * Separada do vitest.config.ts para:
 *  - incluir apenas tests/integration/
 *  - timeout longo (builds levam 30-60s)
 *  - desabilitar paralelismo de arquivos (build compartilha dist/)
 */
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/integration/**/*.{test,spec}.{ts,js}'],

    // Build pode levar até 2 min; cada hook (beforeAll) até 5 min
    testTimeout: 120_000,
    hookTimeout: 300_000,

    // Garante que build.test.ts termina antes de seo.test.ts começar
    fileParallelism: false,
  },
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },
});
