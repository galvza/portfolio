import type { Locale } from '@/i18n/config';

export interface UsesItem {
  id: string;
  name: string;
  description: string;
  url?: string;
}

export interface UsesCategory {
  id: string;
  labelKey: string;
  items: UsesItem[];
}

const usesData: Record<Locale, UsesCategory[]> = {
  'pt-br': [
    {
      id: 'hardware',
      labelKey: 'uses.hardware',
      items: [
        {
          id: 'notebook',
          name: 'Notebook Dell Inspiron 15',
          description: 'AMD Ryzen 5, 16 GB RAM, SSD 512 GB. Máquina principal para desenvolvimento e análise de dados.',
        },
        {
          id: 'monitor',
          name: 'Monitor LG 24" Full HD',
          description: 'Monitor secundário para ampliar o espaço de trabalho. IPS, 75 Hz.',
        },
        {
          id: 'teclado',
          name: 'Teclado Mecânico Redragon',
          description: 'Switches blue — barulhento mas satisfatório. Layout ABNT2.',
        },
        {
          id: 'mouse',
          name: 'Mouse Logitech MX Master 3',
          description: 'Ergonômico, sem fio. Scroll horizontal e atalhos programáveis.',
        },
        {
          id: 'headset',
          name: 'Fone JBL Tune 510BT',
          description: 'Bluetooth, leve, bateria longa. Bom custo-benefício para calls e foco.',
        },
      ],
    },
    {
      id: 'desenvolvimento',
      labelKey: 'uses.development',
      items: [
        {
          id: 'vscode',
          name: 'VS Code',
          description: 'Editor principal. Temas: One Dark Pro ou GitHub Dark. Fonte: JetBrains Mono.',
          url: 'https://code.visualstudio.com',
        },
        {
          id: 'terminal',
          name: 'Windows Terminal + WSL2',
          description: 'Ubuntu no WSL2 para ambiente Linux nativo dentro do Windows. Git Bash como fallback.',
        },
        {
          id: 'git',
          name: 'Git + GitHub',
          description: 'Controle de versão e hospedagem de repositórios. GitHub Actions para CI/CD.',
          url: 'https://github.com',
        },
        {
          id: 'chrome-devtools',
          name: 'Chrome DevTools',
          description: 'Debug de front-end, análise de performance e rede.',
        },
        {
          id: 'tableplus',
          name: 'TablePlus',
          description: 'GUI para bancos de dados SQL. Suporta PostgreSQL, SQLite e DuckDB.',
          url: 'https://tableplus.com',
        },
      ],
    },
    {
      id: 'stack',
      labelKey: 'uses.stack',
      items: [
        {
          id: 'python',
          name: 'Python',
          description: 'Linguagem principal para análise de dados, ETL e automações. Pandas, DuckDB, Streamlit.',
        },
        {
          id: 'sql',
          name: 'SQL',
          description: 'Consultas, transformações e modelagem. Dialetos: PostgreSQL e DuckDB.',
        },
        {
          id: 'typescript',
          name: 'TypeScript',
          description: 'JavaScript com tipagem. Uso em todo projeto web — Next.js, React, Astro.',
        },
        {
          id: 'astro',
          name: 'Astro',
          description: 'Framework para sites estáticos e conteúdo. Usado neste portfolio.',
          url: 'https://astro.build',
        },
        {
          id: 'tailwind',
          name: 'Tailwind CSS',
          description: 'Utility-first CSS. Rápido de iterar, fácil de manter consistência visual.',
          url: 'https://tailwindcss.com',
        },
      ],
    },
    {
      id: 'produtividade',
      labelKey: 'uses.productivity',
      items: [
        {
          id: 'notion',
          name: 'Notion',
          description: 'Organização de projetos, notas de aprendizado e documentação pessoal.',
          url: 'https://notion.so',
        },
        {
          id: 'figma',
          name: 'Figma',
          description: 'Design e prototipagem de interfaces antes de codar. Versão gratuita resolve.',
          url: 'https://figma.com',
        },
        {
          id: 'arc',
          name: 'Arc Browser',
          description: 'Browser com espaços separados por projeto. Reduz poluição de abas.',
          url: 'https://arc.net',
        },
        {
          id: 'spotify',
          name: 'Spotify',
          description: 'Lo-fi hip hop e playlists de foco para sessões longas de desenvolvimento.',
        },
      ],
    },
  ],
  en: [
    {
      id: 'hardware',
      labelKey: 'uses.hardware',
      items: [
        {
          id: 'notebook',
          name: 'Dell Inspiron 15',
          description: 'AMD Ryzen 5, 16 GB RAM, 512 GB SSD. Main machine for development and data analysis.',
        },
        {
          id: 'monitor',
          name: 'LG 24" Full HD Monitor',
          description: 'Secondary monitor for extra screen real estate. IPS panel, 75 Hz.',
        },
        {
          id: 'keyboard',
          name: 'Redragon Mechanical Keyboard',
          description: 'Blue switches — loud but satisfying. Local layout.',
        },
        {
          id: 'mouse',
          name: 'Logitech MX Master 3',
          description: 'Ergonomic, wireless. Horizontal scroll and programmable shortcuts.',
        },
        {
          id: 'headset',
          name: 'JBL Tune 510BT',
          description: 'Bluetooth, lightweight, long battery life. Great value for calls and focus.',
        },
      ],
    },
    {
      id: 'development',
      labelKey: 'uses.development',
      items: [
        {
          id: 'vscode',
          name: 'VS Code',
          description: 'Main editor. Themes: One Dark Pro or GitHub Dark. Font: JetBrains Mono.',
          url: 'https://code.visualstudio.com',
        },
        {
          id: 'terminal',
          name: 'Windows Terminal + WSL2',
          description: 'Ubuntu on WSL2 for a native Linux environment inside Windows.',
        },
        {
          id: 'git',
          name: 'Git + GitHub',
          description: 'Version control and repository hosting. GitHub Actions for CI/CD.',
          url: 'https://github.com',
        },
        {
          id: 'chrome-devtools',
          name: 'Chrome DevTools',
          description: 'Front-end debugging, performance and network analysis.',
        },
        {
          id: 'tableplus',
          name: 'TablePlus',
          description: 'SQL database GUI. Supports PostgreSQL, SQLite, and DuckDB.',
          url: 'https://tableplus.com',
        },
      ],
    },
    {
      id: 'stack',
      labelKey: 'uses.stack',
      items: [
        {
          id: 'python',
          name: 'Python',
          description: 'Main language for data analysis, ETL, and automation. Pandas, DuckDB, Streamlit.',
        },
        {
          id: 'sql',
          name: 'SQL',
          description: 'Queries, transformations, and modeling. Dialects: PostgreSQL and DuckDB.',
        },
        {
          id: 'typescript',
          name: 'TypeScript',
          description: 'Typed JavaScript. Used across all web projects — Next.js, React, Astro.',
        },
        {
          id: 'astro',
          name: 'Astro',
          description: 'Framework for static and content-driven sites. Used for this portfolio.',
          url: 'https://astro.build',
        },
        {
          id: 'tailwind',
          name: 'Tailwind CSS',
          description: 'Utility-first CSS. Fast to iterate, easy to keep visual consistency.',
          url: 'https://tailwindcss.com',
        },
      ],
    },
    {
      id: 'productivity',
      labelKey: 'uses.productivity',
      items: [
        {
          id: 'notion',
          name: 'Notion',
          description: 'Project organization, learning notes, and personal documentation.',
          url: 'https://notion.so',
        },
        {
          id: 'figma',
          name: 'Figma',
          description: 'UI design and prototyping before coding. Free tier covers everything I need.',
          url: 'https://figma.com',
        },
        {
          id: 'arc',
          name: 'Arc Browser',
          description: 'Browser with separate spaces per project. Reduces tab pollution.',
          url: 'https://arc.net',
        },
        {
          id: 'spotify',
          name: 'Spotify',
          description: 'Lo-fi hip hop and focus playlists for long development sessions.',
        },
      ],
    },
  ],
};

/**
 * Retorna as categorias de uses para o locale especificado.
 */
export function getUses(locale: Locale): UsesCategory[] {
  return usesData[locale];
}
