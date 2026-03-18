import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()),
    locale: z.enum(['pt-br', 'en']),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    locale: z.enum(['pt-br', 'en']),
    stack: z.array(z.string()),
    liveUrl: z.string().url(),
    githubUrl: z.string().url().optional(),
    image: z.string(),
    imageAlt: z.string(),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
};
