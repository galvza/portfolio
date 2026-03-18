import type ptBR from '@/i18n/pt-br.json';

export type { Locale } from '@/i18n/config';

/**
 * Tipo do schema de traduções (inferido do pt-br.json como fonte da verdade).
 * O en.json deve ter exatamente as mesmas chaves.
 */
export type TranslationSchema = typeof ptBR;

/**
 * Gera todos os caminhos dot-notation que chegam a uma string leaf.
 * Exclui nós intermediários (objetos).
 *
 * @example
 * // LeafPaths<{ nav: { home: string } }> → 'nav.home'
 */
type LeafPaths<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends string
    ? Prefix extends ''
      ? K
      : `${Prefix}.${K}`
    : T[K] extends Record<string, unknown>
      ? LeafPaths<T[K], Prefix extends '' ? K : `${Prefix}.${K}`>
      : never;
}[keyof T & string];

/**
 * Todas as chaves de tradução válidas em dot-notation.
 * Use este tipo na função t() para ter autocompletar e verificação estática.
 *
 * @example
 * const key: TranslationKey = 'nav.home';      // ✅
 * const key: TranslationKey = 'nav.inexistente'; // ❌ erro TypeScript
 */
export type TranslationKey = LeafPaths<TranslationSchema>;

/**
 * Helper para garantir que os dois JSONs têm as mesmas chaves.
 * Usado internamente — ver src/i18n/utils.ts.
 */
export type TranslationDict = { [key: string]: string | TranslationDict };
