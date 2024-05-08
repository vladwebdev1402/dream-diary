import { createSlice } from '@reduxjs/toolkit';

import { Character } from '@/types';
import { RootState } from '@/store';

import { deleteCharacter, editCharacter, getCharacter } from './actionCreators';

type InitialState = {
  isLoading: boolean;
  isActionLoading: boolean;
  error: string;
  data: Character | null;
};

const initialState: InitialState = {
  isLoading: false,
  isActionLoading: false,
  error: '',
  data: null,
};

const CharacterSlice = createSlice({
  name: 'CharacterSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCharacter.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getCharacter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getCharacter.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Неизвестная ошибка';
    });

    builder.addCase(deleteCharacter.pending, (state) => {
      state.isActionLoading = true;
      state.error = '';
    });
    builder.addCase(deleteCharacter.fulfilled, (state) => {
      state.isActionLoading = false;
      state.data = null;
    });
    builder.addCase(deleteCharacter.rejected, (state, action) => {
      state.isActionLoading = false;
      state.error = action.error.message || 'Неизвестная ошибка';
    });

    builder.addCase(editCharacter.pending, (state) => {
      state.isActionLoading = true;
      state.error = '';
    });
    builder.addCase(editCharacter.fulfilled, (state, action) => {
      state.isActionLoading = false;
      state.data = action.payload;
    });
    builder.addCase(editCharacter.rejected, (state, action) => {
      state.isActionLoading = false;
      state.error = action.error.message || 'Неизвестная ошибка';
    });
  },
});

const characterSliceReducer = CharacterSlice.reducer;
const characterSlicetActions = {
  ...CharacterSlice.actions,
  getCharacter,
  deleteCharacter,
  editCharacter,
};

const characterSliceSelectors = {
  selectData: (state: RootState) => state.characterSliceReducer.data,
  selectAll: (state: RootState) => state.characterSliceReducer,
  selectIsLoading: (state: RootState) => state.characterSliceReducer.isLoading,
  selectIsActionLoading: (state: RootState) =>
    state.characterSliceReducer.isActionLoading,
};

export {
  characterSlicetActions,
  characterSliceReducer,
  characterSliceSelectors,
};
