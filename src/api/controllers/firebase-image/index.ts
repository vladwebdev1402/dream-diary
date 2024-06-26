import { firebaseStorage } from '@/api/firebase';
import { ref, uploadBytes } from 'firebase/storage';

const uploadFirebaseImage = async (file: File) => {
  const result = await uploadBytes(ref(firebaseStorage, file.name), file);
  return result;
};

export { uploadFirebaseImage };
