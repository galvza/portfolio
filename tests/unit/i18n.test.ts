import { describe, it, expect } from 'vitest';
import { getLang, t, getLocalizedPath, getAlternateLang, formatLocalizedDate } from '@/i18n/utils';
import ptBR from '@/i18n/pt-br.json';
import en from '@/i18n/en.json';

// ---------------------------------------------------------------------------
// T001–T005 — getLang
// ---------------------------------------------------------------------------

describe('getLang', () => {
  it('T001: retorna pt-br para a rota raiz /', () => {
    expect(getLang(new URL('http://gsdigitais.com/'))).toBe('pt-br');
  });

  it('T002: retorna en para /en/', () => {
    expect(getLang(new URL('http://gsdigitais.com/en/'))).toBe('en');
  });

  it('T003: retorna en para sub-rotas /en/*', () => {
    expect(getLang(new URL('http://gsdigitais.com/en/projects'))).toBe('en');
    expect(getLang(new URL('http://gsdigitais.com/en/blog/my-post'))).toBe('en');
  });

  it('T004: retorna pt-br para rotas PT-BR sem prefixo', () => {
    expect(getLang(new URL('http://gsdigitais.com/blog'))).toBe('pt-br');
    expect(getLang(new URL('http://gsdigitais.com/projetos/meu-post'))).toBe('pt-br');
  });

  it('T005: retorna pt-br para /en sem trailing slash', () => {
    // /en exato (sem barra final) → EN
    expect(getLang(new URL('http://gsdigitais.com/en'))).toBe('en');
  });
});

// ---------------------------------------------------------------------------
// T006–T009 — t()
// ---------------------------------------------------------------------------

describe('t()', () => {
  it('T006: retorna tradução correta em pt-br', () => {
    expect(t('nav.home', 'pt-br')).toBe('Início');
    expect(t('nav.contact', 'pt-br')).toBe('Contato');
    expect(t('common.readMore', 'pt-br')).toBe('Ler mais');
  });

  it('T007: retorna tradução correta em en', () => {
    expect(t('nav.home', 'en')).toBe('Home');
    expect(t('nav.contact', 'en')).toBe('Contact');
    expect(t('common.readMore', 'en')).toBe('Read more');
  });

  it('T008: retorna a própria chave como fallback para chave inexistente', () => {
    expect(t('chave.inexistente', 'pt-br')).toBe('chave.inexistente');
    expect(t('nav.inexistente', 'en')).toBe('nav.inexistente');
    expect(t('completamente.invalida.profunda', 'pt-br')).toBe(
      'completamente.invalida.profunda',
    );
  });

  it('T009: funciona com dot-notation em vários níveis', () => {
    expect(t('blog.searchPlaceholder', 'pt-br')).toBe('Buscar posts...');
    expect(t('contact.success', 'pt-br')).toBe(
      'Mensagem enviada! Entrarei em contato em breve.',
    );
    expect(t('contact.messageTooShort', 'en')).toBe(
      'Message must be at least 10 characters',
    );
  });
});

// ---------------------------------------------------------------------------
// T010–T013 — getLocalizedPath
// ---------------------------------------------------------------------------

describe('getLocalizedPath', () => {
  it('T010: converte rotas PT-BR → EN', () => {
    expect(getLocalizedPath('/projetos', 'en')).toBe('/en/projects');
    expect(getLocalizedPath('/blog', 'en')).toBe('/en/blog');
    expect(getLocalizedPath('/sobre', 'en')).toBe('/en/about');
    expect(getLocalizedPath('/contato', 'en')).toBe('/en/contact');
    expect(getLocalizedPath('/skills', 'en')).toBe('/en/skills');
  });

  it('T011: converte rotas EN → PT-BR', () => {
    expect(getLocalizedPath('/en/projects', 'pt-br')).toBe('/projetos');
    expect(getLocalizedPath('/en/blog', 'pt-br')).toBe('/blog');
    expect(getLocalizedPath('/en/about', 'pt-br')).toBe('/sobre');
    expect(getLocalizedPath('/en/contact', 'pt-br')).toBe('/contato');
    expect(getLocalizedPath('/en/skills', 'pt-br')).toBe('/skills');
  });

  it('T012: converte rotas com slug', () => {
    expect(getLocalizedPath('/projetos/custo-de-vida', 'en')).toBe(
      '/en/projects/custo-de-vida',
    );
    expect(getLocalizedPath('/en/projects/custo-de-vida', 'pt-br')).toBe(
      '/projetos/custo-de-vida',
    );
    expect(getLocalizedPath('/blog/meu-post', 'en')).toBe('/en/blog/meu-post');
    expect(getLocalizedPath('/en/blog/my-post', 'pt-br')).toBe('/blog/my-post');
  });

  it('T013: retorna o caminho sem alteração para rotas desconhecidas', () => {
    expect(getLocalizedPath('/rota-desconhecida', 'en')).toBe('/rota-desconhecida');
    expect(getLocalizedPath('/qualquer/coisa/aqui', 'pt-br')).toBe('/qualquer/coisa/aqui');
  });
});

// ---------------------------------------------------------------------------
// T014 — getAlternateLang
// ---------------------------------------------------------------------------

describe('getAlternateLang', () => {
  it('T014: retorna o idioma alternativo', () => {
    expect(getAlternateLang('pt-br')).toBe('en');
    expect(getAlternateLang('en')).toBe('pt-br');
  });
});

// ---------------------------------------------------------------------------
// T015 — formatLocalizedDate
// ---------------------------------------------------------------------------

describe('formatLocalizedDate', () => {
  it('T015: formata datas conforme o locale', () => {
    // Usa UTC explícito para evitar diferença de timezone nos testes
    const date = new Date('2026-03-15T12:00:00Z');

    const ptResult = formatLocalizedDate(date, 'pt-br');
    const enResult = formatLocalizedDate(date, 'en');

    // PT-BR: deve conter o mês por extenso em português
    expect(ptResult).toMatch(/março/i);
    expect(ptResult).toMatch(/2026/);

    // EN: deve conter o mês por extenso em inglês
    expect(enResult).toMatch(/march/i);
    expect(enResult).toMatch(/2026/);
  });
});

// ---------------------------------------------------------------------------
// Invariante: pt-br.json e en.json têm as mesmas chaves
// ---------------------------------------------------------------------------

describe('Estrutura dos JSONs', () => {
  function collectKeys(obj: object, prefix = ''): string[] {
    return Object.entries(obj).flatMap(([k, v]) => {
      const fullKey = prefix ? `${prefix}.${k}` : k;
      return typeof v === 'object' && v !== null ? collectKeys(v, fullKey) : [fullKey];
    });
  }

  it('pt-br.json e en.json têm exatamente as mesmas chaves', () => {
    const ptKeys = collectKeys(ptBR).sort();
    const enKeys = collectKeys(en).sort();
    expect(ptKeys).toEqual(enKeys);
  });
});
