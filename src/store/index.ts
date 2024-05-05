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
  characterListSelectors
} from './slices/CharacterListSlice';

const store = configureStore({
  reducer: {
    dreamListReducer,
    characterListReducer,
  },
});

const StoreActions = {
  dreamList: dreamListActions,
  characterList: characterListActions
};

const StoreSelectors = {
  dreamList: dreamListSelectors,
  characterList: characterListSelectors
};

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

export { store, useAppSelector, useAppDispatch, StoreActions, StoreSelectors };
export type { RootState, AppDispatch };
