import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Scorecard } from 'golf-gamblers-model';
import { RootState } from '../../app/store';

export interface ScorecardsState {
  [id: string]: Scorecard;
}

const initialState: ScorecardsState = {};

export const scorecardsSlice = createSlice({
  name: 'scorecards',
  initialState,
  reducers: {
    setScorecard: (state, action: PayloadAction<Scorecard>) => {
      const scorecard = action.payload;
      state[scorecard.scorecardId] = scorecard;
    },
    removeAllScorecards: (state) => {
      const keys = Object.keys(state);
      keys.forEach((key) => {
        delete state[key];
      });
    },
  },
  // async reducers
  extraReducers: {},
});

export const { setScorecard, removeAllScorecards } = scorecardsSlice.actions;

export const selectScorecards = (state: RootState) => state.scorecards;

export default scorecardsSlice.reducer;
