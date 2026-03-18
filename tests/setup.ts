/**
 * Configuração global dos testes Vitest.
 * Executado antes de cada arquivo de teste.
 *
 * Fornece stubs para APIs de browser ausentes no ambiente Node.js:
 * - localStorage (in-memory map, resetado entre testes)
 * - matchMedia (retorna matches: false por padrão)
 *
 * Cada arquivo de teste pode sobrescrever estes stubs via vi.stubGlobal()
 * para cenários específicos (ex.: theme.test.ts simula dark mode).
 */
import { vi, beforeEach } from 'vitest';

// ── localStorage — implementação in-memory ───────────────────────────────────
const _store: Record<string, string> = {};

vi.stubGlobal('localStorage', {
  getItem: (key: string): string | null => _store[key] ?? null,
  setItem: (key: string, value: string): void => {
    _store[key] = String(value);
  },
  removeItem: (key: string): void => {
    delete _store[key];
  },
  clear: (): void => {
    for (const key in _store) delete _store[key];
  },
  get length(): number {
    return Object.keys(_store).length;
  },
});

// Reseta o store antes de cada teste para garantir isolamento
beforeEach(() => {
  for (const key in _store) delete _store[key];
});

// ── window.matchMedia — retorna matches: false por padrão ────────────────────
vi.stubGlobal('matchMedia', (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(() => false),
}));
