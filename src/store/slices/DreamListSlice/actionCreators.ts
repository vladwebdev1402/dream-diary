import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

import { firebaseDb } from '@/api';
import { DreamScheme } from '@/schemes';
import { DreamFormData } from '@/types';

const getAllDreams = createAsyncThunk(
  'dreamList/get',
  async (uid: string, thunkAPI) => {
    try {
      const q = query(
        collection(firebaseDb, 'dreams'),
        where('userUid', '==', uid),
      );
      const docsSnap = await getDocs(q);
      const parseResult = DreamScheme.array().safeParse(
        docsSnap.docs.map((item) => ({ id: item.id, ...item.data() })),
      );

      if (!parseResult.success)
        return thunkAPI.rejectWithValue('Неккоретные данные на сервере');

      return parseResult.data;
    } catch (e) {
      if (e instanceof Error) return thunkAPI.rejectWithValue(e.message);
      else if (typeof e === 'string') return thunkAPI.rejectWithValue(e);
      return thunkAPI.rejectWithValue('Произошла неизвестная ошибка');
    }
  },
);

const createDream = createAsyncThunk(
  'dreamList/post',
  async (dream: DreamFormData & { userUid: string }, thunkAPI) => {
    try {
      const data = await addDoc(collection(firebaseDb, 'dreams'), dream);
      const parseResult = DreamScheme.safeParse({
        id: data.id,
        ...dream,
      });
      if (!parseResult.success)
        return thunkAPI.rejectWithValue('Произошла ошибка при создании сна');

      return parseResult.data;
    } catch (e) {
      if (e instanceof Error) return thunkAPI.rejectWithValue(e.message);
      else if (typeof e === 'string') return thunkAPI.rejectWithValue(e);
      return thunkAPI.rejectWithValue('Произошла неизвестная ошибка');
    }
  },
);

export { getAllDreams, createDream };
