import { createSlice } from '@reduxjs/toolkit';

import { Character } from '@/types';
import { RootState } from '@/store';

import { createCharacter, getAllCharacters } from './actionCreators';

type InitialState = {
  isLoading: boolean;
  error: string;
  data: Character[] | null;
};

const initialState: InitialState = {
  isLoading: false,
  error: '',
  data: null,
};

const CharacterListSlice = createSlice({
  name: 'DreamListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCharacters.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getAllCharacters.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getAllCharacters.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Неизвестная ошибка';
    });

    builder.addCase(createCharacter.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(createCharacter.fulfilled, (state, action) => {
      state.isLoading = false;
      if (state.data) state.data.push(action.payload);
    });
    builder.addCase(createCharacter.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Неизвестная ошибка';
    });
  },
});

const characterListReducer = CharacterListSlice.reducer;
const characterListActions = {
  ...CharacterListSlice.actions,
  getAllCharacters,
  createCharacter,
};

const characterListSelectors = {
  selectData: (state: RootState) => state.characterListReducer.data,
  selectAll: (state: RootState) => state.characterListReducer,
  selectIsLoading: (state: RootState) => state.characterListReducer.isLoading,
};

export { characterListActions, characterListReducer, characterListSelectors };
