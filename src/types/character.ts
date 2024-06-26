type Character = {
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  userUid: string;
};

type CharacterFormData = Pick<Character, 'name' | 'description' | 'avatarUrl'>;
type CharacterFormErrors = Partial<
  Pick<Character, 'name' | 'description'>
> | null;

export type { Character, CharacterFormData, CharacterFormErrors };
