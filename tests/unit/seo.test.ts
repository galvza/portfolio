/**
 * Testes para src/utils/seo.ts
 * T024–T027 (meta tags), T100–T105 (schemas JSON-LD e lógica SEO)
 */
import { describe, it, expect } from 'vitest';
import {
  generateMetaTags,
  generatePersonJsonLD,
  generateBlogPostingJsonLD,
  generateWebPageJsonLD,
} from '@/utils/seo';

const BASE = 'https://gsdigitais.com';

const baseProps = {
  title: 'Título de Teste',
  description: 'Descrição de teste.',
  siteUrl: BASE,
};

describe('generateMetaTags', () => {
  // T024: canonical URL é formada corretamente com siteUrl + canonicalPath
  it('T024: canonical é siteUrl + canonicalPath sem trailing slash duplo', () => {
    const meta = generateMetaTags({ ...baseProps, locale: 'pt-br', canonicalPath: '/blog/meu-post' });
    expect(meta.canonical).toBe('https://gsdigitais.com/blog/meu-post');
  });

  // T025: imagem relativa vira URL absoluta
  it('T025: image relativa é prefixada com siteUrl para gerar URL absoluta', () => {
    const meta = generateMetaTags({
      ...baseProps,
      locale: 'pt-br',
      canonicalPath: '/',
      image: '/images/og-custom.png',
    });
    expect(meta.ogImage).toBe('https://gsdigitais.com/images/og-custom.png');
  });

  // T025b: image já absoluta é mantida sem alteração
  it('T025b: image já absoluta é usada sem alteração', () => {
    const absolute = 'https://cdn.example.com/img.png';
    const meta = generateMetaTags({
      ...baseProps,
      locale: 'pt-br',
      canonicalPath: '/',
      image: absolute,
    });
    expect(meta.ogImage).toBe(absolute);
  });

  // T026: hreflang inclui entradas para PT-BR e EN
  it('T026: hreflang contém entrada para o locale atual e o alternativo', () => {
    const meta = generateMetaTags({ ...baseProps, locale: 'pt-br', canonicalPath: '/blog' });
    const hreflangValues = meta.hreflang.map((h) => h.hreflang);
    expect(hreflangValues).toContain('pt-BR');
    expect(hreflangValues).toContain('en');
  });

  // T027: ogLocale mapeia corretamente (pt-br → pt_BR, en → en_US)
  it('T027: ogLocale é pt_BR para locale pt-br', () => {
    const ptMeta = generateMetaTags({ ...baseProps, locale: 'pt-br', canonicalPath: '/' });
    expect(ptMeta.ogLocale).toBe('pt_BR');
  });

  it('T027b: ogLocale é en_US para locale en', () => {
    const enMeta = generateMetaTags({ ...baseProps, locale: 'en', canonicalPath: '/en' });
    expect(enMeta.ogLocale).toBe('en_US');
  });
});

describe('hreflang', () => {
  // T100: hreflang inclui x-default
  it('T100: hreflang inclui link x-default', () => {
    const meta = generateMetaTags({ ...baseProps, locale: 'pt-br', canonicalPath: '/' });
    const xDefault = meta.hreflang.find((h) => h.hreflang === 'x-default');
    expect(xDefault).toBeDefined();
  });

  // T101: URL alternativa é computada corretamente via getLocalizedPath
  it('T101: hreflang EN aponta para /en/projetos quando locale é pt-br e path é /projetos', () => {
    const meta = generateMetaTags({ ...baseProps, locale: 'pt-br', canonicalPath: '/projetos' });
    const enLink = meta.hreflang.find((h) => h.hreflang === 'en');
    expect(enLink?.href).toBe('https://gsdigitais.com/en/projects');
  });

  it('T101b: hreflang PT-BR aponta para /projetos quando locale é en e path é /en/projects', () => {
    const meta = generateMetaTags({ ...baseProps, locale: 'en', canonicalPath: '/en/projects' });
    const ptLink = meta.hreflang.find((h) => h.hreflang === 'pt-BR');
    expect(ptLink?.href).toBe('https://gsdigitais.com/projetos');
  });
});

describe('generatePersonJsonLD', () => {
  // T102: schema Person tem campos obrigatórios do schema.org
  it('T102: schema Person tem @type Person, name e url', () => {
    const raw = generatePersonJsonLD(BASE);
    const schema = JSON.parse(raw);
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Person');
    expect(schema.name).toBe('Gabriel Alves de Souza');
    expect(schema.url).toBe(BASE);
  });

  // T103: schema Person tem sameAs com links sociais
  it('T103: schema Person inclui sameAs com LinkedIn e GitHub', () => {
    const schema = JSON.parse(generatePersonJsonLD(BASE));
    expect(Array.isArray(schema.sameAs)).toBe(true);
    expect(schema.sameAs.some((url: string) => url.includes('linkedin'))).toBe(true);
    expect(schema.sameAs.some((url: string) => url.includes('github'))).toBe(true);
  });
});

describe('generateBlogPostingJsonLD', () => {
  const postProps = {
    title: 'Post de Teste',
    description: 'Descrição do post.',
    url: `${BASE}/blog/post-teste`,
    datePublished: new Date('2024-03-15'),
    tags: ['dados', 'python'],
  };

  // T104: schema BlogPosting tem campos obrigatórios
  it('T104: schema BlogPosting tem @type, headline, author e datePublished', () => {
    const schema = JSON.parse(generateBlogPostingJsonLD(postProps));
    expect(schema['@type']).toBe('BlogPosting');
    expect(schema.headline).toBe(postProps.title);
    expect(schema.author).toBeDefined();
    expect(schema.author.name).toBe('Gabriel Alves de Souza');
    expect(schema.datePublished).toBe(postProps.datePublished.toISOString());
  });

  // T105: schema BlogPosting tem keywords a partir de tags
  it('T105: schema BlogPosting inclui keywords das tags', () => {
    const schema = JSON.parse(generateBlogPostingJsonLD(postProps));
    expect(schema.keywords).toContain('dados');
    expect(schema.keywords).toContain('python');
  });
});

describe('generateWebPageJsonLD', () => {
  it('retorna schema WebPage com name, description, url e inLanguage', () => {
    const schema = JSON.parse(
      generateWebPageJsonLD({
        title: 'Sobre',
        description: 'Sobre Gabriel.',
        url: `${BASE}/sobre`,
        locale: 'pt-br',
      }),
    );
    expect(schema['@type']).toBe('WebPage');
    expect(schema.name).toBe('Sobre');
    expect(schema.inLanguage).toBe('pt-BR');
  });
});
