import { DreamFormData } from '@/types';

type DreamCreateData = {
  dream: DreamFormData & { userUid: string };
  imageFile?: File;
};

export type { DreamCreateData };
