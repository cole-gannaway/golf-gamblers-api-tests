import { db } from '../../../auth/firebaseAdmin';
import { Event, EventConfiguration, EventUsers } from 'golf-gamblers-model';

export async function createTestEvent() {
  const randomUserQuery = await db.collection('users').limit(1).get();
  const randomUserId = randomUserQuery.docs[0].id;
  const randomCourseQuery = await db.collection('courses').limit(1).get();
  const randomCourseId = randomCourseQuery.docs[0].id;
  // create event
  const event: Event = {
    name: 'Test Event',
    creatorId: randomUserId,
    createdTime: Date.now(),
  };
  // configure event
  const eventConfig: EventConfiguration = {
    private: false,
    state: 'IN_PROGRESS',
    courseId: randomCourseId,
    numberOfHoles: 18,
    maxBet: 5,
    tees: 'I',
  };
  await createEvent(event, eventConfig);
}

/**
 * Creates an event
 *
 * @param event
 * @param eventConfig
 * @returns
 */
export async function createEvent(
  event: Event,
  eventConfig: EventConfiguration
) {
  // create an event ref
  const eventRef = db.collection('events').doc();

  // set event
  await eventRef.set(event);

  // set the events configuration
  await eventRef.collection('private').doc('configuration').set(eventConfig);

  // create eventUsers
  const eventUsers: EventUsers = {
    eventId: eventRef.id,
    userIds: [event.creatorId],
  };

  // set the event user as a user
  const eventUsersRef = db.collection('event-users').doc(eventRef.id);
  await eventUsersRef.set(eventUsers);

  // create eventAdmins
  const eventAdmins: any = {
    eventId: eventRef.id,
    userIds: [event.creatorId],
  };

  // set the event user as an admin
  const eventAdminsRef = db.collection('event-admins').doc(eventRef.id);
  await eventAdminsRef.set(eventAdmins);

  return eventRef.id;
}
