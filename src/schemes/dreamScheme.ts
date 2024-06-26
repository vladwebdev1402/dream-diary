import { z } from 'zod';

const DreamScheme = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  date: z.object({
    seconds: z.number(),
    nanoseconds: z.number(),
  }),
  cover: z.string().optional(),
  characters: z.array(z.string()).optional(),
  labels: z.array(z.string()).optional(),
  userUid: z.string(),
});

export { DreamScheme };
