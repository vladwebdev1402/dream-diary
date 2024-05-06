import { Character } from '@/types';

type CharacterFormData = Pick<Character, 'name' | 'description' | 'avatarUrl'>;
type CharacterFormErrors = Partial<
  Pick<Character, 'name' | 'description'>
> | null;

export type { CharacterFormData, CharacterFormErrors };
