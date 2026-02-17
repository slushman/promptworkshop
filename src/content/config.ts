import { defineCollection, z } from 'astro:content';

const industriesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    industry: z.string(),
    headline: z.string(),
    subheadline: z.string().optional(),
    description: z.string().optional(),
    highlights: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
    outcomes: z.array(z.string()),
    format: z.object({
      duration: z.string(),
      delivery: z.string(),
      customization: z.string(),
    }).optional(),
    cta: z.object({
      heading: z.string(),
      description: z.string(),
      buttonText: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  industries: industriesCollection,
};
