import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

import { firebaseDb } from '@/api';
import { LabelScheme } from '@/schemes';
import { LabelFormData } from '@/types';

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
      const newLabel = await addDoc(collection(firebaseDb, 'labels'), label);

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

const deleteLabel = createAsyncThunk(
  'labelsList/delete',
  async (id: string, thunkAPI) => {
    try {
      await deleteDoc(doc(firebaseDb, 'labels', id));
      return id;
    } catch (e) {
      if (e instanceof Error) return thunkAPI.rejectWithValue(e.message);
      else if (typeof e === 'string') return thunkAPI.rejectWithValue(e);
      return thunkAPI.rejectWithValue('Произошла неизвестная ошибка');
    }
  },
);

const editLabel = createAsyncThunk(
  'labelsList/edit',
  async (
    label: { data: LabelFormData; id: string; userUid: string },
    thunkAPI,
  ) => {
    try {
      await setDoc(doc(firebaseDb, 'labels', label.id), {
        userUid: label.userUid,
        ...label.data,
      });
      return { id: label.id, ...label.data, userUid: label.userUid };
    } catch (e) {
      if (e instanceof Error) return thunkAPI.rejectWithValue(e.message);
      else if (typeof e === 'string') return thunkAPI.rejectWithValue(e);
      return thunkAPI.rejectWithValue('Произошла неизвестная ошибка');
    }
  },
);

export { getAllLabels, createLabel, deleteLabel, editLabel };
