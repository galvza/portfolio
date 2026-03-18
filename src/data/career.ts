import type { Locale } from '@/i18n/config';

export interface TimelineEntry {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  achievements: string[];
}

export interface Certification {
  id: string;
  name: string;
  platform: string;
  year: string;
  category: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

const timeline: Record<Locale, TimelineEntry[]> = {
  'pt-br': [
    {
      id: 'aux-admin',
      period: 'Jan/2019 – Fev/2022',
      role: 'Auxiliar Administrativo',
      company: 'Alpes',
      description:
        'Primeiro contato com o mundo corporativo. Gestão de documentos, atendimento, organização de processos internos. Aqui descobri que gostava de organizar dados e otimizar fluxos.',
      achievements: [],
    },
    {
      id: 'gerente-comercial',
      period: 'Fev/2022 – Ago/2025',
      role: 'Gerente Comercial',
      company: 'Alpes',
      description:
        'Salto pra gestão comercial e marketing digital. Implementei CRM via WhatsApp, gerenciei tráfego pago com ROI de 21x, construí dashboards pra acompanhar métricas e desenvolvi sites com React e WordPress. Foi aqui que aprendi que dados e marketing são inseparáveis.',
      achievements: [],
    },
    {
      id: 'media-buyer',
      period: 'Out/2025 – Mar/2026',
      role: 'Media Buyer & Performance Analyst',
      company: 'Biosanté',
      description:
        'Operação de anúncios no Meta Ads em escala. Automatizei processos com IA e aprofundei o entendimento de funis de conversão e análise de performance.',
      achievements: [],
    },
  ],
  en: [
    {
      id: 'aux-admin',
      period: 'Jan/2019 – Feb/2022',
      role: 'Administrative Assistant',
      company: 'Alpes',
      description:
        'First contact with the corporate world. Document management, customer service, internal process organization. This is where I discovered I enjoyed organizing data and optimizing workflows.',
      achievements: [],
    },
    {
      id: 'gerente-comercial',
      period: 'Feb/2022 – Aug/2025',
      role: 'Commercial Manager',
      company: 'Alpes',
      description:
        'Leap to commercial management and digital marketing. Implemented WhatsApp-based CRM, managed paid traffic with 21x ROI, built dashboards to track metrics, and developed websites with React and WordPress. This is where I learned that data and marketing are inseparable.',
      achievements: [],
    },
    {
      id: 'media-buyer',
      period: 'Oct/2025 – Mar/2026',
      role: 'Media Buyer & Performance Analyst',
      company: 'Biosanté',
      description:
        'Meta Ads operations at scale. Automated processes with AI and deepened understanding of conversion funnels and performance analysis.',
      achievements: [],
    },
  ],
};

const certifications: Record<Locale, Certification[]> = {
  'pt-br': [
    // Dados & BI
    { id: 'powerbi-analise', name: 'Análise de Dados no Power BI', platform: 'Fundação Bradesco', year: 'Ago/2025', category: 'about.certDataBI' },
    { id: 'powerbi-visualizando', name: 'Visualizando Dados no Power BI', platform: 'Fundação Bradesco', year: 'Ago/2025', category: 'about.certDataBI' },
    { id: 'powerbi-modelando', name: 'Modelando Dados no Power BI', platform: 'Fundação Bradesco', year: 'Ago/2025', category: 'about.certDataBI' },
    { id: 'powerbi-preparando', name: 'Preparando Dados para Análise - Microsoft Power BI', platform: 'Fundação Bradesco', year: 'Ago/2025', category: 'about.certDataBI' },
    { id: 'powerbi-intro', name: 'Introdução à Análise de Dados - Microsoft Power BI', platform: 'Fundação Bradesco', year: 'Ago/2025', category: 'about.certDataBI' },
    // Python
    { id: 'python-string', name: 'String em Python: extraindo informações de uma URL', platform: 'Alura', year: 'Mai/2022', category: 'about.certPython' },
    { id: 'python-oo-avancado', name: 'Python 3: avançando na orientação a objetos', platform: 'Alura', year: 'Mai/2022', category: 'about.certPython' },
    { id: 'python-oo-intro', name: 'Python 3: introdução a Orientação a objetos', platform: 'Alura', year: 'Mai/2022', category: 'about.certPython' },
    { id: 'python-pt2', name: 'Python 3 parte 2: avançando na linguagem', platform: 'Alura', year: 'Abr/2022', category: 'about.certPython' },
    { id: 'python-pt1', name: 'Python 3 parte 1: introdução à nova versão da linguagem', platform: 'Alura', year: 'Abr/2022', category: 'about.certPython' },
    // Frontend & Web
    { id: 'react-ts', name: 'React: migrando para TypeScript', platform: 'Alura', year: 'Mar/2023', category: 'about.certFrontend' },
    { id: 'ts-pt1', name: 'TypeScript parte 1: evoluindo seu JavaScript', platform: 'Alura', year: 'Mar/2023', category: 'about.certFrontend' },
    { id: 'ts-pt2', name: 'TypeScript parte 2: avançando na linguagem', platform: 'Alura', year: 'Mar/2023', category: 'about.certFrontend' },
    { id: 'react-js', name: 'React: desenvolvendo com JavaScript', platform: 'Alura', year: 'Fev/2023', category: 'about.certFrontend' },
    { id: 'javascript', name: 'JavaScript', platform: 'Alura', year: 'Jan/2023', category: 'about.certFrontend' },
    { id: 'sass', name: 'SASS: CSS sintaticamente espetacular', platform: 'Alura', year: 'Jan/2023', category: 'about.certFrontend' },
  ],
  en: [
    // Data & BI
    { id: 'powerbi-analise', name: 'Data Analysis in Power BI', platform: 'Fundação Bradesco', year: 'Aug/2025', category: 'about.certDataBI' },
    { id: 'powerbi-visualizando', name: 'Data Visualization in Power BI', platform: 'Fundação Bradesco', year: 'Aug/2025', category: 'about.certDataBI' },
    { id: 'powerbi-modelando', name: 'Data Modeling in Power BI', platform: 'Fundação Bradesco', year: 'Aug/2025', category: 'about.certDataBI' },
    { id: 'powerbi-preparando', name: 'Preparing Data for Analysis - Microsoft Power BI', platform: 'Fundação Bradesco', year: 'Aug/2025', category: 'about.certDataBI' },
    { id: 'powerbi-intro', name: 'Introduction to Data Analysis - Microsoft Power BI', platform: 'Fundação Bradesco', year: 'Aug/2025', category: 'about.certDataBI' },
    // Python
    { id: 'python-string', name: 'String in Python: Extracting Information from URLs', platform: 'Alura', year: 'May/2022', category: 'about.certPython' },
    { id: 'python-oo-avancado', name: 'Python 3: Advanced Object-Oriented Programming', platform: 'Alura', year: 'May/2022', category: 'about.certPython' },
    { id: 'python-oo-intro', name: 'Python 3: Introduction to Object-Oriented Programming', platform: 'Alura', year: 'May/2022', category: 'about.certPython' },
    { id: 'python-pt2', name: 'Python 3 Part 2: Advancing in the Language', platform: 'Alura', year: 'Apr/2022', category: 'about.certPython' },
    { id: 'python-pt1', name: 'Python 3 Part 1: Introduction to the Language', platform: 'Alura', year: 'Apr/2022', category: 'about.certPython' },
    // Frontend & Web
    { id: 'react-ts', name: 'React: Migrating to TypeScript', platform: 'Alura', year: 'Mar/2023', category: 'about.certFrontend' },
    { id: 'ts-pt1', name: 'TypeScript Part 1: Evolving Your JavaScript', platform: 'Alura', year: 'Mar/2023', category: 'about.certFrontend' },
    { id: 'ts-pt2', name: 'TypeScript Part 2: Advancing in the Language', platform: 'Alura', year: 'Mar/2023', category: 'about.certFrontend' },
    { id: 'react-js', name: 'React: Developing with JavaScript', platform: 'Alura', year: 'Feb/2023', category: 'about.certFrontend' },
    { id: 'javascript', name: 'JavaScript', platform: 'Alura', year: 'Jan/2023', category: 'about.certFrontend' },
    { id: 'sass', name: 'SASS: Syntactically Spectacular CSS', platform: 'Alura', year: 'Jan/2023', category: 'about.certFrontend' },
  ],
};

const education: Record<Locale, Education[]> = {
  'pt-br': [
    { id: 'ads', degree: 'Análise e Desenvolvimento de Sistemas', institution: 'Universidade Estácio de Sá', year: '2023' },
    { id: 'tecnico', degree: 'Técnico em Informática', institution: 'Instituto Federal de São Paulo (IFSP)', year: '2019' },
  ],
  en: [
    { id: 'ads', degree: 'Systems Analysis and Development', institution: 'Universidade Estácio de Sá', year: '2023' },
    { id: 'tecnico', degree: 'IT Technical Diploma', institution: 'Instituto Federal de São Paulo (IFSP)', year: '2019' },
  ],
};

/**
 * Retorna os itens da timeline de carreira para o locale especificado.
 */
export function getTimeline(locale: Locale): TimelineEntry[] {
  return timeline[locale];
}

/**
 * Retorna as certificações para o locale especificado.
 */
export function getCertifications(locale: Locale): Certification[] {
  return certifications[locale];
}

/**
 * Retorna a formação acadêmica para o locale especificado.
 */
export function getEducation(locale: Locale): Education[] {
  return education[locale];
}
