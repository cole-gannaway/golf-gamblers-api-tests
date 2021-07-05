import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersNamesSliceReducer from '../features/users/usersNamesSlice';
import usersSubscriptionsReducer from '../features/users/usersSubscriptionsSlice';
import testsReducer from '../features/tests/testsSlice';

export const store = configureStore({
  reducer: {
    usersNames: usersNamesSliceReducer,
    usersSubscriptions: usersSubscriptionsReducer,
    tests: testsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
