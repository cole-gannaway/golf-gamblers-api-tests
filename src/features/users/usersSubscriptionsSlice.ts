import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SubscriptionState } from 'golf-gamblers-model';

export interface UsersSubscriptionsState {
  [id: string]: {
    subscriptionState: SubscriptionState;
  };
}

export interface UsersSubscriptionsStateUpdate {
  id: string;
  subscriptionState: SubscriptionState;
}

const initialState: UsersSubscriptionsState = {};

export const usersSubscriptionsSlice = createSlice({
  name: 'usersSubscriptions',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    deleteUserSubscription: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    overWriteUserSubscription: (
      state,
      action: PayloadAction<UsersSubscriptionsStateUpdate>
    ) => {
      state[action.payload.id] = {
        subscriptionState: action.payload.subscriptionState,
      };
    },
    removeAllUsersSubscriptions: (state) => {
      const keys = Object.keys(state);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        delete state[key];
      }
    },
  },
});

export const {
  overWriteUserSubscription,
  deleteUserSubscription,
  removeAllUsersSubscriptions,
} = usersSubscriptionsSlice.actions;

export const selectUsersSubscriptions = (state: RootState) =>
  state.usersSubscriptions;

export default usersSubscriptionsSlice.reducer;
