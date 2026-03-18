import { getLocalizedPath, getAlternateLang } from '@/i18n/utils';
import type { Locale } from '@/i18n/config';

export interface SEOProps {
  title: string;
  description: string;
  locale: Locale;
  /** URL base do site, sem trailing slash. Ex: 'https://gsdigitais.com' */
  siteUrl: string;
  /** Pathname atual. Ex: '/en/blog/meu-post' */
  canonicalPath: string;
  /** Caminho relativo ('/images/og.png') ou URL absoluta. */
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: Date;
  tags?: string[];
}

export interface HreflangLink {
  hreflang: string;
  href: string;
}

export interface SEOMeta {
  canonical: string;
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  ogType: 'website' | 'article';
  ogLocale: string;
  twitterCard: 'summary_large_image';
  hreflang: HreflangLink[];
}

/** BCP 47 para hreflang */
const HREFLANG_MAP: Record<Locale, string> = {
  'pt-br': 'pt-BR',
  en: 'en',
};

/** Locale para Open Graph (usa underscore) */
const OG_LOCALE_MAP: Record<Locale, string> = {
  'pt-br': 'pt_BR',
  en: 'en_US',
};

function trimTrailingSlash(url: string): string {
  return url.length > 1 ? url.replace(/\/$/, '') : url;
}

function toAbsoluteUrl(siteUrl: string, path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return trimTrailingSlash(siteUrl) + path;
}

/**
 * Gera os metadados SEO completos para uma página.
 */
export function generateMetaTags(props: SEOProps): SEOMeta {
  const { title, description, locale, siteUrl, canonicalPath, image, type = 'website' } = props;

  const base = trimTrailingSlash(siteUrl);
  const normalizedPath = trimTrailingSlash(canonicalPath) || '/';
  const canonical = base + normalizedPath;

  const ogImage = image
    ? toAbsoluteUrl(siteUrl, image)
    : `${base}/images/og-default.png`;

  const alternateLang = getAlternateLang(locale);
  const alternatePath = trimTrailingSlash(getLocalizedPath(normalizedPath, alternateLang)) || '/';
  const alternateUrl = base + alternatePath;

  const hreflang: HreflangLink[] = [
    { hreflang: HREFLANG_MAP[locale], href: canonical },
    { hreflang: HREFLANG_MAP[alternateLang], href: alternateUrl },
    // x-default aponta para a versão PT-BR (idioma padrão do site)
    {
      hreflang: 'x-default',
      href: locale === 'pt-br' ? canonical : alternateUrl,
    },
  ];

  return {
    canonical,
    ogImage,
    ogTitle: title,
    ogDescription: description,
    ogType: type === 'article' ? 'article' : 'website',
    ogLocale: OG_LOCALE_MAP[locale],
    twitterCard: 'summary_large_image',
    hreflang,
  };
}

// ──────────────────────────────────────────────────
// JSON-LD schemas
// ──────────────────────────────────────────────────

const AUTHOR = {
  '@type': 'Person',
  name: 'Gabriel Alves de Souza',
  url: 'https://gsdigitais.com',
};

/**
 * Gera JSON-LD schema Person para a homepage.
 */
export function generatePersonJsonLD(siteUrl: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gabriel Alves de Souza',
    url: siteUrl,
    jobTitle: 'Data Analyst & Developer',
    description:
      'Data analyst with experience in digital marketing and web development. Builder of data tools and web projects.',
    sameAs: [
      'https://linkedin.com/in/biel-als/',
      'https://github.com/galvza',
    ],
  });
}

/**
 * Gera JSON-LD schema BlogPosting para posts do blog.
 */
export function generateBlogPostingJsonLD(props: {
  title: string;
  description: string;
  url: string;
  datePublished: Date;
  dateModified?: Date;
  tags?: string[];
  image?: string;
}): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: props.title,
    description: props.description,
    url: props.url,
    datePublished: props.datePublished.toISOString(),
    dateModified: (props.dateModified ?? props.datePublished).toISOString(),
    keywords: props.tags?.join(', '),
    image: props.image,
    author: AUTHOR,
    publisher: AUTHOR,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': props.url,
    },
  });
}

/**
 * Gera JSON-LD schema WebPage para páginas genéricas.
 */
export function generateWebPageJsonLD(props: {
  title: string;
  description: string;
  url: string;
  locale: Locale;
}): string {
  const inLanguage: Record<Locale, string> = { 'pt-br': 'pt-BR', en: 'en' };
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: props.title,
    description: props.description,
    url: props.url,
    inLanguage: inLanguage[props.locale],
    author: AUTHOR,
  });
}
