/**
 * Testes unitários de utilitários
 * T028–T032
 *
 * Cobre formatLocalizedDate de src/utils/dates.ts.
 *
 * Datas usadas: meio do mês ao meio-dia UTC para evitar
 * ambiguidades de fuso horário (evitar dia -1 no UTC-x).
 */
import { describe, it, expect } from 'vitest';
import { formatLocalizedDate } from '@/utils/dates';

// Datas fixas: 15º dia do mês às 12:00 UTC (timezone-safe)
const january = new Date('2026-01-15T12:00:00Z');
const december = new Date('2026-12-15T12:00:00Z');

describe('formatLocalizedDate', () => {
  // T028: mês de janeiro em pt-br
  it('T028: retorna nome de janeiro em pt-br', () => {
    const result = formatLocalizedDate(january, 'pt-br');
    expect(result.toLowerCase()).toContain('janeiro');
  });

  // T029: mês de janeiro em en
  it('T029: retorna nome de January em en', () => {
    const result = formatLocalizedDate(january, 'en');
    expect(result.toLowerCase()).toContain('january');
  });

  // T030: mês de dezembro em pt-br
  it('T030: retorna nome de dezembro em pt-br', () => {
    const result = formatLocalizedDate(december, 'pt-br');
    expect(result.toLowerCase()).toContain('dezembro');
  });

  // T031: mês de dezembro em en
  it('T031: retorna nome de December em en', () => {
    const result = formatLocalizedDate(december, 'en');
    expect(result.toLowerCase()).toContain('december');
  });

  // T032: resultado inclui nome do mês e ano em ambos os locales
  it('T032: resultado inclui nome do mês e ano em ambos os locales', () => {
    const ptResult = formatLocalizedDate(january, 'pt-br');
    const enResult = formatLocalizedDate(january, 'en');

    // Deve conter o ano
    expect(ptResult).toContain('2026');
    expect(enResult).toContain('2026');

    // Deve conter nome por extenso do mês (não numérico)
    // Em pt-br: "janeiro", em en: "January"
    expect(/[a-zA-ZÀ-ú]+/.test(ptResult)).toBe(true);
    expect(/[a-zA-Z]+/.test(enResult)).toBe(true);
  });
});
