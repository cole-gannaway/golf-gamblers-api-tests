import { useAppDispatch, useAppSelector } from "../app/hooks";
import { executeTestAsync, selectTestsState, TestStep } from "../features/tests/testsSlice";

import { Button } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

export function TestsDashboard() {
    const dispatch = useAppDispatch();
    const testStates = useAppSelector(selectTestsState);

    async function handleRunAllTests() {
        const steps = Object.values(TestStep);
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            await dispatch(executeTestAsync(step));
        }
    }
    return <div>
        <h3>Run All Tests</h3>
        <div><Button onClick={handleRunAllTests}>Run All Tests</Button></div>
        <table>
            <thead>
                <tr>
                    <th>Step</th><th>Execute</th><th>Status</th>
                </tr>
            </thead>
            <tbody>
                {testStates.map((testState, i) => {
                    return <tr key={'test-step-' + i}>
                        <td>{i + 1}</td><td><Button onClick={() => { dispatch(executeTestAsync(testState.step)) }}>{testState.step.toString()}</Button></td><td>{testState.success === true ? <DoneIcon style={{ color: "green" }} /> : testState.success === false ? <ClearIcon style={{ color: "red" }} /> : null}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}