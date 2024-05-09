import { createSlice } from '@reduxjs/toolkit';

import { Dream } from '@/types';
import { RootState } from '@/store';

import { createDream, getAllDreams } from './actionCreators';

type InitialState = {
  isLoading: boolean;
  isActionLoading: boolean;
  error: string;
  data: Dream[] | null;
};

const initialState: InitialState = {
  isLoading: false,
  isActionLoading: false,
  error: '',
  data: null,
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

    builder.addCase(createDream.pending, (state) => {
      state.error = '';
      state.isActionLoading = true;
    });
    builder.addCase(createDream.fulfilled, (state, action) => {
      state.isActionLoading = false;
      if (state.data) state.data.push(action.payload);
    });
    builder.addCase(createDream.rejected, (state, action) => {
      state.isActionLoading = false;
      state.error = (action.payload as string) || 'Неизвестная ошибка';
    });
  },
});

const dreamListReducer = DreamListSlice.reducer;
const dreamListActions = {
  ...DreamListSlice.actions,
  getAllDreams,
  createDream,
};

const dreamListSelectors = {
  selectData: (state: RootState) => state.dreamListReducer.data,
  selectAll: (state: RootState) => state.dreamListReducer,
  selectIsActionLoading: (state: RootState) =>
    state.dreamListReducer.isActionLoading,
};

export { dreamListActions, dreamListReducer, dreamListSelectors };
