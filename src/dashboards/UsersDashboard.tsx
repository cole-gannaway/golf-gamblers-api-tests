import { useEffect } from "react";
import { db } from "../auth/firebaseAdmin";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUsersNames, overWriteUserName, removeAllUsersNames } from "../features/users/usersNamesSlice";
import { overWriteUserSubscription, removeAllUsersSubscriptions, selectUsersSubscriptions } from "../features/users/usersSubscriptionsSlice";
import { UserPrivateData, UserPublicData } from "golf-gamblers-model";

import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

export function UsersDashboard() {
    const usersNames = useAppSelector(selectUsersNames);
    const userSubscriptions = useAppSelector(selectUsersSubscriptions);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const unsubscribe = db.collection('users').onSnapshot((usersSnap) => {
            // start fresh
            dispatch(removeAllUsersNames());
            dispatch(removeAllUsersSubscriptions());

            for (let i = 0; i < usersSnap.docs.length; i++) {
                const userDoc = usersSnap.docs[i];
                const user = userDoc.data() as UserPublicData;
                dispatch(overWriteUserName({
                    id: userDoc.id,
                    name: user.name ? user.name : ""
                }));
            }
        })
        return () => {
            unsubscribe();
        }
    }, [dispatch])

    useEffect(() => {
        const unsubMethods: any[] = [];
        const uids = Object.keys(usersNames);
        for (let i = 0; i < uids.length; i++) {
            const userId = uids[i];
            const unsubAccount = db.collection('users').doc(userId).collection('private').doc('account-data').onSnapshot((accountSnap) => {
                // bind the userId
                const id = userId;
                const accountData = accountSnap.data() as UserPrivateData;
                // update the subscription state
                dispatch(overWriteUserSubscription({
                    id: id,
                    subscriptionState: accountData.subscriptionState
                }));
            });
            unsubMethods.push(unsubAccount);
        }
        return () => {
            for (let i = 0; i < unsubMethods.length; i++) {
                const unsub = unsubMethods[i];
                unsub();
            }
        }
    }, [usersNames, dispatch])

    return <div>
        <table>
            <thead>
                <th>User</th><th>Subscribed</th>
            </thead>
            {Object.keys(usersNames).map((id, i) => {
                return <tr key={'user-' + i}>
                    <td>{usersNames[id].name}</td><td>{userSubscriptions[id] === undefined ? null : userSubscriptions[id].subscriptionState === "Basic" ? <DoneIcon style={{ color: "green" }} /> : <ClearIcon style={{ color: "red" }} />}</td>
                </tr>
            })}
        </table>

    </div>
}