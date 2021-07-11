import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BetsLeaderBoard } from '../../../../golf-gamblers-model/dist';
import { RootState } from '../../app/store';

export interface BetLeaderboardsState {
  [eventId: string]: BetsLeaderBoard;
}

const initialState: BetLeaderboardsState = {};

export const betLeaderboardsSlice = createSlice({
  name: 'betLeaderboards',
  initialState,
  reducers: {
    setBetLeaderboard(state, action: PayloadAction<BetsLeaderBoard>) {
      state[action.payload.eventId] = action.payload;
    },
    removeAllBetLeaderboards: (state) => {
      const keys = Object.keys(state);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        delete state[key];
      }
    },
  },
  // async reducers
  extraReducers: {},
});

export const { setBetLeaderboard, removeAllBetLeaderboards } =
  betLeaderboardsSlice.actions;

export const selectBetsLeaderboards = (state: RootState) =>
  state.betsLeaderboard;

export default betLeaderboardsSlice.reducer;
