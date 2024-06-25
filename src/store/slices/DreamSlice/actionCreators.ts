import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

import { firebaseDb } from '@/api';
import { DreamScheme } from '@/schemes';
import { DreamFormData } from '@/types';


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
  async (data: DreamFormData & { id: string; userUid: string }, thunkAPI) => {
    try {
      const docRef = doc(firebaseDb, 'dreams', data.id);
      await updateDoc(docRef, data);
      return data;
    } catch (e) {
      if (e instanceof Error) return thunkAPI.rejectWithValue(e.message);
      else if (typeof e === 'string') return thunkAPI.rejectWithValue(e);
      return thunkAPI.rejectWithValue('Произошла неизвестная ошибка');
    }
  },
);

const deleteDream = createAsyncThunk(
  'dreamSlice/delete',
  async (id: string, thunkAPI) => {
    try {
      const docRef = doc(firebaseDb, 'dreams', id);
      await deleteDoc(docRef);
      return id;
    } catch (e) {
      if (e instanceof Error) return thunkAPI.rejectWithValue(e.message);
      else if (typeof e === 'string') return thunkAPI.rejectWithValue(e);
      return thunkAPI.rejectWithValue('Произошла неизвестная ошибка');
    }
  },
);

export { getDream, editDream, deleteDream };
