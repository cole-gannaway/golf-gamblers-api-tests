import { Scorecard, Holes } from 'golf-gamblers-model';
import { db } from '../../../auth/firebaseAdmin';

export async function addScoreCardsToAnEvent() {
  // get user ids
  const usersDocs = await db.collection('users').limit(2).get();
  const userIds: string[] = [];
  userIds.push(usersDocs.docs[0].id);
  userIds.push(usersDocs.docs[1].id);

  // get an event id
  const eventDocs = await db.collection('events').limit(1).get();
  const eventId = eventDocs.docs[0].id;

  // save scorcards
  for (let i = 0; i < userIds.length; i++) {
    const userId = userIds[i];

    // create holes
    const holes: Holes = {};
    for (let j = 0; j < 18; j++) {
      // create some randomness with scores
      const stokeDelta = i === 0 || j % 2 === 0 ? 0 : 1;
      holes[j + 1] = {
        strokes: 4 + stokeDelta,
        holeInfo: {
          par: 4,
        },
      };
    }

    // create scorecard
    const scorecardRef = db.collection('scorecards').doc();
    const scorecard: Scorecard = {
      scorecardId: scorecardRef.id,
      userId: userId,
      eventId: eventId,
      createdTime: Date.now(),
      holes: holes,
    };
    // save scorecard
    await scorecardRef.set(scorecard);
  }
}
