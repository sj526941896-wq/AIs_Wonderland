import { defineCollection, z } from 'astro:content';

const entries = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    achievement: z.string().optional(),
    views: z.number().default(0),
    likes: z.number().default(0),
    draft: z.boolean().default(false),
    pillar: z.enum(['teach', 'media', 'ai-lab']).default('media'),
    contentType: z
      .enum(['lesson', 'daily', 'case', 'viz', 'workflow'])
      .optional(),
    audience: z.enum(['student', 'fan', 'peer']).default('fan'),
    // Frontmatter `slug` is Astro’s entry slug (`entry.slug`), not `entry.data.slug`.
    slug: z.string().optional(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
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

export const collections = { entries };
