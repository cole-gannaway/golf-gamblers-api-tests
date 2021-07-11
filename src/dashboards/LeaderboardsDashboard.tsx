import { useEffect } from "react";
import { db } from "../auth/firebaseAdmin";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { BetsLeaderBoard } from "golf-gamblers-model";
import { removeAllBetsLeaderboardIds, selectBetsLeaderboardIds, setBetsLeaderbordIds } from "../features/ids/idsSlice";
import { removeAllBetLeaderboards, selectBetsLeaderboards, setBetLeaderboard } from "../features/leaderboards/betLeaderboardsSlice";

export function LeaderboardsDashboard() {
    const dispatch = useAppDispatch();

    const betLeaderboardIds = useAppSelector(selectBetsLeaderboardIds);
    const betLeaderboards = useAppSelector(selectBetsLeaderboards);

    useEffect(() => {
        const unsubscribe = db.collection('bet-leaderboards').onSnapshot((betsLeaderboardsSnap) => {
            // start fresh
            dispatch(removeAllBetsLeaderboardIds());
            const ids: string[] = [];
            for (let i = 0; i < betsLeaderboardsSnap.docs.length; i++) {
                const betsLeaderboardDoc = betsLeaderboardsSnap.docs[i];
                ids.push(betsLeaderboardDoc.id);
            }
            dispatch(setBetsLeaderbordIds(ids));
        })
        return () => {
            unsubscribe();
        }
        // compiler wants to depend on dispatch
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (Object.keys(betLeaderboardIds).length > 0) {
            const unsubscribe = db.collection('bet-leaderboards').onSnapshot((betsLeaderboardsSnap) => {
                // start fresh
                dispatch(removeAllBetLeaderboards());
                for (let i = 0; i < betsLeaderboardsSnap.docs.length; i++) {
                    const betsLeaderboardDoc = betsLeaderboardsSnap.docs[i];
                    const betsLeaderboard = betsLeaderboardDoc.data() as BetsLeaderBoard;
                    dispatch(setBetLeaderboard(betsLeaderboard));
                }
            })
            return () => {
                unsubscribe();
            }
        }
        // compiler wants to depend on dispatch
        // eslint-disable-next-line
    }, [betLeaderboardIds]);

    const leaderBoardDiv = Object.values(betLeaderboards).map((leaderBoard) => {
        const betsSummaryEntries = Object.entries(leaderBoard.betSummary);
        const betsSummaryDiv = betsSummaryEntries.map((betSummaryEntry) => {
            const userId = betSummaryEntry[0];
            const summary = betSummaryEntry[1];
            const userBetEntries = Object.entries(summary.betsAndResults);
            const betEntries = userBetEntries.map((userBetEntry) => {
                const betId = userBetEntry[0];
                const betResult = userBetEntry[1];
                return <div key={"bet-summary-" + betId} style={{ paddingLeft: '50px' }}>
                    <div>Bet Id: {betId} : {betResult}</div>
                </div>
            })
            return <div key={"user-summary-" + userId}>
                <div>User Id: {userId}</div>
                <div>{betEntries}</div>
            </div>
        })
        return <div>
            <div>Event Id: {leaderBoard.eventId}</div>
            <div style={{ paddingLeft: '50px' }}>{betsSummaryDiv} </div>
        </div>
    })

    return <div>
        {leaderBoardDiv}
    </div>
}