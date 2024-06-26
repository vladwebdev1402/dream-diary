import { CharacterFormData } from '@/types';

type EditCharacterData = {
  character: { id: string; userUid: string } & CharacterFormData;
  image: {
    oldCover: string;
    imageFile?: File;
  };
};

export type { EditCharacterData };
