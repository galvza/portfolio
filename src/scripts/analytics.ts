/**
 * Helper para eventos customizados do Plausible Analytics.
 */

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

/**
 * Dispara um evento customizado no Plausible Analytics.
 */
export function trackEvent(name: string, props?: Record<string, string>): void {
  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    window.plausible(name, props ? { props } : undefined);
  }
}

/**
 * Inicializa rastreamento global de cliques via data attributes.
 * Elementos com data-track="event_name" disparam eventos automaticamente.
 * Props opcionais via data-track-props='{"key":"value"}'.
 */
export function initAnalytics(): void {
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-track]');
    if (!target) return;

    const event = target.getAttribute('data-track');
    const propsStr = target.getAttribute('data-track-props');
    if (!event) return;

    try {
      const props = propsStr ? (JSON.parse(propsStr) as Record<string, string>) : undefined;
      trackEvent(event, props);
    } catch {
      trackEvent(event);
    }
  });
}
