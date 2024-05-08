import { z } from 'zod';

const LabelScheme = z.object({
  id: z.string(),
  name: z.string(),
  theme: z.enum(['gray', 'blue', 'red', 'gold', 'green']),
});

export { LabelScheme };
