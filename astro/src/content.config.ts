import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content/blogs' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    image: z.string().default(''),
    description: z.string().default(''),
    continent: z
      .enum(['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Antarctica', 'General'])
      .optional(),
  }),
});

export const collections = { blog };
