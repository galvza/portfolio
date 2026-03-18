/**
 * Calcula o tempo estimado de leitura de um texto.
 *
 * @param content - Conteúdo bruto (markdown, MDX ou texto plano).
 * @returns Número inteiro de minutos estimados, mínimo 1.
 *
 * @example
 * calculateReadingTime('hello world') // → 1
 * calculateReadingTime(longText400Words) // → 2
 */
export function calculateReadingTime(content: string): number {
  const WPM = 200;
  const words = content.trim().split(/\s+/).filter((w) => w.length > 0).length;
  return Math.max(1, Math.ceil(words / WPM));
}
