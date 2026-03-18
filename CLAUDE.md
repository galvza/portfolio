# CLAUDE.md

## Sobre este projeto

Site pessoal bilíngue (PT-BR/EN) de Gabriel Alves de Souza — hub profissional com projetos, case studies, blog técnico, timeline de carreira, certificações e formulário de contato. Identidade visual bold com tipografia pesada e preto/branco dramático. Deploy em gsdigitais.com.

---

## Stack

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | Astro | 5.x |
| Linguagem | TypeScript | 5.3+ |
| Estilização | Tailwind CSS | 4.x |
| Conteúdo | MDX (via @astrojs/mdx) | latest |
| Animações | GSAP + ScrollTrigger | 3.12+ |
| Busca | Pagefind | 1.x |
| Formulário | Formspree | API externa |
| Analytics | Plausible (self-hosted) | CF Workers |
| Runtime | Node.js | 20 LTS |
| Gerenciador de pacotes | npm | 10+ |
| Deploy | Cloudflare Pages | — |

---

## Comandos essenciais

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Rodar testes
npm test

# Rodar testes em modo watch
npm run test:watch

# Lint
npm run lint

# Verificação de tipos
npm run typecheck

# Indexar busca (roda automaticamente após build)
npx pagefind --site dist
```

---

## Estrutura de pastas

```
portfolio/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── common/          # Header, Footer, Nav, ThemeToggle, LangToggle
│   │   ├── home/            # Hero, ProjectPreview, BlogPreview, CTA
│   │   ├── projects/        # ProjectCard, ProjectGrid, CaseStudyLayout
│   │   ├── blog/            # PostCard, PostList, SearchBar, TagFilter, ReadingTime
│   │   ├── career/          # Timeline, TimelineItem, CertificationCard
│   │   ├── contact/         # ContactForm, FormField, FormFeedback
│   │   ├── uses/            # UsesSection, UsesItem
│   │   └── animations/      # CustomCursor, ScrollReveal, PageTransition, Parallax
│   ├── layouts/             # Layouts base (BaseLayout, BlogPostLayout, CaseStudyLayout)
│   ├── pages/               # Rotas do Astro
│   │   ├── index.astro      # Homepage PT-BR
│   │   ├── projetos/        # Listagem + case studies PT-BR
│   │   ├── blog/            # Listagem + posts PT-BR
│   │   ├── sobre.astro      # Carreira + certificações PT-BR
│   │   ├── uses.astro       # Setup e ferramentas PT-BR
│   │   ├── contato.astro    # Formulário PT-BR
│   │   └── en/              # Espelho completo em inglês
│   │       ├── index.astro
│   │       ├── projects/
│   │       ├── blog/
│   │       ├── about.astro
│   │       ├── uses.astro
│   │       └── contact.astro
│   ├── content/             # Content Collections (MDX)
│   │   ├── blog/            # Posts do blog
│   │   │   └── meu-post/
│   │   │       ├── index.pt-br.mdx
│   │   │       └── index.en.mdx
│   │   ├── projects/        # Case studies dos projetos
│   │   │   └── custo-de-vida/
│   │   │       ├── index.pt-br.mdx
│   │   │       └── index.en.mdx
│   │   └── config.ts        # Schemas das collections
│   ├── i18n/                # Internacionalização
│   │   ├── pt-br.json       # Strings PT-BR (nav, labels, bio, UI)
│   │   ├── en.json          # Strings EN
│   │   ├── utils.ts         # Helper getLang(), t(), getLocalizedPath()
│   │   └── config.ts        # Idiomas suportados, idioma padrão
│   ├── styles/              # Estilos globais
│   │   ├── global.css       # Reset, variáveis CSS, tipografia base
│   │   ├── fonts.css        # @font-face declarations
│   │   └── prose.css        # Estilos pro conteúdo MDX (code blocks, callouts)
│   ├── scripts/             # Scripts client-side
│   │   ├── cursor.ts        # Cursor customizado (desktop only)
│   │   ├── animations.ts    # Setup GSAP + ScrollTrigger global
│   │   └── theme.ts         # Dark/light mode logic
│   ├── utils/               # Utilitários puros
│   │   ├── dates.ts         # Formatação de datas por idioma
│   │   ├── reading-time.ts  # Cálculo de tempo de leitura
│   │   └── seo.ts           # Geração de meta tags
│   └── types/               # Tipos TypeScript
│       ├── i18n.ts          # Tipos das translations
│       ├── content.ts       # Tipos dos content collections
│       └── index.ts         # Re-exportações
├── public/
│   ├── fonts/               # Arquivos de fonte (Space Grotesk, Inter, JetBrains Mono)
│   ├── images/              # Imagens estáticas (foto, OG images, screenshots)
│   ├── favicon.svg          # Favicon
│   └── robots.txt           # Configuração de crawlers
├── tests/
│   ├── unit/                # Testes unitários (utils, i18n, helpers)
│   ├── integration/         # Testes de integração (build, content collections)
│   └── setup.ts             # Configuração global dos testes
├── .env.example             # Variáveis de ambiente (modelo)
├── astro.config.mjs         # Configuração do Astro
├── tailwind.config.mjs      # Configuração do Tailwind (design tokens)
├── tsconfig.json            # Configuração TypeScript
├── vitest.config.ts         # Configuração de testes
├── CLAUDE.md                # Este arquivo
├── ARCHITECTURE.md          # Documentação de arquitetura
└── README.md                # Documentação pública
```

---

## Convenções de código

### Nomenclatura

| Elemento | Padrão | Exemplo |
|----------|--------|---------|
| Componentes Astro | PascalCase | `HeroSection.astro` |
| Componentes em subpasta | PascalCase com contexto | `components/blog/PostCard.astro` |
| Layouts | PascalCase + "Layout" | `BaseLayout.astro` |
| Páginas | kebab-case | `sobre.astro`, `meu-post.astro` |
| Utilitários/scripts | camelCase | `readingTime.ts` |
| Variáveis e funções | camelCase | `getLocalizedPath()` |
| Constantes | UPPER_SNAKE_CASE | `DEFAULT_LOCALE` |
| Tipos/Interfaces | PascalCase | `BlogPost`, `TranslationKey` |
| Arquivos de tradução | kebab-case | `pt-br.json`, `en.json` |
| Arquivos MDX | kebab-case + locale | `index.pt-br.mdx`, `index.en.mdx` |
| CSS custom properties | kebab-case com prefixo | `--color-accent`, `--font-heading` |

### Estilo

- Componentes Astro: template no `<template>`, lógica no frontmatter (`---`)
- Preferir `const` sobre `let`. Nunca usar `var`
- Funções com mais de 30 linhas devem ser divididas
- Imports organizados: libs externas → internas → tipos
- Toda função utilitária exportada deve ter JSDoc
- Mensagens de erro e comentários em português
- Strings de UI sempre via sistema de i18n (nunca hardcoded)
- Classes Tailwind: usar `@apply` com moderação, preferir utility classes inline
- Breakpoints Tailwind: usar os tokens definidos, nunca media queries manuais

### Git

```
tipo(escopo): descrição curta

