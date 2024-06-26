import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref, uploadBytes } from 'firebase/storage';

import { CharacterScheme } from '@/schemes';
import { getFirebaseImageLink, getNameFromFirebaseLink } from '@/helpers';
import { firebaseDb, firebaseStorage } from '@/api';

import { EditCharacterData } from './type';

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
  async ({ character, image }: EditCharacterData, thunkAPI) => {
    try {
      // если указана новая обложка, удаляется старая обложка
      if (character.avatarUrl !== image.oldCover && image.oldCover !== '') {
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
        character.avatarUrl = getFirebaseImageLink(image.imageFile.name);
      }
      const docRef = doc(firebaseDb, 'characters', character.id);
      await updateDoc(docRef, character);
      return character;
    } catch (e) {
      if (e instanceof Error) return thunkAPI.rejectWithValue(e.message);
      else if (typeof e === 'string') return thunkAPI.rejectWithValue(e);
      return thunkAPI.rejectWithValue('Произошла неизвестная ошибка');
    }
  },
);

export { getCharacter, deleteCharacter, editCharacter };
