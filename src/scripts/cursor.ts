import gsap from 'gsap';

/** Função de teardown da instância anterior — limpa listeners e esconde cursor. */
let teardown: (() => void) | null = null;

/**
 * Verifica se o cursor customizado deve ser inicializado.
 * Retorna false em touch devices, viewport < 1024px ou prefers-reduced-motion.
 */
function isCursorSupported(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.matchMedia('(pointer: coarse)').matches) return false;
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return false;
  if (window.innerWidth < 1024) return false;
  return true;
}

/**
 * Inicializa o cursor customizado (dot + ring) com easing GSAP.
 * Seguro para chamadas múltiplas — faz teardown da instância anterior.
 */
export function initCursor(): void {
  teardown?.();
  teardown = null;

  if (!isCursorSupported()) return;

  const dot = document.querySelector<HTMLElement>('#cursor-dot');
  const ring = document.querySelector<HTMLElement>('#cursor-ring');
  if (!dot || !ring) return;

  document.documentElement.classList.add('cursor-custom');

  let revealed = false;

  function onMouseMove(e: MouseEvent): void {
    if (!revealed) {
      revealed = true;
      gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
      gsap.to([dot, ring], { opacity: 1, duration: 0.25, ease: 'power2.out' });
    }
    gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none' });
    gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' });
  }

  const HOVER_SEL = 'a, button, [role="button"], .cursor-hover, input, textarea, select';

  function onMouseOver(e: MouseEvent): void {
    if ((e.target as Element)?.closest(HOVER_SEL)) {
      gsap.to(dot, { scale: 1.2, duration: 0.2, ease: 'power2.out' });
      gsap.to(ring, { scale: 1.5, duration: 0.2, ease: 'power2.out' });
    }
  }

  function onMouseOut(e: MouseEvent): void {
    if ((e.target as Element)?.closest(HOVER_SEL)) {
      gsap.to(dot, { scale: 1, duration: 0.2, ease: 'power2.out' });
      gsap.to(ring, { scale: 1, duration: 0.2, ease: 'power2.out' });
    }
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseover', onMouseOver);
  document.addEventListener('mouseout', onMouseOut);

  teardown = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseover', onMouseOver);
    document.removeEventListener('mouseout', onMouseOut);
    document.documentElement.classList.remove('cursor-custom');
    gsap.to([dot, ring], { opacity: 0, duration: 0.15 });
  };
}

// Único ponto de entrada: astro:page-load dispara na carga inicial E em cada
// navegação com View Transitions. Evita dupla inicialização com DOMContentLoaded.
document.addEventListener('astro:page-load', initCursor);
