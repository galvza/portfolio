/**
 * Testes dos schemas Zod das Content Collections (config.ts)
 * T040–T049
 */
import { describe, it, expect } from 'vitest';
import { collections } from '@/content/config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blogSchema = (collections.blog as any).schema;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const projectSchema = (collections.projects as any).schema;

// ─── Helpers ────────────────────────────────────────────────────────────────

const validBlog = {
  title: 'Post de teste',
  description: 'Descrição de teste',
  date: new Date('2026-01-15'),
  tags: ['react', 'dados'],
  locale: 'pt-br',
  draft: false,
};

const validProject = {
  title: 'Projeto de teste',
  description: 'Descrição do projeto',
  date: new Date('2026-01-15'),
  locale: 'pt-br',
  stack: ['Python', 'React'],
  liveUrl: 'https://exemplo.com',
  image: '/images/projects/teste.png',
  imageAlt: 'Captura do projeto',
  featured: false,
  order: 1,
};

// ─── Blog schema ─────────────────────────────────────────────────────────────

describe('blog schema', () => {
  // T040: frontmatter válido é aceito
  it('T040: aceita frontmatter válido completo', () => {
    const result = blogSchema.safeParse(validBlog);
    expect(result.success).toBe(true);
  });

  // T041: campo obrigatório ausente causa erro
  it('T041: rejeita quando title está ausente', () => {
    const { title: _t, ...rest } = validBlog;
    const result = blogSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  // T042: locale inválido causa erro
  it('T042: rejeita locale fora do enum (pt-br | en)', () => {
    const result = blogSchema.safeParse({ ...validBlog, locale: 'fr' });
    expect(result.success).toBe(false);
  });

  // T043: draft tem default false
  it('T043: draft tem valor padrão false quando omitido', () => {
    const { draft: _d, ...rest } = validBlog;
    const result = blogSchema.safeParse(rest);
    expect(result.success).toBe(true);
    expect(result.data?.draft).toBe(false);
  });

  // T044: campos opcionais podem ser omitidos
  it('T044: aceita frontmatter sem campos opcionais (image, imageAlt, updatedDate)', () => {
    const result = blogSchema.safeParse(validBlog);
    expect(result.success).toBe(true);
    expect(result.data?.image).toBeUndefined();
    expect(result.data?.imageAlt).toBeUndefined();
    expect(result.data?.updatedDate).toBeUndefined();
  });

  // T045: tags deve ser array
  it('T045: rejeita quando tags não é array', () => {
    const result = blogSchema.safeParse({ ...validBlog, tags: 'react' });
    expect(result.success).toBe(false);
  });
});

// ─── Project schema ───────────────────────────────────────────────────────────

describe('projects schema', () => {
  // T046: frontmatter válido é aceito
  it('T046: aceita frontmatter válido completo', () => {
    const result = projectSchema.safeParse(validProject);
    expect(result.success).toBe(true);
  });

  // T047: liveUrl inválida causa erro
  it('T047: rejeita liveUrl que não é URL válida', () => {
    const result = projectSchema.safeParse({ ...validProject, liveUrl: 'nao-e-url' });
    expect(result.success).toBe(false);
  });

  // T048: featured tem default false
  it('T048: featured tem valor padrão false quando omitido', () => {
    const { featured: _f, ...rest } = validProject;
    const result = projectSchema.safeParse(rest);
    expect(result.success).toBe(true);
    expect(result.data?.featured).toBe(false);
  });

  // T049: image é obrigatória em projects
  it('T049: rejeita quando image está ausente (obrigatória em projects)', () => {
    const { image: _i, ...rest } = validProject;
    const result = projectSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });
});
