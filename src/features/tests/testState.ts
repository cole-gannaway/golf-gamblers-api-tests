export interface TestState {
  name: string;
  success: boolean;
  status: 'IDLE' | 'EXECUTING' | 'COMPLETE';
}
