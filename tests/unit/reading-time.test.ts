/**
 * Testes para calculateReadingTime
 * T020–T023
 */
import { describe, it, expect } from 'vitest';
import { calculateReadingTime } from '@/utils/reading-time';

/** Gera um texto com exatamente `n` palavras separadas por espaço. */
function generateWords(n: number): string {
  return Array.from({ length: n }, (_, i) => `palavra${i}`).join(' ');
}

describe('calculateReadingTime', () => {
  // T020: texto vazio ou muito curto → retorna 1 (mínimo)
  it('T020: retorna 1 para texto vazio', () => {
    expect(calculateReadingTime('')).toBe(1);
  });

  // T021: texto com menos de 200 palavras → 1 minuto
  it('T021: retorna 1 para texto com 199 palavras', () => {
    expect(calculateReadingTime(generateWords(199))).toBe(1);
  });

  // T022: exatamente 200 palavras → 1 minuto
  it('T022: retorna 1 para texto com exatamente 200 palavras', () => {
    expect(calculateReadingTime(generateWords(200))).toBe(1);
  });

  // T023: 201 palavras → 2 minutos (ceil)
  it('T023: retorna 2 para texto com 201 palavras', () => {
    expect(calculateReadingTime(generateWords(201))).toBe(2);
  });

  // Extra: 600 palavras → 3 minutos
  it('retorna 3 para texto com 600 palavras', () => {
    expect(calculateReadingTime(generateWords(600))).toBe(3);
  });

  // Extra: texto com múltiplos espaços e newlines é tratado corretamente
  it('conta palavras corretamente com espaços múltiplos e quebras de linha', () => {
    const text = 'palavra1   palavra2\npalavra3\t\tpalavra4';
    expect(calculateReadingTime(text)).toBe(1); // 4 palavras → 1 min
  });
});
