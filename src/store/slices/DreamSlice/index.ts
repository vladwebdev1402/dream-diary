import { createSlice } from '@reduxjs/toolkit';

import { Dream } from '@/types';
import { RootState } from '@/store';
import { deleteDream, editDream, getDream } from './actionCreators';

type InitialState = {
  isLoading: boolean;
  isActionLoading: boolean;
  error: string;
  data: Dream | null;
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
    builder.addCase(getDream.pending, (state) => {
      state.error = '';
      state.isLoading = true;
    });
    builder.addCase(getDream.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getDream.rejected, (state, action) => {
      state.isLoading = false;
      state.error = (action.payload as string) || 'Неизвестная ошибка';
    });

    builder.addCase(editDream.pending, (state) => {
      state.isActionLoading = true;
      state.error = '';
    });
    builder.addCase(editDream.fulfilled, (state, action) => {
      state.isActionLoading = false;
      state.data = action.payload;
    });
    builder.addCase(editDream.rejected, (state, action) => {
      state.isActionLoading = false;
      state.error = (action.payload as string) || 'Неизвестная ошибка';
    });

    builder.addCase(deleteDream.pending, (state) => {
      state.isActionLoading = true;
      state.error = '';
    });
    builder.addCase(deleteDream.fulfilled, (state) => {
      state.isActionLoading = false;
      state.data = null;
    });
    builder.addCase(deleteDream.rejected, (state, action) => {
      state.isActionLoading = false;
      state.error = (action.payload as string) || 'Неизвестная ошибка';
    });
  },
});

const dreamSliceReducer = CharacterSlice.reducer;
const dreamSlicetActions = {
  ...CharacterSlice.actions,
  getDream,
  deleteDream,
  editDream,
};

const dreamSliceSelectors = {
  selectAll: (state: RootState) => state.dreamSliceReducer,
  selectIsActionLoading: (state: RootState) =>
    state.dreamSliceReducer.isActionLoading,
};

export { dreamSlicetActions, dreamSliceReducer, dreamSliceSelectors };
