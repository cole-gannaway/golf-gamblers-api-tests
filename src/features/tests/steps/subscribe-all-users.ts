import { db } from '../../../auth/firebaseAdmin';
import { StripeConfig } from '../../../config/stripe.config';
/**
 * Subscribes all users to the product
 */
export async function subscribeAllUsers() {
  const userDocs = await db.collection('users').get();
  const userIds: string[] = [];
  for (let i = 0; i < userDocs.docs.length; i++) {
    const id = userDocs.docs[i].id;
    userIds.push(id);
  }
  for (let i = 0; i < userIds.length; i++) {
    await subscribeUser(userIds[i]);
  }
}

/**
 * Subscribes a user to the product
 *
 * @param userId
 */
export async function subscribeUser(userId: string) {
  // create a test subscription to the product
  const productRef = db
    .collection('products')
    .doc(StripeConfig.subscription_product_key.basic);
  await db
    .collection('customers')
    .doc(userId)
    .collection('subscriptions')
    .doc('testSubscriptionId')
    .set({
      status: 'active',
      product: productRef,
    });
}
