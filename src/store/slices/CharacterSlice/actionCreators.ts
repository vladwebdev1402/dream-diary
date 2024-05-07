import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { CharacterScheme } from '@/schemes';
import { firebaseDb } from '@/api';
import { CharacterFormData } from '@/types';

const getCharacter = createAsyncThunk(
  'character/get',
  async (id: string, thunkAPI) => {
    try {
      const docRef = doc(firebaseDb, 'characters', id);
      const docsSnap = await getDoc(docRef);

      const data = {
        id: docsSnap.id,
        ...docsSnap.data(),
      };

      const parseResult = CharacterScheme.safeParse(data);

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

const deleteCharacter = createAsyncThunk(
  'character/delete',
  async (id: string, thunkAPI) => {
    try {
      const docRef = doc(firebaseDb, 'characters', id);
      await deleteDoc(docRef);
      return id;
    } catch (e) {
      if (e instanceof Error) return thunkAPI.rejectWithValue(e.message);
      else if (typeof e === 'string') return thunkAPI.rejectWithValue(e);
      return thunkAPI.rejectWithValue('Произошла неизвестная ошибка');
    }
  },
);

const editCharacter = createAsyncThunk(
  'character/edit',
  async (
    data: { id: string } & CharacterFormData,
    thunkAPI,
  ) => {
    try {
      const docRef = doc(firebaseDb, 'characters', data.id);
      await updateDoc(docRef, data);
      return data;
    } catch (e) {
      if (e instanceof Error) return thunkAPI.rejectWithValue(e.message);
      else if (typeof e === 'string') return thunkAPI.rejectWithValue(e);
      return thunkAPI.rejectWithValue('Произошла неизвестная ошибка');
    }
  },
);

export { getCharacter, deleteCharacter, editCharacter };
