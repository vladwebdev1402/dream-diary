import { createSlice } from '@reduxjs/toolkit';

import { Character } from '@/types';
import { RootState } from '@/store';

import { characters } from './data';

type InitialState = {
  isLoading: boolean;
  error: string;
  data: Character[];
};

const initialState: InitialState = {
  isLoading: false,
  error: '',
  data: characters,
};

const CharacterListSlice = createSlice({
  name: 'DreamListSlice',
  initialState,
  reducers: {},
});

const characterListReducer = CharacterListSlice.reducer;
const characterListActions = CharacterListSlice.actions;

const characterListSelectors = {
    selectData: (state: RootState) => state.characterListReducer.data,
    selectAll: (state: RootState) => state.characterListReducer
}

export { characterListActions, characterListReducer, characterListSelectors };
