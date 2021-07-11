import {
  Scorecard,
  Bet,
  MatchPlayBetResults,
  SkinsBetResults,
} from 'golf-gamblers-model';
import { db } from '../../../auth/firebaseAdmin';

export async function createBets() {
  // get an event id
  const eventDocs = await db.collection('events').limit(1).get();
  const eventId = eventDocs.docs[0].id;
  // get scorecards
  const scorecardDocs = await db
    .collection('scorecards')
    .where('eventId', '==', eventId)
    .limit(2)
    .get();

  // extract info
  const scorecardIds: string[] = [];
  const userIds: string[] = [];
  for (let i = 0; i < scorecardDocs.docs.length; i++) {
    const scorecardDoc = scorecardDocs.docs[i];
    const scorecard = scorecardDoc.data() as Scorecard;
    scorecardIds.push(scorecard.scorecardId);
    userIds.push(scorecard.userId);
  }
  // create a bet
  const betRef = db.collection('bets').doc();
  const skinsBetsResults: SkinsBetResults = {
    resultsPerHole: {},
    scorecardIdToTotalSkins: {},
  };
  const bet: Bet = {
    betId: betRef.id,
    betType: 'Skins',
    wager: 5,
    eventId: eventId,
    userIds: userIds,
    scorecardIds: scorecardIds,
    betResults: skinsBetsResults,
    // TODO fix these later
    teamIds: [],
    createdTime: Date.now(),
    betRequestId: '',
  };
  betRef.set(bet);

  // create another bet
  const betRef2 = db.collection('bets').doc();
  const matchPlayBetResults: MatchPlayBetResults = {
    resultsPerHole: {},
    scorecardIdToTotalHolesWon: {},
  };
  const bet2: Bet = {
    betId: betRef2.id,
    betType: 'MatchPlay',
    wager: 5,
    eventId: eventId,
    userIds: userIds,
    scorecardIds: scorecardIds,
    betResults: matchPlayBetResults,
    // TODO fix these later
    teamIds: [],
    createdTime: Date.now(),
    betRequestId: '',
  };
  betRef2.set(bet2);
}
