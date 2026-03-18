import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// iOS Safari: barra de endereço dinâmica causa resize events que
// quebram cálculos do ScrollTrigger. ignoreMobileResize evita isso.
ScrollTrigger.config({ ignoreMobileResize: true });

type Direction = 'up' | 'down' | 'left' | 'right';

interface RevealProps {
  direction?: Direction;
  delay?: number;
  duration?: number;
  stagger?: number;
}

function getFromVars(direction: Direction): { x?: number; y?: number } {
  const map: Record<Direction, { x?: number; y?: number }> = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };
  return map[direction];
}

function initScrollReveal(isMobile: boolean): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-scroll-reveal]');

  elements.forEach((el) => {
    let props: RevealProps = {};
    try {
      props = JSON.parse(el.dataset.scrollReveal ?? '{}');
    } catch {
      // usa defaults
    }

    const { direction = 'up', delay = 0, duration = 0.7, stagger = 0 } = props;

    if (isMobile) {
      // Mobile: fade simples, sem slide
      gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        },
      );
    } else if (stagger > 0) {
      // Desktop com stagger: anima os itens internos individualmente
      const items = el.querySelectorAll<HTMLElement>(
        ':scope > li, :scope > * > li, :scope > article, :scope > * > article',
      );
      const targets: Element[] = items.length > 0 ? Array.from(items) : Array.from(el.children);

      gsap.set(el, { opacity: 1 }); // wrapper fica visível; filhos que animam
      gsap.fromTo(
        targets,
        { opacity: 0, ...getFromVars(direction) },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        },
      );
    } else {
      // Desktop sem stagger: anima o wrapper inteiro
      gsap.fromTo(
        el,
        { opacity: 0, ...getFromVars(direction) },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        },
      );
    }
  });
}

function initTimelineItems(isMobile: boolean): void {
  const items = document.querySelectorAll<HTMLElement>('[data-animate="timeline-item"]');

  items.forEach((item, index) => {
    if (isMobile) {
      gsap.fromTo(
        item,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        },
      );
    } else {
      gsap.fromTo(
        item,
        { opacity: 0, x: -32 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: (index % 4) * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        },
      );
    }
  });
}

function initParallax(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-parallax]');

  elements.forEach((el) => {
    const speed = parseFloat(el.dataset.parallax ?? '0.3');
    const movement = speed * 80;

    gsap.fromTo(
      el,
      { y: -movement / 2 },
      {
        y: movement / 2,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  });
}

export function initAnimations(): void {
  // Respeita prefers-reduced-motion — nenhuma animação se ativo
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Limpa triggers anteriores (evita vazamentos em navegações com View Transitions)
  ScrollTrigger.getAll().forEach((t) => t.kill());

  // Marca que o JS de animação carregou — CSS usa isso pra esconder elementos
  // antes do GSAP animar. Sem essa classe, conteúdo fica sempre visível (fallback).
  document.documentElement.classList.add('js-loaded');

  const isMobile = window.innerWidth < 1024;

  initScrollReveal(isMobile);
  initTimelineItems(isMobile);

  if (!isMobile) {
    initParallax();
  }

  // Safari precisa de um frame antes do refresh para que o layout esteja pronto
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  // Timeout de segurança: se algo travar, forçar visibilidade após 3s
  setTimeout(() => {
    document.querySelectorAll<HTMLElement>('[data-scroll-reveal], [data-animate="timeline-item"]').forEach((el) => {
      if (getComputedStyle(el).opacity === '0') {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
  }, 3000);
}

let initialized = false;

function safeInit(): void {
  if (initialized) return;
  initialized = true;
  initAnimations();
}

// astro:page-load: dispara na carga inicial e em navegações com View Transitions
document.addEventListener('astro:page-load', () => {
  initialized = false; // reset pra cada navegação
  safeInit();
});

// Fallback: se astro:page-load não disparou em 1s (Safari iOS), inicializa via DOMContentLoaded/load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(safeInit, 100));
} else {
  setTimeout(safeInit, 100);
}
