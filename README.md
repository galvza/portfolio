# gsdigitais.com — Portfólio de Gabriel Alves de Souza

Site pessoal bilíngue (PT-BR/EN) com projetos, blog técnico, timeline de carreira e formulário de contato.

## Stack

- **Framework:** Astro 5.x
- **Estilização:** Tailwind CSS 4.x
- **Conteúdo:** MDX
- **Animações:** GSAP + ScrollTrigger
- **Busca:** Pagefind
- **Deploy:** Cloudflare Pages

## Setup

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento (http://localhost:4321)
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

## Desenvolvimento

```bash
# Rodar testes
npm test

# Testes em modo watch
npm run test:watch

# Lint
npm run lint

# Verificação de tipos
npm run typecheck
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha os valores:

```bash
cp .env.example .env
```

## Documentação

- [CLAUDE.md](./CLAUDE.md) — Instruções para o Claude Code
- [ARCHITECTURE.md](./ARCHITECTURE.md) — Arquitetura detalhada
