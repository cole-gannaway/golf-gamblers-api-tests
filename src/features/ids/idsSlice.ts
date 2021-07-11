import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface IdsState {
  userIds: IdMap;
  eventIds: IdMap;
  betsLeaderboardIds: IdMap;
}
export interface IdMap {
  [id: string]: boolean;
}

const initialState: IdsState = {
  userIds: {},
  eventIds: {},
  betsLeaderboardIds: {},
};

export const idsSlice = createSlice({
  name: 'ids',
  initialState,
  reducers: {
    setUserIds(state, action: PayloadAction<string[]>) {
      for (let i = 0; i < action.payload.length; i++) {
        state.userIds[action.payload[i]] = true;
      }
    },
    setEventIds(state, action: PayloadAction<string[]>) {
      for (let i = 0; i < action.payload.length; i++) {
        state.eventIds[action.payload[i]] = true;
      }
    },
    setBetsLeaderbordIds(state, action: PayloadAction<string[]>) {
      for (let i = 0; i < action.payload.length; i++) {
        state.betsLeaderboardIds[action.payload[i]] = true;
      }
    },
    removeAllUserIds: (state) => {
      const keys = Object.keys(state.userIds);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        delete state.userIds[key];
      }
    },
    removeAllEventIds: (state) => {
      const keys = Object.keys(state.eventIds);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        delete state.eventIds[key];
      }
    },
    removeAllBetsLeaderboardIds: (state) => {
      const keys = Object.keys(state.betsLeaderboardIds);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        delete state.betsLeaderboardIds[key];
      }
    },
  },
  // async reducers
  extraReducers: {},
});

export const {
  setUserIds,
  setEventIds,
  setBetsLeaderbordIds,
  removeAllUserIds,
  removeAllEventIds,
  removeAllBetsLeaderboardIds,
} = idsSlice.actions;

export const selectUserIds = (state: RootState) => state.ids.userIds;
export const selectEventIds = (state: RootState) => state.ids.eventIds;
export const selectBetsLeaderboardIds = (state: RootState) =>
  state.ids.betsLeaderboardIds;

export default idsSlice.reducer;
