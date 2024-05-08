import { firebaseDb } from '@/api';
import { LabelScheme } from '@/schemes';
import { LabelFormData } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

const getAllLabels = createAsyncThunk(
  'labelsList/get',
  async (uid: string, thunkAPI) => {
    try {
      const q = query(
        collection(firebaseDb, 'labels'),
        where('userUid', '==', uid),
      );
      const docsSnap = await getDocs(q);
      const data = docsSnap.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      const parseResult = LabelScheme.array().safeParse(data);
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

const createLabel = createAsyncThunk(
  'labelsList/post',
  async (label: LabelFormData & { userUid: string }, thunkAPI) => {
    try {
      const newLabel = await addDoc(
        collection(firebaseDb, 'labels'),
        label,
      );

      const parseResult = LabelScheme.safeParse({
        id: newLabel.id,
        ...label,
      });
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

export { getAllLabels, createLabel };
