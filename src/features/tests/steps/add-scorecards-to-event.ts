import { ScoreCard, Hole } from 'golf-gamblers-model';
import { db } from '../../../auth/firebaseAdmin';

export async function addScoreCardsToAnEvent() {
  // get user ids
  const usersDocs = await db.collection('users').limit(2).get();
  const userIds: string[] = [];
  userIds.push(usersDocs.docs[0].id);
  userIds.push(usersDocs.docs[2].id);

  // save scorcards
  for (let i = 0; i < userIds.length; i++) {
    const userId = userIds[i];

    // create holes
    const holes: Hole[] = [];
    for (let j = 0; j < 18; j++) {
      holes.push({
        // create some randomness with scores
        strokes: 4 + ((j + i) % 2),
        holeInfo: {
          par: 4,
        },
      });
    }
    // create scorecard
    const scorecard: ScoreCard = {
      userId: userId,
      createdTime: Date.now(),
      holes: holes,
    };

    // save scorecard
    await db.collection('scorecards').doc().set(scorecard);
  }
}
