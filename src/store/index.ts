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
import {
  dreamSliceReducer,
  dreamSliceSelectors,
  dreamSlicetActions,
} from './slices/DreamSlice';
import {
  authReducer,
  authActions,
  authSelectors,
} from './slices/AuthSlice';

const store = configureStore({
  reducer: {
    dreamListReducer,
    characterListReducer,
    characterSliceReducer,
    labelsSliceReducer,
    dreamSliceReducer,
    authReducer,
  },
});

const StoreActions = {
  dreamList: dreamListActions,
  dream: dreamSlicetActions,
  characterList: characterListActions,
  character: characterSlicetActions,
  labelsList: labelsSlicetActions,
  auth: authActions,
};

const StoreSelectors = {
  dreamList: dreamListSelectors,
  dream: dreamSliceSelectors,
  characterList: characterListSelectors,
  character: characterSliceSelectors,
  labelsList: labelsSliceSelectors,
  auth: authSelectors,
};

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

export { store, useAppSelector, useAppDispatch, StoreActions, StoreSelectors };
export type { RootState, AppDispatch };
