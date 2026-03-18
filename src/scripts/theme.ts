/** Temas disponíveis */
export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

/**
 * Detecta o tema atual.
 * Ordem de prioridade: localStorage → prefers-color-scheme → 'light'
 */
export function getTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark';
  } catch {
    return 'dark';
  }
}

/**
 * Aplica o tema ao elemento <html> e persiste no localStorage.
 */
export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage indisponível (navegação privada, etc.)
  }
}

/**
 * Alterna entre dark e light. Retorna o novo tema aplicado.
 */
export function toggleTheme(): Theme {
  const isDark = document.documentElement.classList.contains('dark');
  const next: Theme = isDark ? 'light' : 'dark';
  applyTheme(next);
  return next;
}

/**
 * Configura um listener para mudanças no prefers-color-scheme do sistema.
 * Se não houver preferência salva no localStorage, o tema acompanha o sistema.
 * O callback opcional é chamado após cada mudança (ex.: para sincronizar a UI).
 * Chamar uma vez na inicialização do cliente.
 */
export function setupSystemThemeListener(onThemeChange?: () => void): void {
  try {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.addEventListener('change', (e) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return; // preferência manual tem prioridade
      } catch {
        // localStorage indisponível — aplica diretamente
      }
      applyTheme(e.matches ? 'dark' : 'light');
      onThemeChange?.();
    });
  } catch {
    // matchMedia indisponível (SSR, ambientes antigos) — ignorar
  }
}
