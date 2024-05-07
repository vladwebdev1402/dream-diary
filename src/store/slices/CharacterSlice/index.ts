import { createSlice } from '@reduxjs/toolkit';

import { Character } from '@/types';
import { RootState } from '@/store';

import { getCharacter } from './actionCreators';

type InitialState = {
  isLoading: boolean;
  error: string;
  data: Character | null;
};

const initialState: InitialState = {
  isLoading: false,
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
      state.data = action.payload !== undefined ? action.payload : null;
    });
    builder.addCase(getCharacter.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.payload === 'string' ? action.payload : 'Неизвестная ошибка';
    });
  },
});

const characterSliceReducer = CharacterSlice.reducer;
const characterSlicetActions = {
  ...CharacterSlice.actions,
  getCharacter,
};

const characterSliceSelectors = {
  selectData: (state: RootState) => state.characterSliceReducer.data,
  selectAll: (state: RootState) => state.characterSliceReducer,
  selectIsLoading: (state: RootState) => state.characterSliceReducer.isLoading,
};

export {
  characterSlicetActions,
  characterSliceReducer,
  characterSliceSelectors,
};
