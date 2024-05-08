import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import {
  dreamListActions,
  dreamListReducer,
  dreamListSelectors,
} from './slices/DreamListSlice';
import {
  characterListActions,
  characterListReducer,
  characterListSelectors,
} from './slices/CharacterListSlice';
import {
  characterSliceReducer,
  characterSliceSelectors,
  characterSlicetActions,
} from './slices/CharacterSlice';
import {
  labelsSliceReducer,
  labelsSliceSelectors,
  labelsSlicetActions,
} from './slices/LabelListSlice';

const store = configureStore({
  reducer: {
    dreamListReducer,
    characterListReducer,
    characterSliceReducer,
    labelsSliceReducer,
  },
});

const StoreActions = {
  dreamList: dreamListActions,
  characterList: characterListActions,
  character: characterSlicetActions,
  labelsList: labelsSlicetActions,
};

const StoreSelectors = {
  dreamList: dreamListSelectors,
  characterList: characterListSelectors,
  character: characterSliceSelectors,
  labelsList: labelsSliceSelectors,
};

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

export { store, useAppSelector, useAppDispatch, StoreActions, StoreSelectors };
export type { RootState, AppDispatch };
