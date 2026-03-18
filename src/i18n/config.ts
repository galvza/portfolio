export const defaultLocale = 'pt-br' as const;
export const locales = ['pt-br', 'en'] as const;

export type Locale = (typeof locales)[number];

/**
 * Mapeamento de rotas entre idiomas.
 * Chave: rota canônica (agnóstica de idioma).
 * Valor: rota específica por locale.
 */
export const routeMap: Record<string, Record<Locale, string>> = {
  '/': { 'pt-br': '/', 'en': '/en/' },
  '/projetos': { 'pt-br': '/projetos', 'en': '/en/projects' },
  '/projetos/[slug]': { 'pt-br': '/projetos/[slug]', 'en': '/en/projects/[slug]' },
  '/blog': { 'pt-br': '/blog', 'en': '/en/blog' },
  '/blog/[slug]': { 'pt-br': '/blog/[slug]', 'en': '/en/blog/[slug]' },
  '/sobre': { 'pt-br': '/sobre', 'en': '/en/about' },
  '/skills': { 'pt-br': '/skills', 'en': '/en/skills' },
  '/contato': { 'pt-br': '/contato', 'en': '/en/contact' },
};
