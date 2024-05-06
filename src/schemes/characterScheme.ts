import { z } from 'zod';

const CharacterScheme = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  avatarUrl: z.string().optional(),
});

export { CharacterScheme };
