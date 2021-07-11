import { useEffect } from "react";
import { db } from "../auth/firebaseAdmin";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Hole, Scorecard } from "golf-gamblers-model";
import { selectScorecards, removeAllScorecards, setScorecard } from "../features/scorecards/scorecardsSlice";

export function ScorecardsDashboard() {
    const scorecards = useAppSelector(selectScorecards);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const unsubscribe = db.collection('scorecards').onSnapshot((scorecardsSnap) => {
            // start fresh
            dispatch(removeAllScorecards());
            for (let i = 0; i < scorecardsSnap.docs.length; i++) {
                const scorecardDoc = scorecardsSnap.docs[i];
                const scorecard = scorecardDoc.data() as Scorecard;
                dispatch(setScorecard(scorecard));
            }
        })
        return () => {
            unsubscribe();
        }
        // compiler wants to depend on dispatch
        // eslint-disable-next-line
    }, [])

    const scorecardsDiv = Object.values(scorecards).map((scorecard) => {
        const holeNumbers = Object.keys(scorecard.holes);
        const holes: Hole[] = Object.values(scorecard.holes)
        return <div key={scorecard.scorecardId}>
            <div>Scorecard Id: <b>{scorecard.scorecardId}</b> | User Id: <b>{scorecard.userId}</b></div>
            <br></br>
            <table>
                <thead>
                    <tr>
                        {holeNumbers.map((holeNumber, i) => {
                            return <th key={'hole-' + holeNumber}>{holeNumber}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {holes.map((hole, i) => {
                            return <td key={'holescore-' + i}>{hole.strokes}</td>
                        })}
                    </tr>
                </tbody>
            </table>
            <br></br>
        </div>
    })
    return <div>
        <br></br>
        {scorecardsDiv}
    </div>
}