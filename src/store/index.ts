import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  dreamListActions,
  dreamListReducer,
  dreamListSelectors,
} from './reducers/DreamListSlice';

const store = configureStore({
  reducer: {
    dreamListReducer,
  },
});

const StoreActions = {
  dreamList: dreamListActions,
};

const StoreSelectors = {
  dreamList: dreamListSelectors,
};

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

export { store, useAppSelector, useAppDispatch, StoreActions, StoreSelectors };
export type { RootState, AppDispatch };
