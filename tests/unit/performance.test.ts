/**
 * Testes de infraestrutura de performance
 * T120–T123
 *
 * Verificam as configurações estáticas que habilitam bons scores de Lighthouse:
 * cache headers, security headers, font-display: swap e preload de fontes.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

// ─── T120 — Cache headers ────────────────────────────────────────────────────

describe('public/_headers', () => {
  // T120: cache imutável para assets estáticos
  it('T120: _headers tem Cache-Control immutable para assets estáticos', () => {
    const path = join(root, 'public/_headers');
    expect(existsSync(path), '_headers deve existir em public/').toBe(true);

    const content = readFileSync(path, 'utf-8');

    // Assets com hash de conteúdo → cache de 1 ano imutável
    expect(content).toContain('max-age=31536000');
    expect(content).toContain('immutable');

    // HTML → sempre revalidar
    expect(content).toContain('must-revalidate');
  });

  // T121: security headers obrigatórios
  it('T121: _headers tem headers de segurança (X-Frame-Options, CSP, etc.)', () => {
    const content = readFileSync(join(root, 'public/_headers'), 'utf-8');

    expect(content).toContain('X-Frame-Options');
    expect(content).toContain('X-Content-Type-Options');
    expect(content).toContain('Referrer-Policy');
    expect(content).toContain('Content-Security-Policy');
    expect(content).toContain('Permissions-Policy');
  });
});

// ─── T122 — font-display: swap ───────────────────────────────────────────────

describe('fonts.css', () => {
  // T122: todos os @font-face usam font-display: swap para evitar FOIT
  it('T122: todas as declarações @font-face usam font-display: swap', () => {
    const css = readFileSync(join(root, 'src/styles/fonts.css'), 'utf-8');

    const fontFaceCount = (css.match(/@font-face/g) ?? []).length;
    const displaySwapCount = (css.match(/font-display:\s*swap/g) ?? []).length;

    expect(fontFaceCount, 'deve ter ao menos 1 @font-face').toBeGreaterThan(0);
    expect(displaySwapCount, 'font-display: swap deve aparecer em cada @font-face').toBe(
      fontFaceCount,
    );
  });
});

// ─── T123 — Preload de fontes críticas ──────────────────────────────────────

describe('BaseLayout.astro', () => {
  // T123: preload das fontes críticas (acima da dobra) — evita FOUT no LCP
  it('T123: BaseLayout tem preload para Space Grotesk 700 e Inter 400', () => {
    const layout = readFileSync(join(root, 'src/layouts/BaseLayout.astro'), 'utf-8');

    expect(layout).toContain('rel="preload"');
    // Fonte principal dos headlines (LCP frequentemente é um h1)
    expect(layout).toContain('space-grotesk-latin-700.woff2');
    // Fonte principal do corpo de texto
    expect(layout).toContain('inter-latin-400.woff2');
    // Todos os preloads devem ser woff2 (melhor compressão)
    const preloadLinks = layout.match(/<link[^>]+rel="preload"[^>]*>/g) ?? [];
    preloadLinks.forEach((link) => {
      expect(link).toContain('type="font/woff2"');
    });
  });
});
