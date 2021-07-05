import { db } from '../../../auth/firebaseAdmin';
import StripeConfig from '../../../config/stripe.config.json';
import { Course } from 'golf-gamblers-model';

/**
 * Main method for populating the database with data for testing
 */

export async function populateDatabase() {
  await populateProducts();
  await populateCourses();
}

/**
 * Creates a product(s) for users to subscribe to
 */
async function populateProducts() {
  await db
    .collection('products')
    .doc(StripeConfig.subscription_product_key.basic)
    .set({
      status: 'active',
      name: 'Basic',
    });
}

/**
 * Populates fake course data for events to be held at
 */
async function populateCourses() {
  for (let i = 0; i < 10; i++) {
    const course: Course = {
      name: 'Course ' + (i + 1).toString(),
      public: false,
      location: {
        city: 'Birmingham',
        state: 'Alabama',
        country: 'United States',
      },
      createdTime: Date.now(),
    };
    await db.collection('courses').doc().set(course);
  }
}
