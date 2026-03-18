import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = (site?.toString() ?? 'https://gsdigitais.com').replace(/\/$/, '');

  const allPosts = await getCollection('blog', ({ data }) => !data.draft && data.locale === 'pt-br');
  allPosts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const items = allPosts
    .map((post) => {
      const slug = post.id.split('/')[0];
      const url = `${siteUrl}/blog/${slug}`;
      const categories = post.data.tags.map((tag) => `      <category>${tag}</category>`).join('\n');
      return `    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.data.description}]]></description>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
${categories}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Gabriel Alves de Souza — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Artigos sobre dados, marketing digital e desenvolvimento web.</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
