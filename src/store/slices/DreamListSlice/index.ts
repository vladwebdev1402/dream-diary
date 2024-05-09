import { createSlice } from '@reduxjs/toolkit';

import { Dream } from '@/types';
import { RootState } from '@/store';

import { getAllDreams } from './actionCreators';

type InitialState = {
  isLoading: boolean;
  error: string;
  data: Dream[];
};

const initialState: InitialState = {
  isLoading: false,
  error: '',
  data: [],
};

const DreamListSlice = createSlice({
  name: 'DreamListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDreams.pending, (state) => {
      state.error = '';
      state.isLoading = true;
    });
    builder.addCase(getAllDreams.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getAllDreams.rejected, (state, action) => {
      state.isLoading = false;
      state.error = (action.payload as string) || 'Неизвестная ошибка';
    });
  },
});

const dreamListReducer = DreamListSlice.reducer;
const dreamListActions = { ...DreamListSlice.actions, getAllDreams };

const dreamListSelectors = {
  selectData: (state: RootState) => state.dreamListReducer.data,
  selectAll: (state: RootState) => state.dreamListReducer,
};

export { dreamListActions, dreamListReducer, dreamListSelectors };
