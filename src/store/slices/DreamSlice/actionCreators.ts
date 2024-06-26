import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref, uploadBytes } from 'firebase/storage';

import { firebaseDb, firebaseStorage } from '@/api';
import { DreamScheme } from '@/schemes';
import { getFirebaseImageLink, getNameFromFirebaseLink } from '@/helpers';

import { EditDreamData } from './type';
import { Dream } from '@/types';

const getDream = createAsyncThunk(
  'dreamSlice/get',
  async (id: string, thunkAPI) => {
    try {
      const docRef = doc(firebaseDb, 'dreams', id);
      const docSnap = await getDoc(docRef);

      const resultParse = DreamScheme.safeParse({
        ...docSnap.data(),
        id: docSnap.id,
      });

      if (!resultParse.success)
        return thunkAPI.rejectWithValue('Некорректные данные на сервере');

      return resultParse.data;
    } catch (e) {
      if (e instanceof Error) return thunkAPI.rejectWithValue(e.message);
      else if (typeof e === 'string') return thunkAPI.rejectWithValue(e);
      return thunkAPI.rejectWithValue('Произошла неизвестная ошибка');
    }
  },
);

const editDream = createAsyncThunk(
  'dreamSlice/edit',
  async ({ dream, image }: EditDreamData, thunkAPI) => {
    try {
      // если указана новая обложка, удаляется старая обложка
      if (dream.cover !== image.oldCover && image.oldCover !== '') {
        await deleteObject(
          ref(firebaseStorage, getNameFromFirebaseLink(image.oldCover)),
        );
      }

      // если добавлен файл он загружается, устанавливается ссылка на новую обложку
      if (image.imageFile) {
        await uploadBytes(
          ref(firebaseStorage, image.imageFile.name),
          image.imageFile,
        );
        dream.cover = getFirebaseImageLink(image.imageFile.name);
      }

      const docRef = doc(firebaseDb, 'dreams', dream.id);
      await updateDoc(docRef, dream);
      return dream;
    } catch (e) {
      if (e instanceof Error) return thunkAPI.rejectWithValue(e.message);
      else if (typeof e === 'string') return thunkAPI.rejectWithValue(e);
      return thunkAPI.rejectWithValue('Произошла неизвестная ошибка');
    }
  },
);

const deleteDream = createAsyncThunk(
  'dreamSlice/delete',
  async (dream: Dream, thunkAPI) => {
    try {
      if (dream.cover) {
        await deleteObject(
          ref(firebaseStorage, getNameFromFirebaseLink(dream.cover)),
        );
      }
      const docRef = doc(firebaseDb, 'dreams', dream.id);
      await deleteDoc(docRef);
      return dream.id;
    } catch (e) {
      if (e instanceof Error) return thunkAPI.rejectWithValue(e.message);
      else if (typeof e === 'string') return thunkAPI.rejectWithValue(e);
      return thunkAPI.rejectWithValue('Произошла неизвестная ошибка');
    }
  },
);

export { getDream, editDream, deleteDream };
