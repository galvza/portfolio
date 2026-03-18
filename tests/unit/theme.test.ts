/**
 * Testes do sistema de dark mode (theme.ts)
 * T110–T116
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

// ─── Mock DOM environment ────────────────────────────────────────────────────

let darkClass = false;
let storedTheme: string | null = null;
let prefersDark = false;

const mockDocumentElement = {
  classList: {
    contains: (cls: string) => cls === 'dark' && darkClass,
    toggle: (cls: string, force?: boolean) => {
      if (cls === 'dark') {
        darkClass = force !== undefined ? force : !darkClass;
      }
    },
  },
};

const mockLocalStorage = {
  getItem: (key: string) => (key === 'theme' ? storedTheme : null),
  setItem: (key: string, value: string) => {
    if (key === 'theme') storedTheme = value;
  },
};

const mockMatchMedia = (query: string) => ({
  matches: query === '(prefers-color-scheme: dark)' && prefersDark,
});

vi.stubGlobal('document', { documentElement: mockDocumentElement });
vi.stubGlobal('localStorage', mockLocalStorage);
vi.stubGlobal('window', { matchMedia: mockMatchMedia });

// Importar APÓS o mock do global
const { getTheme, applyTheme, toggleTheme } = await import('@/scripts/theme');

// ─── Testes ──────────────────────────────────────────────────────────────────

describe('theme.ts', () => {
  beforeEach(() => {
    darkClass = false;
    storedTheme = null;
    prefersDark = false;
  });

  // T110 — getTheme: sem preferência → 'light'
  it('T110: getTheme retorna light quando sem preferência salva e sem prefers-color-scheme', () => {
    expect(getTheme()).toBe('light');
  });

  // T111 — getTheme: localStorage 'dark' → 'dark'
  it('T111: getTheme retorna dark quando localStorage contém "dark"', () => {
    storedTheme = 'dark';
    expect(getTheme()).toBe('dark');
  });

  // T112 — getTheme: sem localStorage mas prefers-color-scheme: dark → 'dark'
  it('T112: getTheme retorna dark quando prefers-color-scheme é dark e sem localStorage', () => {
    prefersDark = true;
    expect(getTheme()).toBe('dark');
  });

  // T113 — getTheme: localStorage tem prioridade sobre prefers-color-scheme
  it('T113: getTheme usa localStorage com prioridade sobre prefers-color-scheme', () => {
    storedTheme = 'light';
    prefersDark = true;
    expect(getTheme()).toBe('light');
  });

  // T114 — applyTheme: aplica .dark no <html> e persiste no localStorage
  it('T114: applyTheme("dark") adiciona classe .dark e salva no localStorage', () => {
    applyTheme('dark');
    expect(darkClass).toBe(true);
    expect(storedTheme).toBe('dark');
  });

  // T115 — applyTheme: remove .dark quando tema é light
  it('T115: applyTheme("light") remove classe .dark e salva no localStorage', () => {
    darkClass = true;
    applyTheme('light');
    expect(darkClass).toBe(false);
    expect(storedTheme).toBe('light');
  });

  // T116 — toggleTheme: alterna light → dark → light
  it('T116: toggleTheme alterna entre light e dark corretamente', () => {
    // Estado inicial: light
    darkClass = false;
    const first = toggleTheme();
    expect(first).toBe('dark');
    expect(darkClass).toBe(true);

    const second = toggleTheme();
    expect(second).toBe('light');
    expect(darkClass).toBe(false);
  });
});
