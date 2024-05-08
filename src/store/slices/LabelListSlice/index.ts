import { createSlice } from '@reduxjs/toolkit';

import { Label } from '@/types';
import { RootState } from '@/store';
import { createLabel, getAllLabels } from './actionCreators';

type InitialState = {
  isLoading: boolean;
  isActionLoading: boolean;
  error: string;
  data: Label[];
};

const initialState: InitialState = {
  isLoading: false,
  isActionLoading: false,
  error: '',
  data: [],
};

const LabelListSlice = createSlice({
  name: 'LabelsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLabels.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getAllLabels.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getAllLabels.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Неизвестная ошибка';
    });

    builder.addCase(createLabel.pending, (state) => {
      state.isActionLoading = true;
      state.error = '';
    });
    builder.addCase(createLabel.fulfilled, (state, action) => {
      state.isActionLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(createLabel.rejected, (state, action) => {
      state.isActionLoading = false;
      state.error = action.error.message || 'Неизвестная ошибка';
    });
  },
});

const labelsSliceReducer = LabelListSlice.reducer;
const labelsSlicetActions = {
  ...LabelListSlice.actions,
  getAllLabels,
  createLabel,
};

const labelsSliceSelectors = {
  selectData: (state: RootState) => state.labelsSliceReducer.data,
  selectError: (state: RootState) => state.labelsSliceReducer.error,
  selectAll: (state: RootState) => state.labelsSliceReducer,
  selectIsActionLoading: (state: RootState) =>
    state.labelsSliceReducer.isActionLoading,
};

export { labelsSlicetActions, labelsSliceReducer, labelsSliceSelectors };
