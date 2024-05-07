import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDoc, doc } from 'firebase/firestore';
import { CharacterScheme } from '@/schemes';
import { firebaseDb } from '@/api';

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

export { getCharacter };
