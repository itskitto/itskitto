import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.enum(['General', 'React']),
    draft: z.boolean().default(false),
    ref: z.string().optional(),
    readTime: z.number().optional(),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['active', 'complete', 'archived']),
    type: z.enum(['freelance', 'personal', 'open-source']),
    role: z.string(),
    stack: z.array(z.string()),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    url: z.string().url().optional(),
    github: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
})

export const collections = { posts, projects }
