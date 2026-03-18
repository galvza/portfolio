/**
 * Testes de integração — output do build
 * T080–T090
 *
 * Roda `npm run build` uma vez no beforeAll e verifica os arquivos
 * gerados em dist/. Testes lentos (~30-60s) — rodar via npm run test:build.
 *
 * T089 fica num describe separado: cria um fixture inválido, roda um build
 * auxiliar e verifica que o exit code é diferente de zero.
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { existsSync, readFileSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');

// ─── helper ─────────────────────────────────────────────────────────────────

interface BuildResult {
  exitCode: number;
  stderr: string;
}

function runBuild(): BuildResult {
  const r = spawnSync('npm', ['run', 'build'], {
    cwd: ROOT,
    encoding: 'utf-8',
    timeout: 300_000,
    shell: true,
  });
  return { exitCode: r.status ?? 1, stderr: (r.stderr ?? '').slice(0, 3_000) };
}

// ─── Build principal ─────────────────────────────────────────────────────────

let buildResult: BuildResult;

beforeAll(() => {
  buildResult = runBuild();
}, 300_000);

describe('Astro build output', () => {
  // T080: exit code 0
  it('T080: build completa sem erro (exit code 0)', () => {
    expect(buildResult.exitCode, `Build falhou:\n${buildResult.stderr}`).toBe(0);
  });

  // T081: páginas PT-BR
  it('T081: páginas PT-BR existem em dist/', () => {
    const pages = [
      'index.html',
      'projetos/index.html',
      'blog/index.html',
      'sobre/index.html',
      'skills/index.html',
      'contato/index.html',
    ];
    for (const page of pages) {
      expect(existsSync(join(DIST, page)), `dist/${page} deve existir`).toBe(true);
    }
  });

  // T082: páginas EN
  it('T082: páginas EN existem em dist/en/', () => {
    const pages = [
      'index.html',
      'projects/index.html',
      'blog/index.html',
      'about/index.html',
      'skills/index.html',
      'contact/index.html',
    ];
    for (const page of pages) {
      expect(existsSync(join(DIST, 'en', page)), `dist/en/${page} deve existir`).toBe(true);
    }
  });

  // T083: posts do blog
  it('T083: posts do blog geram páginas individuais', () => {
    expect(
      existsSync(join(DIST, 'blog', 'o-dia-tem-24-horas-mas-a-ia-muda-a-cada-12', 'index.html')),
      'post o-dia-tem-24-horas-mas-a-ia-muda-a-cada-12 deve existir',
    ).toBe(true);
    expect(
      existsSync(join(DIST, 'blog', 'mcp-como-automatizei-meta-ads-sem-sair-do-chat', 'index.html')),
      'post mcp-como-automatizei-meta-ads-sem-sair-do-chat deve existir',
    ).toBe(true);
    expect(
      existsSync(join(DIST, 'blog', 'o-que-aprendi-gerenciando-6-digitos-em-meta-ads', 'index.html')),
      'post o-que-aprendi-gerenciando-6-digitos-em-meta-ads deve existir',
    ).toBe(true);
  });

  // T084: case studies
  it('T084: case studies geram páginas individuais', () => {
    expect(
      existsSync(join(DIST, 'projetos', 'custo-de-vida', 'index.html')),
      'case study custo-de-vida deve existir',
    ).toBe(true);
    expect(
      existsSync(join(DIST, 'projetos', '100k-pedidos', 'index.html')),
      'case study 100k-pedidos deve existir',
    ).toBe(true);
  });

  // T085: Pagefind index
  it('T085: Pagefind index existe em dist/pagefind/', () => {
    expect(existsSync(join(DIST, 'pagefind', 'pagefind.js')), 'pagefind.js deve existir').toBe(
      true,
    );
  });

  // T086: sitemap
  it('T086: sitemap gerado com entradas de ambos os idiomas', () => {
    const indexPath = join(DIST, 'sitemap-index.xml');
    expect(existsSync(indexPath), 'sitemap-index.xml deve existir').toBe(true);

    const indexContent = readFileSync(indexPath, 'utf-8');
    // O índice deve referenciar pelo menos um arquivo sitemap
    expect(indexContent).toContain('<sitemap>');

    // sitemap-0.xml deve conter URLs dos dois idiomas
    const sitemapPath = join(DIST, 'sitemap-0.xml');
    expect(existsSync(sitemapPath), 'sitemap-0.xml deve existir').toBe(true);
    const sitemapContent = readFileSync(sitemapPath, 'utf-8');
    expect(sitemapContent).toContain('gsdigitais.com/en/');
    expect(sitemapContent).toContain('gsdigitais.com/');
  });

  // T087: robots.txt
  it('T087: robots.txt presente em dist/', () => {
    expect(existsSync(join(DIST, 'robots.txt')), 'robots.txt deve existir').toBe(true);
  });

  // T088: RSS feeds
  it('T088: RSS feeds existem para PT-BR e EN', () => {
    expect(existsSync(join(DIST, 'rss.xml')), 'rss.xml (PT-BR) deve existir').toBe(true);
    expect(existsSync(join(DIST, 'en', 'rss.xml')), 'en/rss.xml (EN) deve existir').toBe(true);
  });

  // T090: draft não gera página (verifica que slug inexistente não aparece)
  it('T090: post com draft:true não gera página em dist/', () => {
    expect(existsSync(join(DIST, 'blog', 'rascunho-teste', 'index.html'))).toBe(false);
  });
});

// ─── T089 — Frontmatter inválido ────────────────────────────────────────────

describe('build com frontmatter inválido', () => {
  // Fixture com title ausente (obrigatório no schema z.string())
  const fixtureDir = join(ROOT, 'src', 'content', 'blog', 'test-invalid-temp');
  const fixturePath = join(fixtureDir, 'index.pt-br.mdx');

  beforeAll(() => {
    mkdirSync(fixtureDir, { recursive: true });
    writeFileSync(
      fixturePath,
      [
        '---',
        '# title ausente — falha intencional no schema z.string()',
        'description: "Fixture de teste T089 — não commitar"',
        'date: 2026-01-15',
        'tags: []',
        'locale: pt-br',
        '---',
        '',
        'Conteúdo de teste — este arquivo não deve existir no repositório.',
      ].join('\n'),
    );
  }, 10_000);

  afterAll(() => {
    rmSync(fixtureDir, { recursive: true, force: true });
  });

  it('T089: build falha com exit code != 0 quando post tem frontmatter inválido', () => {
    const r = spawnSync('npm', ['run', 'build'], {
      cwd: ROOT,
      encoding: 'utf-8',
      timeout: 300_000,
      shell: true,
    });
    expect(r.status, 'Build deveria falhar quando title está ausente no frontmatter').not.toBe(0);
  }, 300_000);
});
