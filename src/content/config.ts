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

const logs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    status: z.enum(['resolved', 'in-progress', 'open']).default('open'),
    severity: z.enum(['high', 'medium', 'low']).default('medium'),
    tags: z.array(z.string()).default([]),
    solution: z.string().optional(),
    relatedEntry: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { entries, logs };
