import { createSlice } from '@reduxjs/toolkit';

import { Dream } from '@/types';
import { dreams } from './data';
import { RootState } from '@/store';

type InitialState = {
  isLoading: boolean;
  error: string;
  data: Dream[];
};

const initialState: InitialState = {
  isLoading: false,
  error: '',
  data: dreams,
};

const DreamListSlice = createSlice({
  name: 'DreamListSlice',
  initialState,
  reducers: {},
});

const dreamListReducer = DreamListSlice.reducer;
const dreamListActions = DreamListSlice.actions;

const dreamListSelectors = {
    selectData: (state: RootState) => state.dreamListReducer.data,
    selectAll: (state: RootState) => state.dreamListReducer
}

export { dreamListActions, dreamListReducer, dreamListSelectors };
