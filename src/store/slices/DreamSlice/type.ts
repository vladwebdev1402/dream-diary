import { DreamFormData } from '@/types';

type EditDreamData = {
  dream: DreamFormData & { id: string; userUid: string };
  image: {
    oldCover: string;
    imageFile?: File;
  };
};

export type { EditDreamData };
