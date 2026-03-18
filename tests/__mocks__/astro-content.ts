/**
 * Mock de astro:content para uso nos testes Vitest.
 * Provê `z` do Zod v3 (mesma versão usada pelo Astro) e um
 * `defineCollection` que retorna a configuração sem modificação.
 */
export { default as z } from 'astro/zod';

export function defineCollection(opts: unknown) {
  return opts;
}
