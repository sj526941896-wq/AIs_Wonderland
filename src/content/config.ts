import { defineCollection, z } from 'astro:content';

const entries = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    achievement: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { entries };
