import { defaultLocale, locales, routeMap } from './config';
import type { Locale } from './config';
import ptBR from './pt-br.json';
import en from './en.json';

type TranslationDict = { [key: string]: string | TranslationDict };

const translations: Record<Locale, TranslationDict> = {
  'pt-br': ptBR as TranslationDict,
  en: en as TranslationDict,
};

/**
 * Normaliza um path removendo trailing slash, exceto para a raiz "/".
 */
function normalizePath(p: string): string {
  return p.length > 1 ? p.replace(/\/$/, '') : p;
}

/**
 * Detecta o idioma pela URL.
 * Rotas com prefixo /en/ (ou exatamente /en) → inglês.
 * Qualquer outra rota → português (idioma padrão).
 *
 * @example
 * getLang(new URL('http://x.com/en/projects')) // → 'en'
 * getLang(new URL('http://x.com/projetos'))    // → 'pt-br'
 */
export function getLang(url: URL): Locale {
  const { pathname } = url;
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return 'en';
  }
  return defaultLocale;
}

/**
 * Busca uma tradução por chave em dot-notation.
 * Retorna a própria chave como fallback se a chave não existir.
 *
 * @example
 * t('nav.home', 'pt-br')        // → 'Início'
 * t('blog.readingTime', 'en')   // → '{minutes} min read'
 * t('chave.inexistente', 'en')  // → 'chave.inexistente'
 */
export function t(key: string, locale: Locale): string {
  const dict = translations[locale];
  const parts = key.split('.');
  let current: string | TranslationDict = dict;

  for (const part of parts) {
    if (typeof current !== 'object' || current === null || !(part in current)) {
      return key;
    }
    current = (current as TranslationDict)[part];
  }

  return typeof current === 'string' ? current : key;
}

/**
 * Converte um caminho de rota para o idioma de destino.
 * Suporta rotas com parâmetro dinâmico [slug].
 *
 * @example
 * getLocalizedPath('/projetos', 'en')           // → '/en/projects'
 * getLocalizedPath('/en/projects', 'pt-br')     // → '/projetos'
 * getLocalizedPath('/blog/meu-post', 'en')      // → '/en/blog/meu-post'
 * getLocalizedPath('/rota-desconhecida', 'en')  // → '/rota-desconhecida'
 */
export function getLocalizedPath(path: string, targetLocale: Locale): string {
  const normalizedPath = normalizePath(path);

  for (const routes of Object.values(routeMap)) {
    const localeRoutes = routes as Record<Locale, string>;

    for (const template of Object.values(localeRoutes)) {
      const normalizedTemplate = normalizePath(template);

      if (normalizedTemplate.includes('[slug]')) {
        const prefix = normalizedTemplate.replace('/[slug]', '');
        if (normalizedPath.startsWith(prefix + '/')) {
          const slug = normalizedPath.slice(prefix.length + 1);
          return localeRoutes[targetLocale].replace('[slug]', slug);
        }
      } else if (normalizedTemplate === normalizedPath) {
        return localeRoutes[targetLocale];
      }
    }
  }

  // Rota não mapeada — retorna sem alteração
  return path;
}

/**
 * Retorna o idioma alternativo ao fornecido.
 * 'pt-br' → 'en' | 'en' → 'pt-br'
 */
export function getAlternateLang(locale: Locale): Locale {
  const other = locales.find((l) => l !== locale);
  return other ?? defaultLocale;
}

/**
 * Formata uma data conforme o locale.
 *
 * @example
 * formatLocalizedDate(new Date('2026-03-15'), 'pt-br') // → '15 de março de 2026'
 * formatLocalizedDate(new Date('2026-03-15'), 'en')    // → 'March 15, 2026'
 */
export function formatLocalizedDate(date: Date, locale: Locale): string {
  const bcp47: Record<Locale, string> = {
    'pt-br': 'pt-BR',
    en: 'en-US',
  };
  return date.toLocaleDateString(bcp47[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
