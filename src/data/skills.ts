import type { Locale } from '@/i18n/config';

export interface SkillCategory {
  id: string;
  labelKey: string;
  skills: string[];
}

const skillsData: Record<Locale, SkillCategory[]> = {
  'pt-br': [
    {
      id: 'data-analytics',
      labelKey: 'skills.dataAnalytics',
      skills: ['Python', 'SQL', 'DuckDB', 'Pandas', 'Power BI', 'Recharts', 'Estatística', 'ETL'],
    },
    {
      id: 'digital-marketing',
      labelKey: 'skills.digitalMarketing',
      skills: ['Meta Ads', 'Google Ads', 'Copywriting', 'Tráfego Pago', 'CRM', 'Funis de Conversão'],
    },
    {
      id: 'development',
      labelKey: 'skills.development',
      skills: ['TypeScript', 'Next.js', 'React', 'Astro', 'Tailwind CSS', 'Node.js'],
    },
    {
      id: 'automation',
      labelKey: 'skills.automation',
      skills: ['N8N', 'GitHub Actions', 'Web Scraping', 'Pipelines de Dados', 'LLM'],
    },
    {
      id: 'infrastructure',
      labelKey: 'skills.infrastructure',
      skills: ['Cloudflare Pages', 'Git', 'GitHub', 'CI/CD'],
    },
  ],
  en: [
    {
      id: 'data-analytics',
      labelKey: 'skills.dataAnalytics',
      skills: ['Python', 'SQL', 'DuckDB', 'Pandas', 'Power BI', 'Recharts', 'Statistics', 'ETL'],
    },
    {
      id: 'digital-marketing',
      labelKey: 'skills.digitalMarketing',
      skills: ['Meta Ads', 'Google Ads', 'Copywriting', 'Paid Traffic', 'CRM', 'Conversion Funnels'],
    },
    {
      id: 'development',
      labelKey: 'skills.development',
      skills: ['TypeScript', 'Next.js', 'React', 'Astro', 'Tailwind CSS', 'Node.js'],
    },
    {
      id: 'automation',
      labelKey: 'skills.automation',
      skills: ['N8N', 'GitHub Actions', 'Web Scraping', 'Data Pipelines', 'LLM'],
    },
    {
      id: 'infrastructure',
      labelKey: 'skills.infrastructure',
      skills: ['Cloudflare Pages', 'Git', 'GitHub', 'CI/CD'],
    },
  ],
};

/**
 * Retorna as categorias de skills para o locale especificado.
 */
export function getSkills(locale: Locale): SkillCategory[] {
  return skillsData[locale];
}
