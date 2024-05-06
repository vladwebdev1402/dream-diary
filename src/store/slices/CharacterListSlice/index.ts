import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CharacterFormData } from '@/components';
import { Character } from '@/types';
import { RootState } from '@/store';

import { getAllCharacters } from './actionCreators';

type InitialState = {
  isLoading: boolean;
  error: string;
  data: Character[];
};

const initialState: InitialState = {
  isLoading: false,
  error: '',
  data: [],
};

const CharacterListSlice = createSlice({
  name: 'DreamListSlice',
  initialState,
  reducers: {
    addNewCharacter: (state, action: PayloadAction<CharacterFormData>) => {
      state.data.push({ id: Math.random().toString(), ...action.payload });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCharacters.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getAllCharacters.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload !== undefined ? action.payload : [];
    });
    builder.addCase(getAllCharacters.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
       action.payload === 'string'
          ? action.payload
          : 'Неизвестная ошибка';
    });
  },
});

const characterListReducer = CharacterListSlice.reducer;
const characterListActions = {
  ...CharacterListSlice.actions,
  getAllCharacters,
};

const characterListSelectors = {
  selectData: (state: RootState) => state.characterListReducer.data,
  selectAll: (state: RootState) => state.characterListReducer,
};

export { characterListActions, characterListReducer, characterListSelectors };
