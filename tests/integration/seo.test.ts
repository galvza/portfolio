/**
 * Testes de integração — SEO (meta tags no HTML gerado)
 * T100–T105
 *
 * Lê os arquivos HTML em dist/ (gerados por build.test.ts ou por um build
 * local) e verifica a presença e o conteúdo das meta tags, hreflang,
 * canonical e JSON-LD.
 *
 * Rodar via: npm run test:build
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');

// Garante que dist/ está populado — build.test.ts já rodou se chamado via
// npm run test:build (fileParallelism: false). Este beforeAll é um fallback
// para quando seo.test.ts é executado de forma isolada ou após T089 ter
// eventualmente limpado o dist/.
beforeAll(() => {
  if (!existsSync(join(DIST, 'index.html'))) {
    spawnSync('npm', ['run', 'build'], {
      cwd: ROOT,
      encoding: 'utf-8',
      timeout: 300_000,
      shell: true,
    });
  }
}, 300_000);

// ─── helpers ─────────────────────────────────────────────────────────────────

function readHtml(relPath: string): string {
  return readFileSync(join(DIST, relPath), 'utf-8');
}

// ─── T100 / T100b — Homepage PT-BR ────────────────────────────────────────

describe('SEO — homepage PT-BR', () => {
  it('T100: tem <title>, og:title e og:description', () => {
    const html = readHtml('index.html');

    expect(html).toContain('<title>');
    expect(html).toContain('Gabriel Alves de Souza');
    expect(html).toContain('property="og:title"');
    expect(html).toContain('name="description"');
  });

  it('T100b: og:locale é pt_BR', () => {
    const html = readHtml('index.html');
    expect(html).toContain('content="pt_BR"');
  });
});

// ─── T101 / T101b — Homepage EN ───────────────────────────────────────────

describe('SEO — homepage EN', () => {
  it('T101: og:locale é en_US', () => {
    const html = readHtml('en/index.html');
    expect(html).toContain('content="en_US"');
  });

  it('T101b: tem <title> com o nome do autor', () => {
    const html = readHtml('en/index.html');
    expect(html).toContain('<title>');
    expect(html).toContain('Gabriel Alves de Souza');
  });
});

// ─── T102 / T102b — Hreflang ─────────────────────────────────────────────

describe('SEO — hreflang', () => {
  it('T102: homepage PT-BR tem links hreflang', () => {
    const html = readHtml('index.html');
    expect(html).toContain('rel="alternate"');
    expect(html).toContain('hreflang=');
  });

  it('T102b: hreflang inclui x-default', () => {
    const html = readHtml('index.html');
    expect(html).toContain('hreflang="x-default"');
  });
});

// ─── T103 / T103b — Canonical URL ────────────────────────────────────────

describe('SEO — canonical URL', () => {
  it('T103: homepage PT-BR tem canonical apontando para https://gsdigitais.com/', () => {
    const html = readHtml('index.html');
    expect(html).toContain('rel="canonical"');
    expect(html).toContain('https://gsdigitais.com');
  });

  it('T103b: homepage EN tem canonical apontando para /en', () => {
    const html = readHtml('en/index.html');
    expect(html).toContain('rel="canonical"');
    expect(html).toContain('https://gsdigitais.com/en');
  });
});

// ─── T104 / T105 — JSON-LD ───────────────────────────────────────────────

describe('SEO — JSON-LD', () => {
  it('T104: homepage PT-BR tem JSON-LD Person', () => {
    const html = readHtml('index.html');
    expect(html).toContain('application/ld+json');
    expect(html).toContain('"@type":"Person"');
  });

  it('T105: post do blog tem JSON-LD BlogPosting', () => {
    const html = readHtml('blog/o-dia-tem-24-horas-mas-a-ia-muda-a-cada-12/index.html');
    expect(html).toContain('application/ld+json');
    expect(html).toContain('"@type":"BlogPosting"');
    expect(html).toContain('"headline"');
    expect(html).toContain('"datePublished"');
  });
});
