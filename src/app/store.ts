import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersNamesSliceReducer from '../features/users/usersNamesSlice';
import usersSubscriptionsReducer from '../features/users/usersSubscriptionsSlice';
import testsReducer from '../features/tests/testsSlice';
import scorecardsReducer from '../features/scorecards/scorecardsSlice';
import idsReducer from '../features/ids/idsSlice';
import betLeaderboardsReducer from '../features/leaderboards/betLeaderboardsSlice';

export const store = configureStore({
  reducer: {
    usersNames: usersNamesSliceReducer,
    usersSubscriptions: usersSubscriptionsReducer,
    tests: testsReducer,
    scorecards: scorecardsReducer,
    ids: idsReducer,
    betsLeaderboard: betLeaderboardsReducer,
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
