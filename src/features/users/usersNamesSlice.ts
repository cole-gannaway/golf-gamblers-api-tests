import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UsersNamesState {
  [id: string]: {
    name: string;
  };
}

export interface UsersNamesStateUpdate {
  id: string;
  name: string;
}

const initialState: UsersNamesState = {};

export const usersNamesSlice = createSlice({
  name: 'usersNames',
  initialState,
  reducers: {
    deleteUserName: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    overWriteUserName: (
      state,
      action: PayloadAction<UsersNamesStateUpdate>
    ) => {
      state[action.payload.id] = {
        name: action.payload.name,
      };
    },
    removeAllUsersNames: (state) => {
      const keys = Object.keys(state);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        delete state[key];
      }
    },
  },
});

export const { deleteUserName, overWriteUserName, removeAllUsersNames } =
  usersNamesSlice.actions;

export const selectUsersNames = (state: RootState) => state.usersNames;

export default usersNamesSlice.reducer;
