import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';

import { CharacterScheme } from '@/schemes';
import { firebaseDb } from '@/api';
import { CharacterFormData } from '@/types';

const getAllCharacters = createAsyncThunk(
  'charactersList/get',
  async (uid: string, thunkAPI) => {
    try {
      const q = query(
        collection(firebaseDb, 'characters'),
        where('userUid', '==', uid),
      );
      const docsSnap = await getDocs(q);
      const data = docsSnap.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      const parseResult = CharacterScheme.array().safeParse(data);
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

const createCharacter = createAsyncThunk(
  'charactersList/post',
  async (character: { userUid: string } & CharacterFormData, thunkAPI) => {
    try {
      const data = await addDoc(
        collection(firebaseDb, 'characters'),
        character,
      );
      const parseResult = CharacterScheme.safeParse({
        id: data.id,
        ...character,
      });
      if (!parseResult.success)
        return thunkAPI.rejectWithValue(
          'Произошла ошибка при создании персонажа',
        );

      return parseResult.data;
    } catch (e) {
      if (e instanceof Error) return thunkAPI.rejectWithValue(e.message);
      else if (typeof e === 'string') return thunkAPI.rejectWithValue(e);
      return thunkAPI.rejectWithValue('Произошла неизвестная ошибка');
    }
  },
);

export { getAllCharacters, createCharacter };
