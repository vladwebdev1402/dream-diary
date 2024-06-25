import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { SignUpData } from '@/types';
import { firebiseAuth } from '@/api';

import { authErrors } from './authErrors';

const signUpByEmail = createAsyncThunk(
  'auth/signUpEmail',
  async (data: SignUpData, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebiseAuth,
        data.email,
        data.password,
      );
      return { ...userCredential.user };
    } catch (error) {
      if (typeof error === 'string') return thunkAPI.rejectWithValue(error);
      if (error instanceof Error && 'code' in error)
        return thunkAPI.rejectWithValue(
          authErrors[error.code as string] || error.code,
        );
      return thunkAPI.rejectWithValue('Неизвестная ошибка в ActionCreator');
    }
  },
);

const signUpByGoogle = createAsyncThunk(
  'auth/signUpGoogle',
  async (_, thunkAPI) => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      const result = await signInWithPopup(firebiseAuth, provider);
      return { ...result.user };
    } catch (error) {
      if (typeof error === 'string') return thunkAPI.rejectWithValue(error);
      if (error instanceof Error && 'code' in error)
        return thunkAPI.rejectWithValue(
          authErrors[error.code as string] || error.code,
        );
      return thunkAPI.rejectWithValue('Неизвестная ошибка в ActionCreator');
    }
  },
);

export { signUpByEmail, signUpByGoogle };