Tipos: feat, fix, refactor, test, docs, chore, style, perf
Escopo: home, blog, projects, career, contact, uses, i18n, a11y, seo, animations

Exemplos:
feat(blog): adicionar busca com Pagefind
feat(i18n): implementar toggle de idioma
fix(animations): corrigir parallax no Safari
style(home): ajustar hero section mobile
perf(fonts): otimizar carregamento das fontes
```

---

## Variáveis de ambiente

```env
# Formspree
FORMSPREE_ENDPOINT=https://formspree.io/f/[SEU_FORM_ID]

# Plausible Analytics (self-hosted)
PLAUSIBLE_DOMAIN=gsdigitais.com
PLAUSIBLE_SCRIPT_URL=[URL do script no CF Worker]

# Site
SITE_URL=https://gsdigitais.com
```

> **IMPORTANTE:** O Claude Code nunca deve criar valores reais pras variáveis. Só o .env.example com descrições.

---

## Design Tokens

### Tipografia

| Uso | Fonte | Peso | Fallback |
|-----|-------|------|----------|
| Headlines (h1-h3) | Space Grotesk | 700 (Bold) | system-ui, sans-serif |
| Body text | Inter | 400 (Regular), 500 (Medium) | system-ui, sans-serif |
| Code blocks | JetBrains Mono | 400 | monospace |

- Tipografia fluida com `clamp()` — escala entre mobile e desktop sem media queries
- H1: `clamp(2.5rem, 5vw + 1rem, 5rem)`
- H2: `clamp(1.75rem, 3vw + 0.75rem, 3rem)`
- H3: `clamp(1.25rem, 2vw + 0.5rem, 2rem)`
- Body: `clamp(1rem, 1vw + 0.5rem, 1.125rem)`
- Line-height body: 1.6 — line-height headlines: 1.1

### Cores

```
Light mode:
  --color-bg:        #FFFFFF
  --color-bg-alt:    #F5F5F5
  --color-text:      #0A0A0A
  --color-text-muted: #525252
  --color-border:    #E5E5E5
  --color-accent:    [a definir na Fase 5 — candidatas: electric blue #2563EB, vibrant red #DC2626, ou emerald #059669]
  --color-accent-hover: [shade mais escuro do accent]

Dark mode:
  --color-bg:        #0A0A0A
  --color-bg-alt:    #171717
  --color-text:      #FAFAFA
  --color-text-muted: #A3A3A3
  --color-border:    #262626
  --color-accent:    [mesma família do light, ajustada pra contraste]
  --color-accent-hover: [shade mais claro do accent]
```

> A cor accent exata será definida na Fase 5 (Interface) quando tivermos contexto visual. Os design tokens acima são a estrutura.

### Breakpoints

| Nome | Valor | Uso |
|------|-------|-----|
| `sm` | 640px | Celulares grandes |
| `md` | 768px | Tablets portrait |
| `lg` | 1024px | Tablets landscape / laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Wide screens |

- **Mobile-first:** estilos base são para mobile, `sm:`, `md:`, `lg:` adicionam complexidade
- **Viewport de referência mobile:** 375px (iPhone SE/13 mini)
- **Viewport de referência desktop:** 1440px

### Espaçamento

- Base unit: 4px (Tailwind padrão)
- Container max-width: 1280px (xl) com padding lateral de 1.5rem (mobile) / 2rem (desktop)
- Seções: padding vertical de 4rem (mobile) / 6rem (desktop)

---

## Regras do Claude Code

### DEVE fazer
- Rodar testes após cada mudança significativa
- Seguir a estrutura de pastas definida acima rigorosamente
- Usar o sistema de i18n pra toda string de UI (nunca hardcoded)
- Usar design tokens via CSS custom properties (nunca valores mágicos)
- Implementar mobile-first: começar pelo layout mobile, expandir com breakpoints
- Testar em viewports: 320px, 375px, 768px, 1024px, 1440px
- Respeitar `prefers-reduced-motion` em toda animação
- Respeitar `prefers-color-scheme` no dark mode
- Touch targets mínimos de 44x44px em mobile
- Otimizar imagens (WebP, lazy loading, srcset)
- Manter Lighthouse ≥ 90 em todas as categorias

### NÃO deve fazer
- Instalar dependências fora da lista de stack aprovada
- Criar arquivos fora da estrutura definida
- Hardcodar strings de UI (usar i18n)
- Usar valores de cor/tamanho fora dos design tokens
- Usar `!important` em CSS
- Usar media queries manuais (usar breakpoints do Tailwind)
- Adicionar animações que não respeitam `prefers-reduced-motion`
- Fazer parallax ou cursor customizado funcionar em mobile
- Usar `any` como tipo TypeScript sem justificativa
- Fazer deploy sem todos os testes passando

### Quando travar
Se encontrar um problema que não consegue resolver em 3 tentativas:
1. Parar
2. Descrever o problema claramente
3. Listar o que já tentou
4. Pedir orientação

---

## Dependências aprovadas

### Produção
| Pacote | Versão | Pra quê |
|--------|--------|---------|
| astro | 5.x | Framework principal |
| @astrojs/mdx | latest | Suporte a MDX pra blog e case studies |
| @astrojs/tailwind | latest | Integração Tailwind |
| @astrojs/sitemap | latest | Geração automática de sitemap |
| @astrojs/cloudflare | latest | Adapter pra deploy no CF Pages |
| tailwindcss | 4.x | Estilização utility-first |
| gsap | 3.12+ | Animações (core + ScrollTrigger) |
| pagefind | 1.x | Busca client-side no blog |
| sharp | latest | Otimização de imagens no build |

### Desenvolvimento
| Pacote | Versão | Pra quê |
|--------|--------|---------|
| typescript | 5.3+ | Tipagem |
| vitest | 2.x | Testes |
| eslint | 9.x | Lint |
| eslint-plugin-astro | latest | Lint pra arquivos .astro |
| prettier | 3.x | Formatação |
| prettier-plugin-astro | latest | Formatação de arquivos .astro |
| prettier-plugin-tailwindcss | latest | Ordenação de classes Tailwind |
| @types/node | latest | Tipos Node.js |

---

## Contexto adicional

- **Projetos existentes:** custodevida.gsdigitais.com e 100kpedidos.gsdigitais.com — ficam nos subdomínios, o portfólio linka pra eles
- **Fonte das fontes:** Space Grotesk e Inter são do Google Fonts, mas devem ser self-hosted (baixar e servir de /public/fonts/) pra performance e privacidade
- **JetBrains Mono:** self-hosted também, usado apenas em code blocks
- **GSAP licença:** grátis pra sites públicos não-comerciais. Não usar plugins pagos (MorphSVG, DrawSVG, etc.)
- **Pagefind:** roda como post-build step. O comando `npx pagefind --site dist` deve ser parte do npm run build
- **Referência de design:** Estilo Awwwards com tipografia bold, preto e branco dramático, espaço negativo generoso
- **Detalhes técnicos completos:** ver ARCHITECTURE.md
