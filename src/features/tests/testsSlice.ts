import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { addScoreCardsToAnEvent } from './steps/add-scorecards-to-event';
import { createTestEvent } from './steps/create-test-event';
import { populateDatabase } from './steps/populate-database';
import { subscribeAllUsers } from './steps/subscribe-all-users';

export interface TestState {
  step: TestStep;
  success: boolean;
  status: 'IDLE' | 'EXECUTING' | 'COMPLETE';
  description: string;
}

export enum TestStep {
  POPULATE_DB = 'Populate Database',
  SUBSCRIBE_ALL_USERS = 'Subscribe All Users',
  CREATE_TEST_EVENT = 'Create Test Event',
  ADD_SCORE_CARDS_TO_EVENT = 'Add Scorecards To An Event',
}

function createDefaultTestState(step: TestStep, description: string) {
  const retVal: TestState = {
    step: step,
    success: false,
    status: 'IDLE',
    description: description,
  };
  return retVal;
}

/** Initializes the Test steps */
const initialState: TestState[] = [
  createDefaultTestState(
    TestStep.POPULATE_DB,
    'Populates the database with courses and products for users to subscribe to'
  ),
  createDefaultTestState(
    TestStep.SUBSCRIBE_ALL_USERS,
    'Creates a subscription for each user -> Confirm on the Users tab'
  ),
  createDefaultTestState(
    TestStep.CREATE_TEST_EVENT,
    'Creates an event for users to join.'
  ),
  createDefaultTestState(
    TestStep.ADD_SCORE_CARDS_TO_EVENT,
    'Creates 2 scorecards and adds them to an event'
  ),
];

export const executeTestAsync = createAsyncThunk(
  'executeTest',
  async (step: TestStep) => {
    // methods to execute when running the tests
    switch (step) {
      case TestStep.POPULATE_DB:
        await populateDatabase();
        break;
      case TestStep.SUBSCRIBE_ALL_USERS:
        await subscribeAllUsers();
        break;
      case TestStep.CREATE_TEST_EVENT:
        await createTestEvent();
        break;
      case TestStep.ADD_SCORE_CARDS_TO_EVENT:
        await addScoreCardsToAnEvent();
        break;
      default:
        break;
    }
  }
);

export const subscribeAllUsersSlice = createSlice({
  name: 'test',
  initialState,
  // all operations are likely to be async
  reducers: {},
  // async reducers
  extraReducers: (builder) => {
    builder
      .addCase(executeTestAsync.pending, (state, action) => {
        const step = action.meta.arg;
        const foundTestState = state.find(
          (testState) => testState.step === step
        );
        if (foundTestState) foundTestState.status = 'EXECUTING';
      })
      .addCase(executeTestAsync.fulfilled, (state, action) => {
        const step = action.meta.arg;
        const foundTestState = state.find(
          (testState) => testState.step === step
        );
        if (foundTestState) {
          foundTestState.status = 'COMPLETE';
          foundTestState.success = true;
        }
      })
      .addCase(executeTestAsync.rejected, (state, action) => {
        console.log(action.error);
        const step = action.meta.arg;
        const foundTestState = state.find(
          (testState) => testState.step === step
        );
        if (foundTestState) {
          foundTestState.status = 'COMPLETE';
          foundTestState.success = false;
        }
      });
  },
});

export const selectTestsState = (state: RootState) => state.tests;

export default subscribeAllUsersSlice.reducer;
