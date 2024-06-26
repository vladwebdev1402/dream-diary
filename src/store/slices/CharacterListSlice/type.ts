import { CharacterFormData } from '@/types';

type CreateCharacterData = {
  character: { userUid: string } & CharacterFormData;
  imageFile?: File;
};

export type { CreateCharacterData };
