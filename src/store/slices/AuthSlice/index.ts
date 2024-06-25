import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { LocalStorageService } from '@/api';

import { signInByEmail, signUpByEmail, signUpByGoogle } from './actionCreators';

type InitialState = {
  isAuth: boolean;
  data: { uid: string } | null;
  isLoading: boolean;
  actionIsLoading: boolean;
  error: string;
};

const initialState: InitialState = {
  isAuth: LocalStorageService.checkUID(),
  data: null,
  actionIsLoading: false,
  isLoading: false,
  error: '',
};

const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {
    clear: (state) => {
      state.actionIsLoading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpByEmail.pending, (state) => {
      state.actionIsLoading = true;
      state.error = '';
    });
    builder.addCase(signUpByEmail.fulfilled, (state, action) => {
      state.actionIsLoading = false;
      state.data = action.payload;
      state.isAuth = true;
      LocalStorageService.setUID(action.payload.uid);
    });
    builder.addCase(signUpByEmail.rejected, (state, action) => {
      state.actionIsLoading = false;
      state.error =
        typeof action.payload === 'string'
          ? action.payload
          : 'Неизвестная ошибка в Reducer';
    });

    builder.addCase(signUpByGoogle.pending, (state) => {
      state.actionIsLoading = true;
      state.error = '';
    });
    builder.addCase(signUpByGoogle.fulfilled, (state, action) => {
      state.actionIsLoading = false;
      state.data = action.payload;
      state.isAuth = true;
      LocalStorageService.setUID(action.payload.uid);
    });
    builder.addCase(signUpByGoogle.rejected, (state, action) => {
      state.actionIsLoading = false;
      state.error =
        typeof action.payload === 'string'
          ? action.payload
          : 'Неизвестная ошибка в Reducer';
    });

    builder.addCase(signInByEmail.pending, (state) => {
      state.actionIsLoading = true;
      state.error = '';
    });
    builder.addCase(signInByEmail.fulfilled, (state, action) => {
      state.actionIsLoading = false;
      state.data = action.payload;
      state.isAuth = true;
      LocalStorageService.setUID(action.payload.uid);
    });
    builder.addCase(signInByEmail.rejected, (state, action) => {
      state.actionIsLoading = false;
      state.error =
        typeof action.payload === 'string'
          ? action.payload
          : 'Неизвестная ошибка в Reducer';
    });
  },
});

const authReducer = AuthSlice.reducer;
const authActions = {
  ...AuthSlice.actions,
  signUpByEmail,
  signUpByGoogle,
  signInByEmail,
};
const authSelectors = {
  selectActionIsLoading: (state: RootState) =>
    state.authReducer.actionIsLoading,
  selectError: (state: RootState) => state.authReducer.error,
  selectUser: (state: RootState) => state.authReducer.data,
  selectIsAuth: (state: RootState) => state.authReducer.isAuth,
};

export { authReducer, authActions, authSelectors };
